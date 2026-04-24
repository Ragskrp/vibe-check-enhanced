import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Database, Cpu } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function AbacusHistoryPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffd700', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <History size={16} /> Mathematical Archaeology
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            The Primal Computer: A History of the <span>Abacus</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            Before silicon and software, humanity calculated the stars with wood and stone. Explore the 4,000-year evolution of the abacus and why it remains the ultimate tool for cognitive development.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="history-of-the-abacus" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            Tactile logic: The abacus transforms abstract numbers into physical positions, allowing the human brain to utilize its powerful visual and spatial processing for complex arithmetic.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            In the high-tech landscape of 2024, where supercomputers process quintillions of operations per second, the humble abacus seems like a relic of a forgotten age. Yet, this simple frame of beads remains one of the most successful inventions in human history. For over 4,000 years, it was the "hardware" upon which empires were built, taxes were calculated, and astronomical movements were predicted. 
          </p>
          <p>
            The abacus is more than a counting tool; it is a physical manifestation of mathematical logic. It represents the moment humanity moved from counting on fingers to creating an externalized mental "workspace" for complex thought.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Sumerian Sand: The 4,000-Year-Old Algorithm</h2>
          <p>
            The earliest versions of the abacus weren't frames at all. In ancient <strong>Mesopotamia</strong> (circa 2700 BC), mathematicians used a "dust abacus"—a flat surface covered in sand where they would draw lines and place pebbles to represent numbers. 
          </p>
          <p>
            The word "abacus" itself likely comes from the Hebrew word <em>abaq</em> (dust) or the Phoenician <em>abak</em> (sand). This early system used a <strong>Sexagesimal</strong> (base-60) logic, which is the reason we still have 60 seconds in a minute and 360 degrees in a circle today. These ancient accountants were performing advanced multiplication and division long before the invention of the zero.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(255, 215, 0, 0.04)', border: '1px solid rgba(255, 215, 0, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#ffd700', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> The Roman Calculi
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              The Romans developed a portable metal abacus with grooves for sliding stones. These stones were called **'Calculi'** (the Latin word for pebbles). This is the literal etymological root of our modern words 'Calculate' and 'Calculus.' To the Romans, math was a physical act of moving pebbles through the mud.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Suanpan and Soroban: The Mastery of the East</h2>
          <p>
            While the Western world eventually transitioned to pen-and-paper arithmetic (thanks to the introduction of Hindu-Arabic numerals), the East refined the abacus into a high-speed precision instrument.
          </p>
          <p>
            The <strong>Chinese Suanpan</strong> (introduced around 1200 AD) used a "2:5" bead system—two beads in the upper deck (representing 5 each) and five in the lower deck (representing 1 each). This allowed for base-10 and base-16 calculations, making it ideal for the complex weight and currency systems of the Ming Dynasty.
          </p>
          <p>
            The <strong>Japanese Soroban</strong>, refined in the 1600s, streamlined this into a "1:4" system. This eliminated all redundant bead positions, forcing the user to perform more of the logic in their head. The result was a device so efficient that a trained user could outperform an early electronic calculator.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Database style={{ color: '#00ff94', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Anzan: Mental Abacus</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>The technique of visualizing a soroban in the 'mind's eye' and moving the beads mentally at high speeds.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Cpu style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Algorithm vs Silicon</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>In a famous 1946 contest in Tokyo, soroban master Kiyoshi Matsuzaki defeated an American soldier using a modern electric calculator in 4 out of 5 rounds.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Neuroscience: Why the Abacus Boosts IQ</h2>
          <p>
            In the last 20 years, cognitive scientists have become obsessed with "Abacus-Based Mental Calculation" (AMC). Research using fMRI has shown that while traditional math mostly activates the <strong>Left Frontal Gyrus</strong> (the language center), AMC activates the <strong>Right Parietal Lobe</strong> (the spatial-visual center).
          </p>
          <p>
            By turning numbers into physical "objects" in the mind, abacus users bypass the bottleneck of verbal processing. They aren't "calculating" in the traditional sense; they are "seeing" and "feeling" the answer. This cross-hemisphere training has been linked to significant improvements in working memory, concentration, and even general IQ in children. 
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> The Russian Schoty
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Unlike the vertical-bead Asian versions, the Russian abacus (Schoty) uses horizontal rods with ten beads each. The beads are slightly curved to the middle, allowing the user to 'flick' them with high speed. It remained in common use in Russian shops until the late 1990s!
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Abacus in the 21st Century</h2>
          <p>
            Is the abacus still relevant? In an era of AI, the answer is a resounding yes. It is one of the few tools that provides a <strong>"Tactile Anchor"</strong> for abstract mathematical concepts. 
          </p>
          <p>
            When a child moves a bead, they aren't just learning arithmetic; they are learning <strong>Conservation of Number</strong> and <strong>Place Value</strong> at a biological level. They are building a mental representation of the world that is structured and logical. This is why abacus schools are seeing a massive resurgence in India, China, and even Silicon Valley—parents recognize that in a world of digital abstraction, tactile logic is a superpower.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> VIBEMENOW: Modern Beads
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Our digital logic puzzles are the 21st-century evolution of the abacus. We believe that the best way to learn logic is to 'touch' it. By providing interactive, physics-based puzzles that require you to move, sort, and categorize, we are engaging the same spatial-visual neural circuits that soroban masters use. We aren't just giving you the answer; we are giving you the frame.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: The Tangible Logic</h2>
          <p>
            The history of the abacus is the history of human thought. It is the story of how we moved from being victims of random numbers to being masters of mathematical systems. Whether it is pebbles in the sand, beads on a wire, or pixels on a screen, the goal remains the same: to make the abstract tangible. The next time you use a calculator, remember the 4,000-year lineage of the beads that made it possible.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Engage Your Tactile Mind</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to test your spatial-visual logic? Dive into our bead-inspired puzzles and feel the power of 4,000 years of mathematical evolution.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Solve Logic Puzzles
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Math History
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
