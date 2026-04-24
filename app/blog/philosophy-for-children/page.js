'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Brain, Zap, Target, History, Search, Heart, MessageCircle, Users, Lightbulb, Compass, Puzzle, Scale } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function P4CPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff8c00', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <BookOpen size={16} /> Pedagogical Science
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            Little Thinkers, Big Questions: The Case for <span>P4C</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            Philosophy isn't just for ivory towers. Discover how 'Philosophy for Children' (P4C) is revolutionizing education by teaching kids how to think, not what to think.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="philosophy-for-children" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>Interlocking Perspectives:</strong> P4C creates a 'Community of Inquiry' where children learn to bridge the gap between different viewpoints through respectful dialogue and logical deduction.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            When we think of "philosophy," we often imagine elderly men in togas or dense, unreadable books from the 18th century. We rarely imagine a group of 7-year-olds sitting in a circle discussing whether it's ever okay to tell a "white lie," or if a robot can feel sad. However, <strong>Philosophy for Children (P4C)</strong> is proving that children are natural philosophers, and that nurturing this instinct is one of the most vital things we can do for their cognitive and social development.
          </p>
          <p>
            Children possess a raw, unconditioned curiosity about the world. They are constantly asking <em>"Why?"</em> P4C takes this natural instinct and formalizes it into a rigorous pedagogy. Founded in the 1970s by Matthew Lipman, P4C is not about teaching kids the history of philosophy—they don't need to know Kant's Categorical Imperative. It is about engaging them in the <em>act</em> of philosophizing: teaching them to ask big questions, evaluate evidence, identify logical fallacies, and listen to others with empathy.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>I. The Lipman Legacy: The Birth of the Community of Inquiry</h2>
          <p>
            Matthew Lipman was a professor of logic at Columbia University who became increasingly frustrated by his university students' lack of critical thinking skills. They could memorize facts perfectly, but when asked to synthesize an argument or evaluate a premise, they struggled. He realized a fundamental flaw in the education system: waiting until college to teach logic was too late. The habits of mind needed to be built in primary school, when neural pathways are most malleable.
          </p>
          <p>
            In response, Lipman wrote a novel for children called <em>Harry Stottlemeier’s Discovery</em> (a playful nod to Aristotle). The book followed a group of kids as they explored the rules of logic through their daily experiences. This was the genesis of the <strong>Community of Inquiry (CoI)</strong>.
          </p>
          <p>
            The CoI is a radical shift from the traditional classroom. In a standard model, the teacher is the "Sage on the Stage," holding the answers, and the students are empty vessels to be filled. In a CoI, the teacher is a "Guide on the Side." The teacher facilitates the discussion, ensuring the rules of logic and respect are followed, but they do <em>not</em> provide the answers. The children must collaboratively seek the truth through dialogue.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>II. The 4Cs of Thinking: A Metacognitive Framework</h2>
          <p>
            P4C isn't just about arguing; it's about developing four specific types of thinking, often referred to as the "4Cs." Together, these form the "Meta-Skills" needed for life in the 21st century.
          </p>
          
          <h3 style={{ color: '#ff8c00', fontSize: 26, marginTop: 40, marginBottom: 20 }}>1. Critical Thinking (Seeking Truth)</h3>
          <p>
            This is the ability to evaluate claims. Children learn to ask: <em>"What is your evidence for that? Is that always true, or just sometimes true? Can we think of a counter-example?"</em> They learn the difference between an opinion (<em>"I like blue"</em>) and a reasoned argument (<em>"Blue is the best color for a bedroom because research shows it lowers heart rates"</em>).
          </p>

          <h3 style={{ color: '#ff8c00', fontSize: 26, marginTop: 40, marginBottom: 20 }}>2. Creative Thinking (Seeking Meaning)</h3>
          <p>
            This involves generating new ideas and hypotheses. When a child proposes a totally new way of looking at a problem (<em>"What if the villain in the story actually thought he was the hero?"</em>), they are exercising creative philosophy.
          </p>

          <h3 style={{ color: '#ff8c00', fontSize: 26, marginTop: 40, marginBottom: 20 }}>3. Caring Thinking (Seeking Value)</h3>
          <p>
            This is perhaps the most overlooked aspect of philosophy. Caring thinking means valuing the subject matter and valuing the people in the room. It involves empathy: <em>"How would it feel if that happened to you?"</em> It is the ethical anchor that prevents "critical thinking" from becoming mere cynicism or aggressive debate.
          </p>

          <h3 style={{ color: '#ff8c00', fontSize: 26, marginTop: 40, marginBottom: 20 }}>4. Collaborative Thinking (Seeking Common Ground)</h3>
          <p>
            A P4C session is not a debate where one side "wins" and the other "loses." It is a joint effort to build a better understanding. Children learn to say, <em>"I want to build on what Sarah just said..."</em> rather than <em>"Sarah is wrong because..."</em>
          </p>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(255, 140, 0, 0.04)', border: '1px solid rgba(255, 140, 0, 0.1)' }}>
            <h3 style={{ color: '#ff8c00', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Brain size={24} /> Vygotsky and the ZPD
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              P4C is deeply aligned with Lev Vygotsky's theory of the **Zone of Proximal Development (ZPD)**. Vygotsky argued that children learn best when engaged in tasks just slightly above their current independent ability, but achievable with the help of peers. In a Community of Inquiry, the collective intelligence of the group pushes individual children to reach cognitive heights they could not achieve alone.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>III. Neuroscience: Plasticity and the Social Brain</h2>
          <p>
            Why start so young? 2024 neuroscientific research confirms that the brain's <strong>Synaptic Plasticity</strong>—its ability to form new connections—is highly active during the primary school years. By engaging in philosophical inquiry early, children are literally "wiring" their prefrontal cortex for high-level executive function and logical reasoning.
          </p>
          <p>
            Furthermore, P4C has a profound impact on <strong>Social-Emotional Learning (SEL)</strong>. When a child learns to say, "I disagree with what you said, but I understand why you said it," they are activating their <strong>Theory of Mind</strong>—the cognitive ability to attribute mental states (beliefs, intents, desires) to oneself and to others, and to understand that others have beliefs that are different from one's own. This is the biological foundation of empathy and the antidote to tribalism.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Heart size={24} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Emotional Resilience</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>P4C provides a safe space to explore complex, sometimes frightening concepts (fairness, death, truth) through a structured, logical lens.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <MessageCircle size={24} color="#00d4ff" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Literacy Gains</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The Education Endowment Foundation (EEF) found that P4C can boost reading and math scores by up to two months in a single year, particularly for disadvantaged students.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Scale size={24} color="#ffd700" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Cognitive Dissonance</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>P4C intentionally creates 'cognitive conflict,' forcing the brain to update its mental models and discard weak assumptions.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>IV. Philosophy in the Age of AI</h2>
          <p>
            As artificial intelligence becomes increasingly adept at providing "answers," the economic and social value of human intelligence shifts from recall to <strong>inquiry</strong>. An AI can summarize a text perfectly, but it cannot tell you if the author's underlying definition of "justice" is morally sound. 
          </p>
          <p>
            P4C teaches children the one critical skill AI struggles with: <strong>Value-Based Reasoning</strong>. It prepares them to navigate a future where they will need to make ethical decisions about technology, climate change, and bioethics. By fostering a "Community of Inquiry," we are training the next generation to be more than just passive consumers of algorithmic content—we are training them to be active architects of meaning.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>V. Practical Application: How to Start P4C at Home</h2>
          <p>
            You don't need a formal curriculum to start philosophical inquiry with your child. It starts with a shift in your own mindset: moving from the "Provider of Answers" to the "Facilitator of Questions." Here are the <strong>Golden Rules of Inquiry</strong>:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Value the Question:</strong> When your child asks "Why?", don't immediately give an answer. Reflect it back: <em>"That's a great question. What do you think?"</em> or <em>"Why do you think that happens?"</em></li>
            <li style={{ marginBottom: 16 }}><strong>Use Stimuli (The "Hook"):</strong> Use picture books, short videos, or even news stories as a starting point. Pause at a moment of conflict and ask: <em>"Was that fair? Why or why not?"</em> Example: Read about Robin Hood and ask, <em>"Is it ever right to steal?"</em></li>
            <li style={{ marginBottom: 16 }}><strong>The "Three-Why" Rule:</strong> Push deeper into their logic. If they say something is "bad," ask "Why?", then when they answer, ask "Why is that why?", and so on. This Socratic technique exposes the underlying philosophical assumptions.</li>
            <li style={{ marginBottom: 16 }}><strong>Model Socratic Ignorance:</strong> It's crucial to say, <em>"I don't know the answer to that either. Let's think about it together."</em> This shows that philosophy is a shared journey, not a test with a hidden answer key.</li>
          </ul>

          <div style={{ padding: '56px', borderRadius: 40, background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.08), rgba(0, 212, 255, 0.08))', border: '1px solid rgba(255,255,255,0.1)', margin: '80px 0' }}>
            <h3 style={{ fontSize: 28, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
               <History size={32} color="#ff8c00" /> Case Study: The SAPERE Project
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              SAPERE, the UK's leading P4C charity, has trained thousands of teachers over the last 30 years. Their empirical data shows that P4C doesn't just improve academic grades; it fundamentally alters the classroom culture. Schools implementing P4C report reduced incidents of bullying and a massive increase in participation from 'quiet' or 'marginalized' students. When children realize that their thoughts are valued and that there are no 'wrong' answers in a philosophical inquiry, the fear of failure evaporates, and genuine learning begins.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>VI. Conclusion: Raising Truth-Seekers</h2>
          <p>
            Philosophy for Children is, at its core, a gift of intellectual agency. It tells a child that their mind is a powerful tool, that their perspective matters, and that they have the right to question the world around them. 
          </p>
          <p>
            By teaching them to think with Criticality, Creativity, Care, and Collaboration, we aren't just making them "smarter" for their exams—we are making them more resilient, more empathetic, and more prepared for a deeply complex world. The "big questions" aren't scary when you have the tools, and the community, to explore them together.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #ff8c00, #00d4ff, #ff2d78)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Fuel Your Curiosity</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Our logic games and puzzles at VIBEMENOW are inspired by P4C principles, encouraging players to think critically and creatively about every move.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#ff8c00', color: '#fff', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Explore Logic Games
              </div>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                More Pedagogical Blogs
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
