'use client';

import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Cpu, UserCheck, Code, Globe, MessageSquare } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function TuringTestPage() {
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
            <Cpu size={16} /> Artificial Intelligence
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            The Imitation Game: Decoding the <span>Turing Test</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            In 1950, British mathematician Alan Turing asked a simple, dangerous question: 'Can machines think?' Explore the history, the profound philosophical controversy, and the modern reality of the test that defined the boundaries of artificial intelligence.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="turing-test" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>The Digital Divide:</strong> The Turing Test is the ultimate measure of a machine's ability to simulate human behavior and language so flawlessly that a human judge cannot distinguish the machine from a real person.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            <em>"I propose to consider the question, 'Can machines think?'"</em> 
          </p>
          <p>
            With these seemingly innocent words, the brilliant British mathematician and codebreaker <strong>Alan Turing</strong> opened his seminal 1950 paper, <em>Computing Machinery and Intelligence</em>. This single document effectively launched the modern field of Artificial Intelligence. 
          </p>
          <p>
            Turing, a pragmatist at heart, knew that defining the word "thinking" was a philosophical trap. Humans have debated the nature of consciousness, the soul, and thought for thousands of years without reaching a consensus. Turing realized that if he waited for philosophers to define "thought," AI research would never begin. Instead, he proposed a practical, behavioral experiment. He called it "The Imitation Game."
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>I. The Setup of the Imitation Game</h2>
          <p>
            The original concept of the Imitation Game actually involved a man and a woman in separate rooms, with a judge trying to guess who was who via text-based notes. Turing adapted this parlor game for the digital age. 
          </p>
          <p>
            The setup is brilliantly simple: A human judge sits at a computer terminal. In another room, connected only by text channels, are two entities: one is a real human, and the other is a machine. The judge's job is to engage in a free-flowing, natural language conversation with both of them and determine which is the machine. 
          </p>
          <p>
            If the machine can successfully fool the judge into believing it is the human on a consistent basis, Turing argued, then we must concede that the machine is "intelligent." It is intelligent not because it possesses a metaphysical soul, but because its external <em>behavior</em> is indistinguishable from an intelligent being. Turing bypassed the "Hard Problem of Consciousness" by focusing entirely on performance and output.
          </p>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <h3 style={{ color: '#00d4ff', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> The Lovelace Objection
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              In his paper, Turing addressed several counter-arguments. The most famous is the 'Lovelace Objection,' named after Ada Lovelace, the world's first computer programmer. Lovelace argued a century earlier that a computer <em>"has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform."</em> Turing countered this by arguing that human brains are also bound by rules (the laws of physics and biology) and that machines, given enough complexity and learning algorithms, could absolutely surprise their creators and originate new ideas.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>II. The Chinese Room: Syntax vs. Semantics</h2>
          <p>
            For thirty years, the Turing Test stood as the gold standard of AI. Then, in 1980, the American philosopher <strong>John Searle</strong> launched a devastating philosophical counter-attack with a thought experiment called the "Chinese Room."
          </p>
          <p>
            Searle asked us to imagine a man who speaks only English, locked inside a room. Under the door, someone slips him pieces of paper with Chinese characters written on them. The man has a massive rulebook written in English. The rulebook says things like: <em>"If you receive squiggle A, write down squiggle B and pass it back under the door."</em>
          </p>
          <p>
            The man follows the rules perfectly. To the people outside the room, it appears they are having a fluent conversation in Chinese with a native speaker. But inside the room, the man has absolutely no idea what he is saying. He doesn't know if he is discussing the weather, ordering food, or debating poetry.
          </p>
          <p>
            Searle's argument was simple and devastating: Computers are exactly like the man in the room. They have perfect <strong>Syntax</strong> (the ability to manipulate symbols according to rules), but they have absolutely zero <strong>Semantics</strong> (the actual understanding of what those symbols mean). Searle argued that passing the Turing Test is just a clever simulation of intelligence, not the presence of a mind. You can simulate a thunderstorm in a computer, but the computer doesn't get wet.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <MessageSquare size={24} color="#00ff94" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>ELIZA (1966)</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>Created by Joseph Weizenbaum, ELIZA was a simple chatbot that mimicked a psychotherapist by reflecting user input ('I feel sad' &rarr; 'Why do you feel sad?'). Users became deeply emotionally attached to it, revealing the 'ELIZA Effect'—our profound biological urge to anthropomorphize machines.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <UserCheck size={24} color="#ffd700" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Eugene Goostman (2014)</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>A chatbot that reportedly 'passed' the Turing Test by convincing 33% of judges it was human. However, it 'cheated' by claiming to be a 13-year-old Ukrainian boy, using age and a language barrier to explain away its bizarre, nonsensical answers.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Code size={24} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>The Reverse Turing Test</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>CAPTCHAs (Completely Automated Public Turing test to tell Computers and Humans Apart) are Reverse Turing Tests. They are puzzles designed to be trivial for humans but mathematically impossible for bots, though AI vision models have largely broken them.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>III. The LLM Era: Has the Test Been Broken?</h2>
          <p>
            For decades, chatbots failed the Turing Test miserably because they relied on hard-coded rules and decision trees. Then came the era of Deep Learning, Transformers, and Large Language Models (LLMs) like OpenAI's GPT-4 and Anthropic's Claude.
          </p>
          <p>
            These modern models don't use hard-coded rules. They are trained on virtually all the text ever produced by humanity. They are unfathomably powerful statistical engines that predict the next word in a sequence based on vast contextual probability matrices.
          </p>
          <p>
            When a modern LLM takes the Turing Test today, it doesn't just pass; it obliterates the test. It can write sonnets in the style of Shakespeare, generate complex Python code, debate the ethics of utilitarianism, and adopt the persona of a pirate with terrifying fluency. In blind tests, human judges frequently rate the AI's responses as <em>more</em> empathetic and articulate than the actual human's responses.
          </p>
          <p>
            But this triumph has led to a startling realization: The Turing Test might have been the wrong benchmark all along.
          </p>

          <div style={{ padding: '56px', borderRadius: 40, background: 'linear-gradient(135deg, rgba(255, 45, 120, 0.08), rgba(0, 212, 255, 0.08))', border: '1px solid rgba(255,255,255,0.1)', margin: '80px 0' }}>
            <h3 style={{ fontSize: 28, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
               <Brain size={32} color="#ff2d78" /> Language vs. Reasoning
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              By passing the test so easily, LLMs have proven that <strong>fluency in language does not equal general intelligence</strong>. A machine can perfectly simulate human conversation without possessing an internal world model, logical reasoning, or common sense. If you ask a powerful LLM to write a poem, it creates a masterpiece. If you ask it a novel spatial reasoning question ("If I put a book on a table, and put a blanket over the book, and then pull the blanket, what happens to the book?"), it often hallucinates bizarre, physics-defying answers. It has mastered the *words*, but not the *world*.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>IV. Beyond Turing: The New Benchmarks of AI</h2>
          <p>
            Because the Turing Test has been effectively "beaten" by statistical language models, computer scientists are developing much harder, more rigorous tests to probe for true Artificial General Intelligence (AGI):
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>The Winograd Schema Challenge:</strong> This test uses sentences with ambiguous pronouns that require deep, real-world common sense to resolve. For example: <em>"The trophy didn't fit into the brown suitcase because it was too large."</em> What was too large? The trophy or the suitcase? Humans know instantly (the trophy); AI struggles because the grammar is identical either way.</li>
            <li style={{ marginBottom: 16 }}><strong>The Lovelace Test:</strong> To pass this test, an AI must create an original piece of art or code that completely surprises its creator, and the creator must be unable to explain <em>how</em> the AI generated it based on its original code. It tests true creativity versus statistical blending.</li>
            <li style={{ marginBottom: 16 }}><strong>The ARC Challenge (Abstraction and Reasoning Corpus):</strong> Created by François Chollet, this visual test evaluates an AI's ability to learn new skills and recognize abstract geometric patterns using only a few examples—something humans do effortlessly, but machine learning systems find incredibly difficult.</li>
          </ul>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> VIBEMENOW: Cultivating the Human Edge
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              As machines master language and computation, what is left for us? Our platform is designed as a training ground for the 'Post-Turing' era. We design challenges that highlight the unique, un-simulatable strengths of human cognition: lateral thinking, ethical nuance, spatial reasoning, and emotional intelligence. While machines excel at rote, massive-scale statistical calculation, we help you master the 'Abstract Leaps' that define true human genius. We aren't competing with the machines; we are teaching you how to stay one vital step ahead of them.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>V. Conclusion: The Mirror of the Machine</h2>
          <p>
            Alan Turing's Imitation Game remains one of the most powerful thought experiments in human history. It forced us to confront a terrifying and exhilarating possibility: that the "magic" of human thought might simply be a complex series of computable algorithms. 
          </p>
          <p>
            Ultimately, the Turing Test doesn't just evaluate the machine; it evaluates <em>us</em>. It forces us to define what we value in conversation, what we consider conscious, and how much of our own "intelligence" is simply the art of imitation. As the machines get undeniably better at playing the game, we are forced to get undeniably better at being fundamentally human.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #00d4ff, #00ff94, #ff2d78)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Test Your Own Intelligence</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Ready to prove you've got the edge on the algorithms? Dive into our high-level reasoning modules and sharpen your uniquely human logic.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#00d4ff', color: '#000', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Start Logic Games
              </div>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                More AI Science
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
