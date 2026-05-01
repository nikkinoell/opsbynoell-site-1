/*
 * OPS BY NOELL — Booking Thank You
 * Purpose: Post-booking landing for GHL redirect.
 * Fires Google Ads conversion: AW-18123945519/UI5DCPOdgKYcEK_slcJD
 */

import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Clock, Mail } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function BookThanks() {
  const conversionFired = useRef(false);

  useEffect(() => {
    // Fire Google Ads conversion exactly once per page mount
    if (conversionFired.current) return;
    conversionFired.current = true;

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18123945519/UI5DCPOdgKYcEK_slcJD',
        value: 200.0,
        currency: 'USD',
        transaction_id: `book-${Date.now()}`,
      });
    }

    // Also push to dataLayer for GA4 / future GTM use
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'booking_complete',
        event_category: 'lead',
        event_label: 'discovery_call_booked',
        value: 200,
      });
    }

    // Update page title for clarity
    document.title = 'Booking Confirmed — Ops by Noell';
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HERO — confirmation */}
      <section
        style={{
          paddingTop: '120px',
          paddingBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem', color: '#0CA2A2' }}>
            You're booked
          </p>
          <h1
            style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#1A1A1A',
              lineHeight: 1.7,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Your audit call is confirmed
          </h1>
          <p
            style={{
              fontFamily: "'Nicholas', serif",
              fontSize: '1.0625rem',
              fontWeight: 400,
              color: '#555555',
              lineHeight: 1.75,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Check your inbox for the calendar invite and Zoom link. We'll see you at your scheduled time.
          </p>
        </div>
      </section>

      {/* WHAT TO DO BEFORE THE CALL */}
      <section
        style={{
          padding: 'clamp(2rem, 4vw, 2.5rem) 0',
          borderTop: '1px solid #E5E5E5',
        }}
      >
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p
            className="eyebrow"
            style={{ marginBottom: '1.5rem', textAlign: 'center' }}
          >
            Before We Talk
          </p>

          {[
            {
              icon: Calendar,
              title: 'Add the call to your calendar',
              detail:
                "You'll get an email with the meeting link and an .ics calendar file. Add it now so it doesn't get lost.",
            },
            {
              icon: Clock,
              title: 'Block 30 minutes — no distractions',
              detail:
                "We'll move fast, but the best calls happen when you're somewhere quiet. Headphones, water, and your numbers in front of you.",
            },
            {
              icon: Mail,
              title: 'Think about your top 2 bottlenecks',
              detail:
                "What's costing you sleep? Missed calls? No-shows? Slow follow-up? Come ready to share — that's where the audit starts.",
            },
          ].map((item, i, arr) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                padding: '1.5rem 0',
                borderBottom:
                  i < arr.length - 1 ? '1px solid rgba(167,139,250,0.12)' : 'none',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(20,20,20,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <item.icon size={16} color="#A78BFA" />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#1A1A1A',
                    marginBottom: '0.375rem',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: '#555555',
                    lineHeight: 1.7,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESOURCES TO READ */}
      <section
        style={{
          padding: 'clamp(2rem, 4vw, 2.5rem) 0',
          borderTop: '1px solid #E5E5E5',
          borderBottom: '1px solid #E5E5E5',
          backgroundColor: '#FAFAF8',
        }}
      >
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            Worth a Read Before We Meet
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <a
              href="/case-study/massage-therapist"
              style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1rem',
                color: '#1A1A1A',
                textDecoration: 'none',
                padding: '1rem 1.25rem',
                background: '#FFFFFF',
                border: '1px solid rgba(167,139,250,0.25)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Case Study: $960 recovered in 14 days for a Laguna Niguel massage therapist</span>
              <ArrowRight size={16} color="#0CA2A2" />
            </a>
            <a
              href="/resources/revenue-calculator"
              style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1rem',
                color: '#1A1A1A',
                textDecoration: 'none',
                padding: '1rem 1.25rem',
                background: '#FFFFFF',
                border: '1px solid rgba(167,139,250,0.25)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Revenue Calculator: estimate what your gaps cost monthly</span>
              <ArrowRight size={16} color="#0CA2A2" />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FALLBACK */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: "'Nicholas', serif",
              fontSize: '1rem',
              fontWeight: 400,
              color: '#555555',
              lineHeight: 1.75,
            }}
          >
            Need to reschedule? Reply to your confirmation email or reach us at{' '}
            <a
              href="mailto:hello@opsbynoell.com"
              style={{ color: '#0CA2A2', textDecoration: 'none' }}
            >
              hello@opsbynoell.com
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
