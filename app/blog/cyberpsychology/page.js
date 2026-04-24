'use client';

import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Wifi, Smartphone, Monitor, ShieldAlert, HeartPulse, EyeOff } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function CyberpsychologyPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff2d78', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Smartphone size={16} /> Behavioral Science
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            The Digital Mirror: Understanding <span>Cyberpsychology</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            Our brains were evolved for the African savanna, but we now spend our lives residing in the cloud. Explore the fascinating science of how the digital world is physically, socially, and psychologically rewiring what it means to be human.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="cyberpsychology" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>The Neural Interface:</strong> Cyberpsychology is the multidisciplinary study of how human-computer interaction, virtual environments, and global connectivity affect our deep-seated emotions, social relationships, and cognitive architecture.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            You are currently reading these words by staring into a glowing rectangle composed of glass and silicon. If you are like the average adult, you likely interact with this device over 2,600 times a day. You cultivate friendships with people you have never physically met, navigate vast, three-dimensional virtual worlds, and seamlessly outsource massive portions of your memory to distant server farms. 
          </p>
          <p>
            From a biological standpoint, this is wildly unprecedented. We are the first generation of <em>Homo digitalis</em>. 
          </p>
          <p>
            <strong>Cyberpsychology</strong> is the scientific discipline dedicated to studying this profound transition. It is the frontier where the ancient, evolutionarily hard-wired human brain violently collides with the hyper-stimulating, modern digital environment. Founded by researchers like Mary Aiken, it asks the most critical question of the 21st century: When we spend half our waking hours in cyberspace, how does technology fundamentally change who we are in reality?
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>I. The Online Disinhibition Effect: The Invisible Mask</h2>
          <p>
            Have you ever wondered why perfectly normal, polite individuals can become incredibly aggressive, hostile, or even shockingly intimate when they log onto a forum or social media platform? 
          </p>
          <p>
            In 2004, psychologist <strong>John Suler</strong> identified this phenomenon and coined it the <strong>Online Disinhibition Effect</strong>. He discovered that when humans are behind a screen, the brain's standard social policing systems—primarily located in the Prefrontal Cortex—do not fire in the same way they do during face-to-face interactions. 
          </p>
          <p>
            Several factors drive this disinhibition:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Dissociative Anonymity:</strong> "They don't know who I am." When our physical identity is detached from our digital avatar, we feel a massive reduction in personal accountability.</li>
            <li style={{ marginBottom: 16 }}><strong>Invisibility:</strong> "They can't see me." The lack of eye contact and body language removes the immediate biological feedback mechanisms that normally trigger empathy and shame.</li>
            <li style={{ marginBottom: 16 }}><strong>Asynchronicity:</strong> "See you later." Because online conversations don't happen in real-time, you can drop a toxic comment and immediately run away, escaping the emotional blowback of a real-time argument.</li>
          </ul>
          <p>
            Suler noted that this leads to "Toxic Disinhibition" (trolling, cyberbullying) but also "Benign Disinhibition," where individuals feel safe enough to share deep traumas, confess secrets, or show extreme kindness to strangers they would never speak to on the street. Cyberspace acts as a potent truth serum for the subconscious.
          </p>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(255, 45, 120, 0.04)', border: '1px solid rgba(255, 45, 120, 0.1)' }}>
            <h3 style={{ color: '#ff2d78', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> The Proteus Effect: Becoming the Avatar
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              Named after the shape-shifting Greek god, the **Proteus Effect** was discovered by Stanford researchers Nick Yee and Jeremy Bailenson. They found that the visual characteristics of your digital avatar actively change your behavior. In VR experiments, users given exceptionally tall avatars negotiated much more aggressively in business simulations than users given short avatars. Users given highly attractive avatars stood closer to strangers and disclosed more personal information. We don't just control our digital bodies; our digital bodies psychologically reprogram us.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>II. Variable Reward Schedules: The Digital Slot Machine</h2>
          <p>
            To understand why it is so difficult to put your smartphone down, you must look back to the 1950s and the work of behaviorist <strong>B.F. Skinner</strong>. Skinner placed pigeons in a box with a lever. Sometimes pressing the lever gave them a pellet of food; sometimes it gave them nothing. 
          </p>
          <p>
            Skinner discovered something terrifying: if he gave the pigeons food <em>every</em> time they pressed the lever, they only pressed it when they were hungry. But if the reward was unpredictable (a <strong>Variable Ratio Schedule</strong>), the pigeons became completely addicted, frantically pecking the lever until they collapsed from exhaustion.
          </p>
          <p>
            Modern Silicon Valley UI/UX designers use this exact psychological exploit to capture your attention. Your email inbox, your Instagram feed, and your TikTok algorithm are all perfectly calibrated Digital Skinner Boxes. You pull the lever (refresh the page), and you don't know what you are going to get. It might be nothing. It might be a devastating news headline. Or it might be the social validation of a "Like" or a viral meme. 
          </p>
          <p>
            This unpredictability triggers massive spikes of dopamine in the brain's reward center (the Nucleus Accumbens), overriding your rational decision to stop scrolling. You aren't lacking willpower; you are fighting a multi-billion-dollar algorithm designed to exploit your deepest evolutionary biology.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>III. Social Comparison Theory: The Infinite Highlight Reel</h2>
          <p>
            In 1954, Leon Festinger proposed <strong>Social Comparison Theory</strong>, stating that humans have a profound biological drive to evaluate their own worth by comparing themselves to others. For 99% of human history, this was fine. You only compared yourself to the 150 people in your local tribe or village.
          </p>
          <p>
            Today, social media has broken this biological mechanism. You are no longer comparing yourself to your neighbor; you are comparing your "behind-the-scenes", messy, mundane reality to the heavily filtered, perfectly curated "highlight reels" of the top 0.001% of the global population. 
          </p>
          <p>
            The brain cannot intuitively comprehend that it is looking at an algorithmic illusion. This relentless, asymmetrical comparison is heavily correlated with the modern crisis of anxiety, depression, body dysmorphia, and the chronic Fear Of Missing Out (FOMO).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Brain size={24} color="#00d4ff" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Digital Amnesia (The Google Effect)</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>Because the brain knows information is easily retrievable online, it actively stops committing facts to biological memory. We have shifted from 'knowing facts' to merely 'knowing where to search for facts.' We are turning the internet into our external hard drive.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <HeartPulse size={24} color="#ffd700" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Cyberchondria</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The extreme anxiety triggered by searching for medical symptoms online. Because search algorithms prioritize highly engaging (terrifying) worst-case scenarios, a simple headache rapidly convinces the user they have a rare, terminal disease.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Monitor size={24} color="#00ff94" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Continuous Partial Attention</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>Unlike multitasking (which implies switching), this is the state of keeping 'tabs' open in your brain constantly. You are watching TV, scrolling a phone, and eating simultaneously, leading to chronic, low-level cognitive exhaustion.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>IV. Reclaiming Digital Sovereignty</h2>
          <p>
            The solution to the psychological pitfalls of the digital age is not to throw your phone in the ocean and move to a cabin in the woods. The digital world is the new ecosystem of humanity. The goal is to develop <strong>Digital Sovereignty</strong>—the ability to use technology as a tool for mastery, rather than being used by it as a product.
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Digital Minimalism:</strong> Coined by Cal Newport, this philosophy urges you to evaluate the true ROI (Return on Investment) of every app. If an app doesn't serve a deeply held personal value, aggressively delete it.</li>
            <li style={{ marginBottom: 16 }}><strong>Break the Variable Reward:</strong> Turn off all non-human notifications. Your phone should only buzz if a real human being is trying to contact you directly. Turn off all badges, banners, and pings from algorithms trying to hijack your dopamine.</li>
            <li style={{ marginBottom: 16 }}><strong>The Gray-Scale Hack:</strong> Go to your phone's accessibility settings and change the screen to black and white. By removing the vibrant, slot-machine colors, you instantly break the visual dopamine hook. The phone becomes a boring utility tool rather than an addictive toy.</li>
            <li style={{ marginBottom: 16 }}><strong>Establish 'No-Tech Zones':</strong> The brain is highly contextual. Designate the bedroom and the dinner table as absolute zero-tech zones to protect your sleep hygiene and foster deep, biological human connection.</li>
          </ol>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <ShieldAlert size={24} /> Cyber-Wellbeing at VIBEMENOW
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              At VIBEMENOW, we are acutely aware of the 'Dopamine Trap.' Traditional educational technology often copies the addictive, manipulative mechanics of social media. We refuse to do this. VIBEMENOW is explicitly designed for high-quality, intentional, 'Deep Work' engagement. We do not want you scrolling endlessly; our logic modules have clear, satisfying completion points. We reward genuine cognitive struggle and mastery, not passive time spent staring at a screen. We aim to be the cognitive gym that strengthens your mind, not the casino that drains it.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>V. Conclusion: The Conscious Cyborg</h2>
          <p>
            Whether we realize it or not, we are all already cyborgs. We have fundamentally outsourced a large portion of our memory, our social navigation, and our identity to machines. 
          </p>
          <p>
            The field of cyberpsychology proves that the screen is not a neutral window; it is a highly active mirror that distorts, amplifies, and rewires human nature. By understanding the psychological mechanics running beneath the glass, you can step out of the algorithmic stream. You can reclaim your attention, protect your mental architecture, and choose precisely how you want to evolve.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #ff2d78, #00d4ff, #ffd700)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Reclaim Your Mental Focus</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Ready to use technology as a tool for mastery rather than a distraction? Dive into our intentional logic modules and train your brain to focus deeply in an incredibly noisy world.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#ff2d78', color: '#fff', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Intentional Training
              </div>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                More Cyber Science
              </div>
            </Link>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p {
          margin-bottom: 28px;
        }
        .blog-content strong {
          color: #fff;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
