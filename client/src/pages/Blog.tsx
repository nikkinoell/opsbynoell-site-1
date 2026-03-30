/*
 * OPS BY NOELL — Blog (NeuraFlas Design System)
 * First post: 5 Ways Massage Therapists Lose Revenue Every Week
 */

import { ArrowRight, ArrowLeft, Clock, Calendar } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}

/* ─── BLOG POSTS DATA ───────────────────────────────────────────── */

const POSTS = [
  {
    slug: 'massage-therapist-revenue-leaks',
    category: 'Massage Therapy',
    title: '5 Ways Massage Therapists Lose Revenue Every Week (And How to Fix Them)',
    excerpt: 'Most massage practices lose 15–20% of potential revenue every week — not from bad reviews or pricing, but from invisible gaps in the client experience. Here\'s where it goes.',
    author: 'Nikki Noell',
    date: 'March 29, 2026',
    readTime: '6 min read',
    featured: true,
    body: [
      {
        type: 'intro',
        content: "If you've been doing massage for years and your schedule still has gaps, it's almost never a skill problem. It's a systems problem. The clients are out there. They're just not making it through the invisible holes in your operation.",
      },
      {
        type: 'intro',
        content: "I work with massage therapists across Orange County and Southern California. Every time we audit a practice, we find the same five revenue leaks — sometimes all five at once. Here's what they are, what they're costing you, and what actually fixes them.",
      },
      {
        type: 'h2',
        content: '1. Missed calls that never get a follow-up',
      },
      {
        type: 'p',
        content: "You're with a client. Your phone rings. Voicemail picks up. The caller hangs up without leaving a message, or leaves one you don't hear until two hours later.",
      },
      {
        type: 'p',
        content: "Here's what the data says about that moment: 85% of callers who reach voicemail at a local business will not call back. They'll call the next massage therapist on Google instead.",
      },
      {
        type: 'p',
        content: "If you're missing 5 calls a week and half of them would have booked, that's 2–3 new clients a week you're losing. At $90 per session and 6 sessions over a year per client, that's a lot of revenue disappearing without you ever knowing.",
      },
      {
        type: 'p',
        content: "The fix: an automatic text that fires the moment a call goes unanswered. Something simple — \"Hey, sorry I missed you! I'm with a client right now. Want to grab a time?\" — with a booking link. Most people respond to a text in under 5 minutes. A voicemail gets maybe 20%.",
      },
      {
        type: 'h2',
        content: '2. No-shows with no recovery system',
      },
      {
        type: 'p',
        content: "No-shows are one of the most painful parts of running a solo practice. You blocked the time. You turned away other clients. And then they don't show.",
      },
      {
        type: 'p',
        content: "The national average for no-show rates at massage and wellness practices is 10–15%. For a practice doing 25 appointments a week, that's 2–4 missed appointments every week. Every one of those is a direct revenue loss.",
      },
      {
        type: 'p',
        content: "Most no-shows aren't malicious. They forgot. Or something came up and they didn't know how to reschedule easily. The solution isn't a strict cancellation policy — it's a reminder sequence that makes it impossible for them to forget, and easy to reschedule if they need to.",
      },
      {
        type: 'p',
        content: "A well-timed reminder sequence (48 hours out, 24 hours out, day-of) reduces no-shows by 30–50% in most practices we work with. That's 1–2 appointments recovered every week, just from sending the right text at the right time.",
      },
      {
        type: 'h2',
        content: '3. Leads who inquired once and never heard back',
      },
      {
        type: 'p',
        content: "Someone finds your practice online. They send a message through your website, DM you on Instagram, or text you. You respond when you can. They don't respond back. That's the end of it.",
      },
      {
        type: 'p',
        content: "What happened? Timing. They were interested in the moment they reached out. By the time you got back to them, they'd already booked somewhere else or just moved on with their day.",
      },
      {
        type: 'p',
        content: "80% of sales require 5 or more follow-up touches. Most service businesses follow up once, maybe twice. An automated follow-up sequence — a few texts spaced over a couple of weeks — keeps you in front of warm leads without any manual effort.",
      },
      {
        type: 'h2',
        content: '4. Happy clients who never leave a review',
      },
      {
        type: 'p',
        content: "You know how 93% of consumers read online reviews before choosing a local service provider? Your satisfied clients are your best marketing asset. But most of them will never leave a review unless you ask — and most practices never ask.",
      },
      {
        type: 'p',
        content: "The timing matters. The best moment to request a review is right after an appointment, when the client is still in that post-massage glow. An automated text that goes out 30–60 minutes after checkout, with a direct link to your Google profile, converts at 20–40% in most practices.",
      },
      {
        type: 'p',
        content: "More reviews means better rankings on Google Maps. Better rankings means more calls. More calls means more clients. It's a compounding loop that most practices never build.",
      },
      {
        type: 'h2',
        content: '5. Clients who stop coming back — silently',
      },
      {
        type: 'p',
        content: "This one's the quietest revenue leak. Clients don't cancel. They just stop booking. Life gets busy, they fall out of their routine, and unless you reach out, they won't think about scheduling again.",
      },
      {
        type: 'p',
        content: "If a client who used to book monthly hasn't booked in 6 weeks, they're at risk of becoming a former client. A win-back sequence — a short, personal-feeling text at the 6-week mark — recovers a significant percentage of at-risk clients before they're gone for good.",
      },
      {
        type: 'p',
        content: "For a practice with 150 active clients, even a 10% monthly attrition rate means 15 clients quietly leaving every month. Automating win-back outreach can cut that number significantly, just by showing up at the right time.",
      },
      {
        type: 'h2',
        content: 'The common thread',
      },
      {
        type: 'p',
        content: "Every one of these revenue leaks has the same root cause: nothing happens automatically. No text fires when a call is missed. No reminder goes out before an appointment. No follow-up runs after a new inquiry. No review request sends after checkout. No win-back message reaches a lapsing client.",
      },
      {
        type: 'p',
        content: "You can fix every single one of these things without changing how you work. You just need systems running in the background — handling the follow-through while you focus on your clients.",
      },
      {
        type: 'p',
        content: "That's what we build at Ops by Noell. If you want to see what it would look like for your practice specifically, a free Revenue Audit is the right place to start. We map exactly where you're losing revenue and show you the ROI on fixing it.",
      },
    ],
  },
];

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function Blog() {
  const post = POSTS[0];

  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ ARTICLE HERO ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '140px', paddingBottom: '60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.18) 0%, rgba(139,92,246,0.08) 40%, #010509 70%)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#A78BFA', textDecoration: 'none', marginBottom: '2rem' }}>
              <ArrowLeft size={14} /> Back to Home
            </a>
          </FadeItem>

          <FadeItem delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                {post.category}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583' }}>
                <Clock size={12} /> {post.readTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583' }}>
                <Calendar size={12} /> {post.date}
              </span>
            </div>
          </FadeItem>

          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              {post.title}
            </h1>
          </FadeItem>

          <FadeItem delay={0.15}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', lineHeight: 1.75, marginBottom: '2rem' }}>
              {post.excerpt}
            </p>
          </FadeItem>

          <FadeItem delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', flexShrink: 0 }}>
                N
              </div>
              <div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>{post.author}</p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#868583', margin: 0 }}>Ops by Noell</p>
              </div>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ═══ ARTICLE BODY ═══════════════════════════════════════════ */}
      <section style={{ padding: '0 0 6rem' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <div style={{ borderTop: '1px solid rgba(167,139,250,0.08)', paddingTop: '3rem' }}>
              {post.body.map((block, i) => {
                if (block.type === 'intro') {
                  return (
                    <p key={i} style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#a0a8b8', lineHeight: 1.85, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                      {block.content}
                    </p>
                  );
                }
                if (block.type === 'h2') {
                  return (
                    <h2 key={i} style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                      {block.content}
                    </h2>
                  );
                }
                if (block.type === 'p') {
                  return (
                    <p key={i} style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                      {block.content}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ═══ CTA BANNER ════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', background: 'rgba(167,139,250,0.015)' }}>
        <div className="container" style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
          <FadeItem delay={0}>
            <span style={{ display: 'inline-block', padding: '0.3rem 0.875rem', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              Free Revenue Audit
            </span>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              See exactly where your practice is <GradientText>losing revenue.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, marginBottom: '2rem' }}>
              A free 30-minute call where we map the exact gaps in your client journey — missed calls, no-shows, lapsed clients — and show you the ROI on fixing them.
            </p>
            <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free Intro Call <ArrowRight size={16} />
            </a>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', marginTop: '1rem' }}>
              No commitment. No credit card. Just a real conversation.
            </p>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
