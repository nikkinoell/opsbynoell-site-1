/**
 * OPS BY NOELL — Admin Chat Inbox
 * Live monitoring: SSE-based real-time typing preview + Nova streaming
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';
import { MessageSquare, Send, User, Bot, UserCheck, Circle, ArrowLeft } from 'lucide-react';

// ─── SSE live state ───────────────────────────────────────────────────────────
type TypingState = { isTyping: boolean; draft: string };
type StreamState = { sessionId: string; buffer: string; done: boolean };

type Message = {
  id: number;
  sessionId: string;
  role: 'visitor' | 'bot' | 'human';
  content: string;
  createdAt: Date;
};

type Session = {
  id: number;
  sessionId: string;
  visitorName: string | null;
  visitorEmail: string | null;
  businessType: string | null;
  visitorIp: string | null;
  visitorLocation: string | null;
  humanTakeover: number;
  unreadCount: number;
  priority: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// ─── Deep link: parse ?session=ID from URL ────────────────────────────────────
function getSessionFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('session');
}

function setSessionInUrl(sessionId: string | null) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (sessionId) {
    url.searchParams.set('session', sessionId);
  } else {
    url.searchParams.delete('session');
  }
  window.history.replaceState(null, '', url.toString());
}

export default function ChatInbox() {
  const { user, loading } = useAuth();
  const [selectedSession, setSelectedSession] = useState<string | null>(() => getSessionFromUrl());
  const [replyText, setReplyText] = useState('');
  const [showThread, setShowThread] = useState<boolean>(() => !!getSessionFromUrl());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // ─── SSE live state ───────────────────────────────────────────────────────
  // Map of sessionId → typing state for visitors
  const [visitorTyping, setVisitorTyping] = useState<Record<string, TypingState>>({});
  // Nova streaming: one active stream at a time
  const [novaStream, setNovaStream] = useState<StreamState | null>(null);
  const [novaTyping, setNovaTyping] = useState<Record<string, boolean>>({});
  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    const es = new EventSource('/api/chat/events', { withCredentials: true });
    sseRef.current = es;

    es.addEventListener('visitor_typing', (e) => {
      try {
        const { sessionId, isTyping, draft } = JSON.parse(e.data);
        setVisitorTyping(prev => ({
          ...prev,
          [sessionId]: { isTyping, draft: draft ?? '' },
        }));
      } catch { /* ignore */ }
    });

    es.addEventListener('nova_typing', (e) => {
      try {
        const { sessionId, isTyping } = JSON.parse(e.data);
        setNovaTyping(prev => ({ ...prev, [sessionId]: isTyping }));
        if (isTyping) {
          setNovaStream({ sessionId, buffer: '', done: false });
        }
      } catch { /* ignore */ }
    });

    es.addEventListener('nova_stream_chunk', (e) => {
      try {
        const { sessionId, chunk } = JSON.parse(e.data);
        setNovaStream(prev =>
          prev && prev.sessionId === sessionId
            ? { ...prev, buffer: prev.buffer + chunk }
            : prev
        );
      } catch { /* ignore */ }
    });

    es.addEventListener('nova_stream_done', (e) => {
      try {
        const { sessionId } = JSON.parse(e.data);
        setNovaStream(prev =>
          prev && prev.sessionId === sessionId ? { ...prev, done: true } : prev
        );
        setNovaTyping(prev => ({ ...prev, [sessionId]: false }));
        // Clear stream bubble after a short delay then let polling pick up final message
        setTimeout(() => {
          setNovaStream(null);
          refetchMessages();
        }, 400);
      } catch { /* ignore */ }
    });

    es.addEventListener('new_message', () => {
      refetchMessages();
      refetchSessions();
    });

    es.addEventListener('session_updated', () => {
      refetchSessions();
    });

    es.onerror = () => { /* SSE will auto-reconnect */ };

    return () => { es.close(); sseRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ─── Data fetching (with fallback polling) ────────────────────────────────
  const { data: sessions, refetch: refetchSessions } = trpc.chat.getSessions.useQuery(
    undefined,
    {
      enabled: !!user && user.role === 'admin',
      refetchInterval: 3000,
    }
  );

  const { data: messages, refetch: refetchMessages } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: selectedSession! },
    {
      enabled: !!selectedSession,
      refetchInterval: 2000,
    }
  );

  const adminReply = trpc.chat.adminReply.useMutation({
    onSuccess: () => {
      setReplyText('');
      refetchMessages();
      refetchSessions();
    },
  });

  const setTakeover = trpc.chat.setTakeover.useMutation({
    onSuccess: () => {
      refetchSessions();
      refetchMessages();
    },
  });

  // ─── Phase 3: Sync selected session to/from URL ───────────────────────────
  const selectSession = useCallback((sessionId: string | null) => {
    setSelectedSession(sessionId);
    setSessionInUrl(sessionId);
    if (sessionId) setShowThread(true);
  }, []);

  // On load, if URL has a session param, verify it exists after sessions load
  useEffect(() => {
    const urlSession = getSessionFromUrl();
    if (urlSession && sessions && !sessions.find((s: Session) => s.sessionId === urlSession)) {
      // Session not found — clear URL param
      setSessionInUrl(null);
      setSelectedSession(null);
    }
  }, [sessions]);

  // Auto-scroll on new messages, typing changes, or stream updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, novaStream?.buffer, visitorTyping, novaTyping]);

  // ─── Phase 4: Mobile — detect screen width reactively ────────────────────
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#868583', fontFamily: "'Sora', sans-serif" }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#F5F0EC', fontFamily: "'Sora', sans-serif", textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Access Denied</p>
          <p style={{ color: '#868583', fontSize: '0.875rem' }}>Admin access required.</p>
        </div>
      </div>
    );
  }

  const selectedSessionData = sessions?.find((s: Session) => s.sessionId === selectedSession);
  const totalUnread = sessions?.reduce((sum: number, s: Session) => sum + s.unreadCount, 0) ?? 0;

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedSession) return;
    adminReply.mutate({ sessionId: selectedSession, message: replyText.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  const isMobileView = windowWidth < 768;

  // On mobile: show either list or thread, not both
  // On desktop: show both side by side
  const showList = !isMobileView || !showThread;
  const showThreadPanel = !isMobileView || showThread;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#141414',
        borderBottom: '1px solid #2A2A2A',
        padding: '0.875rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {/* Mobile: back button when in thread view */}
          {isMobileView && showThread && (
            <button
              onClick={() => { setShowThread(false); selectSession(null); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A78BFA', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <MessageSquare size={18} color="#A78BFA" />
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: '#F5F0EC', fontSize: '0.9375rem' }}>
            {isMobileView && showThread && selectedSessionData
              ? (selectedSessionData.visitorName ?? 'Visitor')
              : 'Nova Chat Inbox'}
          </span>
          {totalUnread > 0 && (
            <span style={{
              backgroundColor: '#A78BFA',
              color: '#0A0A0A',
              borderRadius: '999px',
              padding: '0.125rem 0.45rem',
              fontSize: '0.625rem',
              fontWeight: 700,
              fontFamily: "'Sora', sans-serif",
            }}>
              {totalUnread}
            </span>
          )}
        </div>
        <a href="/" style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#868583', textDecoration: 'none' }}>
          ← Site
        </a>
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', height: 'calc(100vh - 52px)' }}>

        {/* Session list */}
        {showList && (
          <div style={{
            width: isMobileView ? '100%' : '300px',
            flexShrink: 0,
            borderRight: isMobileView ? 'none' : '1px solid #2A2A2A',
            overflowY: 'auto',
            backgroundColor: '#0F0F0F',
            WebkitOverflowScrolling: 'touch',
          }}>
            {!sessions || sessions.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#868583', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem' }}>
                No conversations yet.
              </div>
            ) : (
              sessions.map((session: Session) => (
                <div
                  key={session.sessionId}
                  onClick={() => selectSession(session.sessionId)}
                  style={{
                    padding: '0.875rem 1rem',
                    borderBottom: '1px solid #1A1A1A',
                    cursor: 'pointer',
                    backgroundColor: selectedSession === session.sessionId ? '#1A1A1A' : 'transparent',
                    transition: 'background-color 0.15s ease',
                    minHeight: '60px', // better tap target on mobile
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
                      {session.humanTakeover ? (
                        <UserCheck size={13} color="#A78BFA" style={{ flexShrink: 0 }} />
                      ) : (
                        <Bot size={13} color="#868583" style={{ flexShrink: 0 }} />
                      )}
                      <span style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#F5F0EC',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {session.visitorName ?? 'Anonymous'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                      {session.priority === 'hot' && (
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5rem', fontWeight: 700, color: '#FF6B6B', backgroundColor: 'rgba(255,107,107,0.12)', borderRadius: '999px', padding: '0.1rem 0.375rem', letterSpacing: '0.06em' }}>HOT</span>
                      )}
                      {session.humanTakeover ? (
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5625rem', color: '#A78BFA', fontWeight: 600 }}>YOU</span>
                      ) : null}
                      {session.unreadCount > 0 && (
                        <Circle size={7} fill="#A78BFA" color="#A78BFA" />
                      )}
                    </div>
                  </div>
                  {session.visitorEmail && (
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: '#868583', margin: '0 0 0.1rem 0' }}>
                      {session.visitorEmail}
                    </p>
                  )}
                  {session.businessType && (
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: '#5A5450', margin: 0 }}>
                      {session.businessType}
                    </p>
                  )}
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5625rem', color: '#3A3430', marginTop: '0.3rem' }}>
                    {new Date(session.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Message thread */}
        {showThreadPanel && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: isMobileView ? '100%' : 'auto' }}>
            {!selectedSession ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <MessageSquare size={36} color="#2A2A2A" />
                <p style={{ fontFamily: "'Sora', sans-serif", color: '#4A4440', fontSize: '0.875rem' }}>
                  Select a conversation
                </p>
              </div>
            ) : (
              <>
                {/* Thread header */}
                <div style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #2A2A2A',
                  backgroundColor: '#141414',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                }}>
                  <div style={{ minWidth: 0, flex: 1, marginRight: '0.5rem' }}>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: '#F5F0EC', fontSize: '0.8125rem', margin: 0 }}>
                      {selectedSessionData?.visitorName ?? 'Anonymous'}
                    </p>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', color: '#868583', margin: '0.125rem 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selectedSessionData?.visitorEmail ?? 'No email'}
                      {selectedSessionData?.businessType ? ` · ${selectedSessionData.businessType}` : ''}
                      {selectedSessionData?.visitorLocation ? ` · 📍 ${selectedSessionData.visitorLocation}` : ''}
                    </p>
                  </div>
                  {/* Takeover toggle — prominent on mobile */}
                  <button
                    onClick={() => setTakeover.mutate({
                      sessionId: selectedSession,
                      active: !selectedSessionData?.humanTakeover,
                    })}
                    style={{
                      backgroundColor: selectedSessionData?.humanTakeover ? '#A78BFA' : '#2A2A2A',
                      color: selectedSessionData?.humanTakeover ? '#0A0A0A' : '#F5F0EC',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      flexShrink: 0,
                      minHeight: '36px', // better mobile tap target
                    }}
                  >
                    <UserCheck size={12} />
                    {selectedSessionData?.humanTakeover ? 'Hand back' : 'Take over'}
                  </button>
                </div>

                {/* Takeover status banner — polished, prominent */}
                {selectedSessionData?.humanTakeover ? (
                  <div style={{
                    background: 'linear-gradient(90deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.06) 100%)',
                    borderBottom: '1px solid rgba(167,139,250,0.25)',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A78BFA', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: '#A78BFA', fontWeight: 600 }}>
                      You have control
                    </span>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: 'rgba(167,139,250,0.5)' }}>
                      · Nova is paused
                    </span>
                  </div>
                ) : null}

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', WebkitOverflowScrolling: 'touch' }}>
                  {!messages || messages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#4A4440', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', marginTop: '2rem' }}>
                      No messages yet
                    </div>
                  ) : (
                    messages.map((msg: Message) => (
                      <div
                        key={msg.id}
                        style={{
                          display: 'flex',
                          justifyContent: msg.role === 'visitor' ? 'flex-start' : 'flex-end',
                          gap: '0.4rem',
                          alignItems: 'flex-end',
                        }}
                      >
                        {msg.role === 'visitor' && (
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            backgroundColor: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <User size={12} color="#868583" />
                          </div>
                        )}
                        <div style={{
                          maxWidth: '78%',
                          backgroundColor: msg.role === 'visitor' ? '#1A1A1A' : msg.role === 'human' ? '#A78BFA' : '#2A2A2A',
                          borderRadius: msg.role === 'visitor' ? '12px 12px 12px 3px' : '12px 12px 3px 12px',
                          padding: '0.5rem 0.75rem',
                        }}>
                          {msg.role !== 'visitor' && (
                            <p style={{
                              fontFamily: "'Sora', sans-serif",
                              fontSize: '0.5rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: msg.role === 'human' ? 'rgba(10,10,10,0.6)' : '#868583',
                              marginBottom: '0.2rem',
                            }}>
                              {msg.role === 'human' ? 'You' : 'Nova'}
                            </p>
                          )}
                          <p style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: '0.8125rem',
                            color: msg.role === 'human' ? '#0A0A0A' : '#F5F0EC',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                            margin: 0,
                          }}>
                            {msg.content}
                          </p>
                          <p style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: '0.5rem',
                            color: msg.role === 'human' ? 'rgba(10,10,10,0.4)' : '#3A3430',
                            marginTop: '0.2rem',
                            textAlign: 'right',
                          }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {msg.role !== 'visitor' && (
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            backgroundColor: msg.role === 'human' ? '#A78BFA' : '#2A2A2A',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            {msg.role === 'human' ? <UserCheck size={12} color="#0A0A0A" /> : <Bot size={12} color="#868583" />}
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {/* ── Visitor typing indicator ──────────────────────────── */}
                  {selectedSession && visitorTyping[selectedSession]?.isTyping && (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.4rem' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <User size={12} color="#868583" />
                      </div>
                      <div style={{
                        maxWidth: '78%',
                        backgroundColor: '#141414',
                        border: '1px solid #252525',
                        borderRadius: '12px 12px 12px 3px',
                        padding: '0.5rem 0.75rem',
                      }}>
                        <p style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: '0.5625rem',
                          color: '#5A5450',
                          margin: '0 0 0.25rem',
                          fontStyle: 'italic',
                          letterSpacing: '0.02em',
                        }}>
                          typing…
                        </p>
                        {visitorTyping[selectedSession].draft && (
                          <p style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: '0.8125rem',
                            color: 'rgba(245,240,236,0.35)',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                            margin: 0,
                            fontStyle: 'italic',
                          }}>
                            {visitorTyping[selectedSession].draft}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── Nova streaming bubble ─────────────────────────────── */}
                  {selectedSession && !selectedSessionData?.humanTakeover && (
                    novaTyping[selectedSession] || (novaStream && novaStream.sessionId === selectedSession && !novaStream.done)
                  ) && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: '0.4rem' }}>
                      <div style={{
                        maxWidth: '78%',
                        background: 'linear-gradient(135deg, #1E1A2E 0%, #221F30 100%)',
                        border: '1px solid rgba(167,139,250,0.2)',
                        borderRadius: '12px 12px 3px 12px',
                        padding: '0.5rem 0.75rem',
                        position: 'relative',
                        overflow: 'hidden',
                      }}>
                        {/* Subtle shimmer line at top */}
                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                          background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)',
                        }} />
                        <p style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: '0.5rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'rgba(167,139,250,0.6)',
                          marginBottom: '0.2rem',
                        }}>
                          Nova
                        </p>
                        {novaStream && novaStream.sessionId === selectedSession && novaStream.buffer ? (
                          <p style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: '0.8125rem',
                            color: 'rgba(245,240,236,0.85)',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                            margin: 0,
                          }}>
                            {novaStream.buffer}
                            {/* blinking cursor */}
                            <span style={{
                              display: 'inline-block', width: '2px', height: '0.9em',
                              backgroundColor: 'rgba(167,139,250,0.7)', marginLeft: '1px',
                              verticalAlign: 'text-bottom',
                              animation: 'blink 0.9s step-end infinite',
                            }} />
                          </p>
                        ) : (
                          /* pulse dots while waiting for first chunk */
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '18px' }}>
                            {[0, 1, 2].map(i => (
                              <div key={i} style={{
                                width: '5px', height: '5px', borderRadius: '50%',
                                backgroundColor: 'rgba(167,139,250,0.5)',
                                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                              }} />
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2A2040, #1A1A2E)',
                        border: '1px solid rgba(167,139,250,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Bot size={12} color="rgba(167,139,250,0.8)" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* CSS keyframes for animations */}
                <style>{`
                  @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
                  @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8) } 50% { opacity: 1; transform: scale(1.1) } }
                `}</style>

                {/* Reply input */}
                <div style={{
                  borderTop: '1px solid #2A2A2A',
                  padding: '0.75rem',
                  backgroundColor: '#141414',
                  display: 'flex',
                  gap: '0.625rem',
                  alignItems: 'flex-end',
                  flexShrink: 0,
                }}>
                  <div style={{ flex: 1 }}>
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={selectedSessionData?.humanTakeover ? 'Reply as Nikki/James...' : 'Take over first, then reply...'}
                      rows={2}
                      style={{
                        width: '100%',
                        backgroundColor: '#0A0A0A',
                        border: '1px solid #2A2A2A',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem',
                        fontFamily: "'Sora', sans-serif",
                        fontSize: '0.8125rem',
                        color: '#F5F0EC',
                        resize: 'none',
                        outline: 'none',
                        lineHeight: 1.5,
                        boxSizing: 'border-box',
                        WebkitAppearance: 'none',
                        touchAction: 'manipulation',
                      }}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#A78BFA'}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = '#2A2A2A'}
                    />
                  </div>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || adminReply.isPending}
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: replyText.trim() ? '#A78BFA' : '#2A2A2A',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    aria-label="Send reply"
                  >
                    <Send size={16} color={replyText.trim() ? '#0A0A0A' : '#4A4440'} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
