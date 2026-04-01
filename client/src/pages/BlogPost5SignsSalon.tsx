/*
 * OPS BY NOELL — Blog Post 3
 * Route: /blog/5-signs-your-salon-needs-automation
 */

import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
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

const POST = {
  category: 'Salons & Med Spas',
  title: '5 Signs Your Salon or Med Spa Needs Automation Right Now',
  excerpt: "Not every business needs automation right this moment. But some problems are costing you thousands per month — and they're fixable with systems that require nothing from you to maintain. Here's how to tell if you're there.",
  author: 'Nikki Noell',
  date: 'March 2026',
  readTime: '5 min read',
};

export default function BlogPost5SignsSalon() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ ARTICLE HERO ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '140px', paddingBottom: '60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.18) 0%, rgba(139,92,246,0.08) 40%, #010509 70%)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#A78BFA', textDecoration: 'none', marginBottom: '2rem' }}>
              <ArrowLeft size={14} /> Back to Blog
            </a>
          </FadeItem>

          <FadeItem delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                {POST.category}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583' }}>
                <Clock size={12} /> {POST.readTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583' }}>
                <Calendar size={12} /> {POST.date}
              </span>
            </div>
          </FadeItem>

          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              {POST.title}
            </h1>
          </FadeItem>

          <FadeItem delay={0.15}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', lineHeight: 1.75, marginBottom: '2rem' }}>
              {POST.excerpt}
            </p>
          </FadeItem>

          <FadeItem delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', flexShrink: 0 }}>
                N
              </div>
              <div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>{POST.author}</p>
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

              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#a0a8b8', lineHeight: 1.85, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                Automation isn't the right answer for every business at every stage. But if you've been running your salon or med spa for a few years, have a consistent client base, and still feel like revenue is leaking despite a full schedule — the problem is almost certainly operational, not a demand issue.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#a0a8b8', lineHeight: 1.85, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                Here are five specific signals. If three or more apply to you, the math on automation almost certainly works.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                1. You're reminding clients by hand
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                If you or your front desk are texting or calling clients individually before appointments, that's time and mental bandwidth going into a task that should run automatically. More importantly, manual reminders are inconsistent — they happen when someone remembers to do them and stop when things get busy.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Data from Acuity Scheduling shows automated appointment reminders produce a 29% reduction in no-shows on average. For a med spa running 40 appointments per week at $200 per visit, a 29% reduction in a 10% no-show rate means recovering $2,000 or more in monthly revenue — from a system that costs a few hundred dollars to build and nothing to run.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                The reminder itself isn't the point. The consistency is.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                2. New inquiries take more than 5 minutes to respond to
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                This one has a hard number behind it. Research from Harvard Business Review found that businesses are 7 times more likely to convert a lead when they respond within 1 hour versus 2 hours. At 5 minutes versus 30, the gap is even wider.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                If someone fills out your booking form, sends an inquiry through your website, or calls while you're with a client — and the response takes more than a few minutes — a significant percentage of those leads are already gone by the time you reply. They've moved on to whoever responded faster.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Automated lead response changes the equation. The system replies within 60 seconds, every time, whether you're with a client or asleep. You stay in the conversation when it matters.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                3. You're not asking clients for reviews — or you're asking inconsistently
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                93% of consumers read online reviews before booking a local service provider. Your Google profile is often the first thing a prospective client sees — and the number and recency of your reviews directly affects whether they click through to your site or keep scrolling.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Most salon and med spa owners know they should be collecting reviews. Almost none of them do it consistently, because it requires a manual ask after every appointment — and manual tasks get dropped when you're busy.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                An automated review request — sent 30–60 minutes after checkout — converts at 20–40% in most service businesses when the timing is right. More reviews compound: better Google rankings mean more discovery, more discovery means more calls, more calls mean more clients. It's a compounding loop that most businesses leave unbuilt.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                4. Client reactivation is something you think about but never do
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Clients stop booking for reasons that have nothing to do with satisfaction. Life gets busy. They skip a month. Then another. And unless something prompts them to come back, they quietly become former clients.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                A single automated win-back sequence — triggered when a client hasn't booked in 6–8 weeks — recovers 10–15% of at-risk clients in most practices we work with. That's not a promotion or a discount. It's a short, personal-feeling message at exactly the right time, with an easy path to rebook.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                If you have 200 active clients and a 10% monthly attrition rate, that's 20 clients quietly leaving every month. A 10–15% recovery rate on a reactivation sequence means 2–3 clients per month coming back instead of being permanently lost. At $150–$200 per visit, that compounds fast.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                5. Your staff is spending time on admin that doesn't require judgment
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Scheduling back-and-forth. Answering the same three questions about pricing and availability. Following up on leads who inquired once and went quiet. Sending reminders manually. These are all tasks that require zero human judgment — and yet they consume a disproportionate amount of your team's time and attention.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                When these tasks run automatically, your team focuses on what actually requires a human: client experience, relationship-building, and the work that drives retention. The operational overhead drops, and the revenue per hour of human time goes up.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                If you recognize three or more of these signs, the systems that fix them can be built and running in two weeks. A free Revenue Audit is where we start — we map your specific gaps, put a number on each one, and show you what the fix costs versus what it recovers. No obligation to proceed.
              </p>

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
              See exactly what <GradientText>automation would fix</GradientText> in your business.
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, marginBottom: '2rem' }}>
              A free 30-minute call. We map your gaps, put a dollar figure on each one, and show you what the fix looks like — before you commit to anything.
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
