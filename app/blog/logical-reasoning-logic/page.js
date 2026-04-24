'use client';

import Link from 'next/link';
import { ArrowLeft, Target, Brain, ShieldAlert, Zap, Network, History, BookOpen, Search, CheckCircle, Scale, AlertOctagon, Cpu, Eye, Puzzle, FlaskConical, GitBranch } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function LogicalReasoningPage() {
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
            <Scale size={16} /> Formal Logic
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            The Architecture of Truth: A Guide to <span>Logical</span> Reasoning
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            Logic isn't just for mathematicians and ancient philosophers. It is the core operating system of the human mind. Explore why we struggle so profoundly with abstract rules, how cognitive biases hijack our rationality, and how to 'debug' your own reasoning processes.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="logical-reasoning-logic" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>The Grid of Logic:</strong> True logical reasoning is the disciplined process of breaking down complex, emotionally charged problems into verifiable, interconnected modules of objective truth.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            In a modern digital era defined by deepfakes, complex algorithmic bias, and highly contagious viral misinformation, the ability to think logically is no longer an academic luxury—it is a critical, uncompromising <strong>survival skill</strong>. 
          </p>
          <p>
            At its core, logic is simply the rigorous process of using structured rules to move from known information (premises) to a valid, reliable conclusion. But as any evolutionary psychologist or neuroscientist will tell you, the human brain was emphatically not evolved to be a perfect, calculating logic machine. We evolved for survival on the dangerous prehistoric savanna, an environment which required lightning-fast heuristics, intense social cohesion, and split-second emotional reactions over slow, objective truth-seeking.
          </p>
          <p>
            To become a true master of your own mind—and to navigate the incredibly complex modern information landscape without being manipulated—you must first understand the distinct mathematical engines of reasoning, and the biological "traps" that inevitably lead us astray.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>I. The Three Engines of Logic: Deductive, Inductive, and Abductive</h2>
          <p>
            Most people use the word "logic" as a vague catch-all term for "thinking clearly," but in formal science and philosophy, logic is divided into three highly specific, mathematically distinct engines. Mixing them up leads to catastrophic errors in human judgment.
          </p>
          
          <h3 style={{ color: '#00d4ff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>1. Deductive Reasoning (The Top-Down Engine)</h3>
          <p>
            This is the logic of absolute, ironclad certainty. Pioneered by Aristotle through his famous "Syllogisms," deduction starts with a broad, general rule (a major premise) and applies it mechanically to a specific case (a minor premise). If the premises are 100% true, and the structural logic is valid, the conclusion <em>must</em> be mathematically true. There is zero room for doubt or probability.
          </p>
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', margin: '32px 0', borderLeft: '4px solid #00d4ff' }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#ccc', fontSize: 18 }}>
              <strong>Premise 1 (Major):</strong> All humans are biologically mortal.<br />
              <strong>Premise 2 (Minor):</strong> Socrates is a human.<br />
              <strong>Conclusion:</strong> Therefore, Socrates is biologically mortal.
            </p>
          </div>
          <p>
            Deduction is the foundational engine of pure mathematics, geometry, and computer programming. It is incredibly powerful, but it has one severe limitation: it cannot actually create <em>new</em> knowledge about the world; it only mechanically reveals what is already implicitly hidden within the original premises.
          </p>

          <h3 style={{ color: '#00ff94', fontSize: 28, marginTop: 48, marginBottom: 20 }}>2. Inductive Reasoning (The Bottom-Up Engine)</h3>
          <p>
            This is the logic of probability, statistics, and pattern recognition. Rather than starting with a rule, we start by collecting specific, limited observations and use them to synthesize a broad general rule. 
          </p>
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', margin: '32px 0', borderLeft: '4px solid #00ff94' }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#ccc', fontSize: 18 }}>
              <strong>Observation:</strong> Every swan I have ever seen in Europe is white. My father has only seen white swans. All historical texts describe white swans.<br />
              <strong>Conclusion:</strong> Therefore, all swans are white.
            </p>
          </div>
          <p>
            Induction is the fundamental engine of the scientific method. It is how we learn almost everything about the natural world. However, as the Scottish philosopher David Hume famously pointed out, induction is fundamentally unstable. It is <em>always</em> subject to being violently proven wrong by a single, unforeseen "Black Swan" event (which, as shocked European explorers discovered in Australia in 1697, actually exist). Induction provides us with <em>strong probability</em>, never absolute certainty.
          </p>

          <h3 style={{ color: '#ff2d78', fontSize: 28, marginTop: 48, marginBottom: 20 }}>3. Abductive Reasoning (The Detective Engine)</h3>
          <p>
            This is the logic of the "best guess" or the "inference to the best explanation." We start with an incomplete set of observations and actively seek the simplest, most likely hypothesis that cleanly accounts for all the data.
          </p>
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', margin: '32px 0', borderLeft: '4px solid #ff2d78' }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#ccc', fontSize: 18 }}>
              <strong>Observation:</strong> I woke up and the grass outside is wet.<br />
              <strong>Known Rules:</strong> Rain makes grass wet. A sprinkler makes grass wet. A ruptured water main makes grass wet.<br />
              <strong>Conclusion:</strong> It probably rained last night, as that is the most common and statistically likely cause.
            </p>
          </div>
          <p>
            This is the highly pragmatic logic we use in 99% of our daily lives, from doctors formulating medical diagnoses to mechanics fixing cars to juries deciding criminal guilt. It relies heavily on <strong>Occam's Razor</strong>—the philosophical principle that, when presented with competing hypotheses, the one requiring the fewest assumptions is usually the correct one.
          </p>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <h3 style={{ color: '#00d4ff', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Search size={24} /> The Sherlock Holmes Fallacy
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              The famous fictional detective Sherlock Holmes constantly claimed to use the 'Science of Deduction,' but in mathematical reality, he was a master of **abduction.** He took tiny, highly specific clues (the unique mud on a boot, the specific ash of a Trichinopoly cigar) and made brilliant, highly probable leaps to a conclusion about a suspect's movements. True deduction requires absolutely no intuitive leaps—only the cold, mechanical processing of ironclad rules.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>II. The Wason Selection Task: Why Abstract Logic is Hard</h2>
          <p>
            If logic is so powerful, why do humans fail at it so consistently? In the 1960s, cognitive psychologist Peter Wason developed a deceptively simple puzzle that proved even highly educated adults struggle profoundly with pure, abstract logic. 
          </p>
          <p>
            Imagine four cards sitting on a table in front of you: <strong>A, B, 4, 7</strong>. You are told that every card has a letter on one side and a number on the other. 
          </p>
          <p>
            You are given a strict rule: <em>"If a card has a vowel on one side, it must have an even number on the other."</em> Which specific cards do you need to turn over to definitively prove if the rule is being broken? 
          </p>
          <p>
            Most people quickly and correctly choose the <strong>A</strong> (if there's an odd number on the back of the A, the rule is instantly broken). But almost everyone fails to realize they also logically <em>must</em> turn over the <strong>7</strong>. Why? Because if the 7 has a vowel on the back of it, the rule is also instantly broken! 
          </p>
          <p>
            People fail to pick the 7 because of a cognitive glitch called <strong>Confirmation Bias</strong>—we are neurologically hardwired to aggressively look for things that prove our rule right (like checking the 4), rather than actively searching for the data that proves us wrong.
          </p>

          <h3 style={{ color: '#ffd700', fontSize: 24, marginTop: 40, marginBottom: 16 }}>The Evolutionary Twist: The 'Cheater Detection' Module</h3>
          <p>
            Decades later, evolutionary psychologists Leda Cosmides and John Tooby brilliantly altered the Wason test. Instead of abstract letters and numbers, they used a social rule: <em>"If you are drinking alcohol, you must be over 21 years old."</em> The four cards represented people in a bar: <strong>[Drinking Beer], [Drinking Coke], [25 Years Old], [16 Years Old]</strong>.
          </p>
          <p>
            When framed this way, over 75% of people instantly know they need to check the person <strong>[Drinking Beer]</strong> and the <strong>[16 Year Old]</strong>. The underlying mathematical logic is completely identical to the vowel/number puzzle, but our performance skyrockets. Why? Because the human brain did not evolve to solve abstract mathematical puzzles; it evolved a highly specialized, hyper-fast neural module for <strong>"Cheater Detection"</strong> in social contracts to ensure tribal survival. We are brilliant at formal logic when social fairness is on the line, but terrible at it when it involves cold, abstract symbols.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>III. The Anatomy of Fallacies: Bugs in the Cognitive Code</h2>
          <p>
            If logic is the operating system of the human mind, fallacies are the software bugs. They are structural errors in reasoning that render an argument invalid. Recognizing them is the very first step in "debugging" your thought process.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <AlertOctagon size={24} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Affirming the Consequent</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>A formal deductive bug. 'If it rains, the grass is wet. The grass is wet. Therefore, it rained.' (Mathematically false: A sprinkler or a spilled bucket could have caused the wetness).</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <ShieldAlert size={24} color="#ffd700" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>The Straw Man Fallacy</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>An informal bug. Intentionally and maliciously misrepresenting or exaggerating your opponent's argument to make it significantly easier to attack. It targets emotion, completely abandoning logic.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Network size={24} color="#00ff94" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Post Hoc Ergo Propter Hoc</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>'After this, therefore because of this.' The brain's incredibly dangerous, biologically hardwired tendency to confuse mere statistical correlation with actual causation.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>IV. Bayesian Inference: The Logic of the Modern World</h2>
          <p>
            In the real world, we rarely deal with the absolute certainties of Aristotelian deduction. We live in a world of probabilities. The most powerful logical tool for navigating modern uncertainty is <strong>Bayesian Inference</strong> (named after the 18th-century statistician Thomas Bayes).
          </p>
          <p>
            Bayesian logic is a mathematical framework for updating your beliefs as you encounter new evidence. You start with a "Prior Probability" (your initial belief based on historical data). Then, you receive new evidence. You don't throw away your old belief entirely, nor do you blindly accept the new evidence. Instead, you mathematically combine them to create a "Posterior Probability" (your updated, highly accurate belief).
          </p>
          <p>
            This is how spam filters work, how self-driving cars navigate, and how the world's best forecasters predict elections. Bayesian thinkers are never 100% certain of anything; they simply assign probabilities to their beliefs and ruthlessly adjust those numbers every time new data arrives. It is the ultimate antidote to dogmatism.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>V. How to "Debug" Your Own Thoughts</h2>
          <p>
            You cannot permanently delete your cognitive biases—they are baked into the firmware of human biology—but you can build a powerful metacognitive toolkit to manage and override them. Here are three critical strategies:
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>The Falsification Test (Popperian Logic):</strong> Instead of constantly asking, "Why is my political or scientific belief true?", you must rigorously ask yourself, "What specific, tangible piece of evidence would it take to prove my belief is completely false?" If you cannot answer that question, you are dealing in religious dogma, not logical science.</li>
            <li style={{ marginBottom: 16 }}><strong>Steel-manning:</strong> Before you attack an opposing viewpoint, force yourself to construct the strongest, most articulate, most coherent version of their argument possible (the "Steel-man"). If you cannot successfully articulate and then dismantle the absolute strongest version of their case, your own logical position is highly vulnerable.</li>
            <li style={{ marginBottom: 16 }}><strong>The 10-Second Threshold:</strong> If you feel a massive, sudden emotional reaction to an argument, a tweet, or a piece of news, mandate a 10-second pause before responding or sharing. This physically allows the slower electrical signals of your rational Prefrontal Cortex to reach the brain and override the immediate, highly irrational Amygdala response.</li>
          </ol>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>VI. Conclusion: Logic as a Shield</h2>
          <p>
            Logic is the invisible, mathematical scaffolding that holds the entire modern world together. It is the language that allows us to build suspension bridges that do not collapse, to write software code that runs flawlessly, and to navigate an attention economy that is explicitly designed by billionaires to hijack our lowest emotional impulses. 
          </p>
          <p>
            By actively training your logical reasoning engines—knowing exactly when to deduce, when to induce, and when to abduce—you aren't just getting better at academic puzzles or debate. You are fundamentally upgrading your psychological armor, ensuring that you remain the sovereign author of your own decisions in the 21st century.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #00d4ff, #ff2d78, #00ff94)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Pressure Test Your Logic</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Our adaptive modules at VIBEMENOW are explicitly designed to expose your cognitive biases and challenge your slow, deliberate System 2 thinking in a fast-paced environment.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#00d4ff', color: '#000', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Play Logic Games
              </div>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                More Formal Science
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
