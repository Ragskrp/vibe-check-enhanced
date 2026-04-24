import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Code, Cpu, Layers, GitMerge, Settings, Compass } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function ComputationalThinkingPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00d4ff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Code size={16} /> Problem Solving
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            The New Literacy: <span>Computational Thinking</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            You do not need to be a software engineer to think like one. Explore the four pillars of computational thinking and discover how this fundamental mental architecture can help you ruthlessly decompose and solve any problem in your life.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="computational-thinking" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>The Mental Architecture:</strong> Computational Thinking is not about hardware; it is a high-level cognitive process that involves breaking down massive, chaotic systems into logical, actionable components that a human (or a machine) can execute flawlessly.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            When the average person hears the word "computational," their mind immediately jumps to silicon chips, glowing screens of binary code, and complex software infrastructure. But <strong>Computational Thinking (CT)</strong> has very little to do with the physical machines sitting on our desks. 
          </p>
          <p>
            As renowned computer scientist Jeannette Wing famously put it in her seminal 2006 essay: <em>"Computational thinking involves solving problems, designing systems, and understanding human behavior, by drawing on the concepts fundamental to computer science."</em>
          </p>
          <p>
            In the 21st century, CT is rapidly becoming the new foundational literacy, taking its place alongside reading, writing, and arithmetic. It is a universal mental toolkit that allows you to take a massive, messy, overwhelming problem—whether that is building a startup, planning a cross-country move, or diagnosing a rare disease—and systematically strip it down into a series of clear, logical, and executable steps. Whether you are a Fortune 500 CEO, a Michelin-star chef, or a student preparing for exams, thinking computationally is the ultimate secret weapon for clarity and efficiency.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>The Four Pillars of Computational Thinking</h2>
          <p>
            To think like a computer scientist, you do not need to learn Python or C++. You simply need to master the four core cognitive pillars of the discipline.
          </p>

          <h3 style={{ color: '#ff2d78', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Pillar 1: Decomposition (Divide and Conquer)</h3>
          <p>
            The first and most critical step in CT is <strong>Decomposition</strong>—the art of aggressively breaking a complex, intimidating problem into smaller, highly manageable parts. 
          </p>
          <p>
            Imagine you want to start a new business. That is a massive, opaque, and terrifying goal. Most people experience cognitive paralysis when faced with a task of that magnitude. But if you deploy decomposition, the monolith crumbles into actionable pieces. "Start a business" decomposes into: Product Design, Market Research, Legal Setup, and Marketing. 
          </p>
          <p>
            But you don't stop there. You decompose "Marketing" into: Website Creation, Social Media Strategy, and Email Campaigns. You decompose "Website Creation" into: Buy Domain, Design Logo, Write Copy. By the time you are finished decomposing, you are no longer staring at the terrifying prospect of "starting a business"; you are simply looking at a Tuesday morning to-do list that says "Buy a domain name." Decomposition is the ultimate cure for procrastination and overwhelm.
          </p>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <h3 style={{ color: '#00d4ff', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> Pillar 2: Pattern Recognition
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              Once you have decomposed a problem, you look at the broken pieces and search for similarities. This is **Pattern Recognition**. Have you solved a problem like this before? Have other people solved this exact problem in a different industry? If you are trying to optimize the flow of customers through a coffee shop, you might recognize that this is the exact same pattern as optimizing the flow of data packets through a router. By recognizing these structural similarities, you don't have to invent a new solution from scratch; you can simply import and adapt the proven logic from the past. It is the ultimate cognitive shortcut.
            </p>
          </div>

          <h3 style={{ color: '#ffd700', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Pillar 3: Abstraction (Filtering the Noise)</h3>
          <p>
            <strong>Abstraction</strong> is arguably the most difficult of the four pillars to master because it requires extreme discipline. It involves focusing intensely on the essential details of a problem while deliberately and aggressively ignoring all the irrelevant noise. 
          </p>
          <p>
            Think of the iconic London Underground map. Geographically, it is completely inaccurate. The real train lines curve wildly and distances vary greatly. If the map included every twist, turn, tree, and surface-level building, it would be visually chaotic and utterly useless to a traveler. The designer, Harry Beck, used brilliant abstraction. He stripped away all the geographical "fluff" and reduced the system to its pure, logical core: straight lines, distinct colors, and nodes (stations). 
          </p>
          <p>
            In problem-solving, abstraction means identifying the 'Core Logic' of your situation. If you are diagnosing why a car won't start, the color of the paint and the brand of the tires are irrelevant variables. You must abstract them away to focus purely on the electrical and combustion systems.
          </p>

          <h3 style={{ color: '#00ff94', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Pillar 4: Algorithmic Design (The Recipe)</h3>
          <p>
            If you have successfully decomposed the problem, recognized the patterns, and abstracted away the noise, the final step is <strong>Algorithmic Design</strong>. An algorithm is simply a clear, unambiguous, step-by-step set of instructions for solving the problem. 
          </p>
          <p>
            A recipe for baking a cake is an algorithm. The instructions for assembling IKEA furniture are an algorithm. The crucial aspect of a good algorithm is that it must be so precise that a completely mindless entity (like a computer or a tired intern) could follow it without needing any intuition or guesswork. If an algorithm says "add some salt," it is a bad algorithm. If it says "add exactly 5 grams of sodium chloride," it is a perfect algorithm.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Cpu size={24} color="#00ff94" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>The Power of Scalability</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The magic of CT is that once you have designed a flawless algorithm to solve a problem for one person, you can scale that exact same logic to solve it for a billion people simultaneously using software.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Settings size={24} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>The 'Debugging' Mindset</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>CT teaches you that failure is not a moral flaw; it is simply a 'bug' in the system. When things go wrong, you don't panic. You methodically trace the algorithm back to find the exact line of logic that failed.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <GitMerge size={24} color="#ffd700" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Heuristic vs. Algorithm</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>An algorithm guarantees a perfect answer but takes time. A heuristic is a mental shortcut that gives a 'good enough' answer quickly. CT requires knowing exactly when to deploy each tool.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>Computational Thinking in the 'Real World'</h2>
          <p>
            You likely already use Computational Thinking every day without realizing it. The goal is to move it from a subconscious habit to a deliberate, conscious weapon.
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>The Culinary Arts:</strong> When a head chef organizes a kitchen, they use intense Decomposition to assign specific stations (sauce, grill, prep). They use Abstraction to ignore the dining room chaos and focus only on the ticket times. They use precise Algorithms (recipes) to ensure the 100th dish tastes identical to the first.</li>
            <li style={{ marginBottom: 16 }}><strong>Medical Triage:</strong> An ER doctor uses Pattern Recognition immediately upon seeing a patient. They Abstract away the patient's clothing or mood to focus solely on vital signs. They then execute a strict diagnostic Algorithm to rule out lethal conditions one by one.</li>
            <li style={{ marginBottom: 16 }}><strong>Creative Writing:</strong> A novelist decomposes a 300-page book into Acts, Chapters, and Scenes. They recognize the classic patterns of the "Hero's Journey" to structure the narrative tension.</li>
          </ul>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Compass size={24} /> VIBEMENOW: The Logic Gym
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              Every challenge built into the VIBEMENOW platform is a direct, high-intensity exercise in the four pillars of Computational Thinking. Our adaptive puzzles require you to decompose complex visual patterns, recognize hidden mathematical sequences, and ruthlessly abstract away distracting 'noise' to find the core solution. We don't just want you to get the high score on a puzzle; we want to permanently install the 'Computational Operating System' into your brain so you can execute flawless logic in your exams, your career, and your life.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>Conclusion: Writing Better Code for Your Life</h2>
          <p>
            The world is becoming exponentially more complex, chaotic, and data-heavy. The biological hardware of the human brain is not upgrading fast enough to handle this raw influx of information naturally. Computational Thinking is the crucial software update we desperately need.
          </p>
          <p>
            By adopting this mindset, you stop being a passive victim of complexity. You become the architect of solutions. You realize that no problem is too big; it is simply an algorithm that hasn't been written yet. You are the programmer of your own life. It's time to start writing better code.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #00d4ff, #00ff94, #ff2d78)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Upgrade Your Mental OS</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Ready to master the four pillars of ultimate problem-solving logic? Enter our computational thinking modules and start decomposing the world around you.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#00d4ff', color: '#000', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Enter Logic Lab
              </div>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                More Problem Solving
              </div>
            </Link>
          </div>
        </footer>
      </article>

      <style jsx>{`
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
