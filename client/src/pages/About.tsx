/*
 * OPS BY NOELL — About Page (NeuraFlas Design System)
 * - Background: #010509, Nicholas headings, Sora body, #A78BFA accent
 * - Sections: Hero, Who We Are, Why We Built This, Differentiators, CTA
 */

import { ArrowRight, Zap, Shield, Target, TrendingUp } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1.25rem',
      fontSize: '0.75rem',
      fontWeight: 600,
      fontFamily: "'Nicholas', serif",
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: '#0CA2A2',
      background: 'rgba(12,162,162,0.06)',
      border: '1px solid rgba(167, 139, 250, 0.2)',
      borderRadius: '4px',
    }}>
      {children}
    </span>
  );
}

const differentiators = [
  {
    icon: Target,
    title: "We specialize in local businesses.",
    body: "No enterprise clients. No SaaS. No corporate workflows. Every system we've built is for a local service business owner who wears every hat and needs infrastructure that fits their life.",
  },
  {
    icon: Zap,
    title: "We build it. We manage it. We keep it running.",
    body: "We design your system, install every component, test it before go-live, and manage it from there. You never touch a setting.",
  },
  {
    icon: TrendingUp,
    title: "We focus on revenue, not vanity metrics.",
    body: "We track leads recovered, appointments booked, no-shows prevented, reviews generated, clients reactivated. Every conversation is anchored in revenue impact.",
  },
  {
    icon: Shield,
    title: "We show you the math first. Always.",
    body: "Before you spend a dollar on a build, you see exactly what your operational gaps cost you monthly, quantified from your actual numbers. Informed decisions, every step.",
    highlight: true,
  },
];

export default function About() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', paddingTop: '80px', textAlign: 'center', overflow: 'hidden' }}>
        {/* Hero gradient bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(120,58,237,0.18) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)',
        }} />
        <div style={{ position: 'absolute', top: '-80px', left: '-100px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '60px', right: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(2rem, 5vw, 5rem)', paddingBottom: '3rem' }}>
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <SectionBadge>About Ops by Noell</SectionBadge>
            </div>
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
              fontWeight: 800, lineHeight: 1.7, letterSpacing: '-0.04em',
              maxWidth: '800px', marginBottom: '1.75rem', color: '#1A1A1A', margin: '0 auto 1.75rem',
            }}>
              <span style={{ background: 'linear-gradient(90deg, #0CA2A2 0%, #0DCFCF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                We've spent years building the fix for businesses exactly like yours.
              </span>
            </h1>
          </div>
          <div>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1rem, 1.4vw, 1.1875rem)', fontWeight: 400, color: '#555555', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto' }}>
              We're Nikki and James Noell, and we put our last name on this for a reason.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER PHOTO ─── */}
      <div style={{ textAlign: 'center', padding: '0 1.25rem 1.5rem' }}>
        <img
          src="/images/noell-family.jpg"
          alt="Nikki and James Noell, founders of Ops by Noell"
          style={{
            maxWidth: '600px',
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover',
            borderRadius: '12px',
            margin: '0 auto',
            border: '1px solid rgba(167,139,250,0.25)',
          }}
        />
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem' }}>
          <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>Nikki Noell</span>
          <span style={{ color: 'rgba(167,139,250,0.4)', fontSize: '0.9375rem' }}>&amp;</span>
          <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A' }}>James Noell</span>
          <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600, color: '#0CA2A2', letterSpacing: '0.1em', textTransform: 'uppercase' as const, alignSelf: 'center', marginLeft: '0.25rem' }}>Co-Founders</span>
        </div>
      </div>

      {/* ─── WHO WE ARE ─── */}
      <div className="reveal">
      <section style={{ padding: 'clamp(2rem, 4vw, 2.5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="lg:grid-cols-2">

            <div className="reveal">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: '#E5E5E5', borderRadius: '8px', overflow: 'hidden' }}>
                  {[
                    { label: 'Founded', value: '2025', sub: 'Mission Viejo, CA' },
                    { label: 'Avg. Time to Live', value: '2 wks', sub: 'From audit to launch' },
                    { label: 'No-Show Reduction', value: '30–50%', sub: 'With automated reminders' },
                    { label: 'Response Time', value: '< 10 sec', sub: 'Missed call text-back' },
                  ].map((stat, i) => (
                    <div key={i} style={{ background: 'rgba(167,139,250,0.03)', padding: '2rem 1.5rem' }}>
                      <p style={{
                        fontFamily: "'Nicholas', serif",
                        fontSize: '2rem', fontWeight: 600,
                        color: '#1A1A1A', lineHeight: 1,
                        marginBottom: '0.375rem', letterSpacing: '-0.02em',
                      }}>
                        {stat.value}
                      </p>
                      <p style={{
                        fontFamily: "'Nicholas', serif",
                        fontSize: '0.6875rem', fontWeight: 600,
                        color: '#0CA2A2', letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginBottom: '0.25rem',
                      }}>
                        {stat.label}
                      </p>
                      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 400, color: '#555555' }}>
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal">
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <SectionBadge>Who We Are</SectionBadge>
                </div>
                <h2 style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: 'clamp(1.375rem, 4vw, 2.5rem)',
                  fontWeight: 700, color: '#1A1A1A',
                  lineHeight: 1.7, marginBottom: '1.75rem',
                }}>
                  We come from operations. We build what actually works.
                </h2>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 400, color: '#555555', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  If you're reading this, you're probably a great service business owner running without a real back office. You're answering your own calls when you can, following up on leads when you remember, hoping clients show up. We've spent years watching that exact pattern cost service business owners thousands of dollars a month in preventable gaps. So we built the systems to fix it, and now we build them for you.
                </p>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 400, color: '#555555', lineHeight: 1.8, marginBottom: '2rem' }}>
                  We're Nikki and James Noell, based in Mission Viejo, Orange County. Our name is on the door because every system we build, we stand behind.
                </p>

                {/* Family name callout */}
                <div style={{
                  borderLeft: '3px solid #0CA2A2',
                  paddingLeft: '1.25rem',
                  marginBottom: '0',
                }}>
                  <p style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '1.1875rem',
                    fontWeight: 700,
                    color: '#1A1A1A',
                    lineHeight: 1.7,
                    marginBottom: '0.5rem',
                  }}>
                    Our family name is on the door.
                  </p>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', fontWeight: 400, color: '#555555', lineHeight: 1.7 }}>
                    Every system we build, we build like it's our own business on the line. Because in a way, it is.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      </div>

      {/* ─── DIFFERENTIATORS ─── */}
      <div className="reveal">
      <section style={{ padding: 'clamp(2rem, 4vw, 2.5rem) 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container">
          <div className="reveal">
            <div style={{ maxWidth: '520px', marginBottom: 'clamp(1.5rem, 4vw, 4rem)' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <SectionBadge>Why Ops by Noell</SectionBadge>
              </div>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.375rem, 4vw, 2.5rem)',
                fontWeight: 700, color: '#1A1A1A', lineHeight: 1.7,
              }}>
                Four things that make us different.
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2">
            {differentiators.map((d, i) => (
              <div className="reveal" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                <div
                  className="feature-card"
                  style={{
                    padding: '2.5rem', height: '100%', position: 'relative',
                    border: d.highlight ? '1px solid rgba(167,139,250,0.35)' : '1px solid rgba(167,139,250,0.12)',
                    background: d.highlight ? 'rgba(167,139,250,0.06)' : 'rgba(167,139,250,0.02)',
                  }}
                >
                  {d.highlight && (
                    <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                      <span style={{
                        fontFamily: "'Nicholas', serif",
                        fontSize: '0.5625rem', fontWeight: 600,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: '#0CA2A2', border: '1px solid rgba(167,139,250,0.3)',
                        padding: '0.25rem 0.625rem', borderRadius: '4px',
                        background: '#F5F5F5',
                      }}>
                        Signature Promise
                      </span>
                    </div>
                  )}
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: 'rgba(12,162,162,0.06)', border: '1px solid #E8E8E8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}>
                    <d.icon size={22} color="#A78BFA" />
                  </div>
                  <h3 style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '1.25rem', fontWeight: 700,
                    color: '#1A1A1A', lineHeight: 1.7, marginBottom: '1rem',
                  }}>
                    {d.title}
                  </h3>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', fontWeight: 400, color: '#555555', lineHeight: 1.75 }}>
                    {d.body}
                  </p>
                  {d.highlight && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <a href="/book" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        fontFamily: "'Nicholas', serif",
                        fontSize: '0.75rem', fontWeight: 600,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#0CA2A2', textDecoration: 'none',
                        transition: 'color 0.15s ease',
                      }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C4B5FD'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#A78BFA'; }}
                      >
                        Book a Free 30-Minute Audit <ArrowRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* ─── CTA ─── */}
      <div className="reveal">
      <section style={{ position: 'relative', padding: 'clamp(2rem, 4vw, 2.5rem) 0', borderTop: '1px solid #E5E5E5', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <div style={{ marginBottom: '1.5rem' }}>
              <SectionBadge>Work With Us</SectionBadge>
            </div>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800, lineHeight: 1.7, letterSpacing: '-0.03em',
              marginBottom: '1.25rem', maxWidth: '600px', margin: '0 auto 1.25rem',
              background: 'linear-gradient(90deg, #0CA2A2 0%, #0DCFCF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
            }}>
              Ready to see what we'd build for your business?
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 400, color: '#555555', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We learn about your business, you learn about us, and figure out together if we're the right fit.
            </p>
            <a href="/book" className="btn-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, padding: '1rem 2.25rem' }}>
              Book a Free 30-Minute Audit <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
      </div>

      <Footer />

      <style>{`
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
