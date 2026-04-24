import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, HelpCircle, LayoutGrid } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function PuzzlesEvolutionPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00ff94', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <HelpCircle size={16} /> Cultural History
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            The Primal Riddle: An Evolution of <span>Puzzles</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            From ancient Greek geometric riddles to the high-stakes digital environments of today, humanity has always sought the 'Aha!' moment. Explore the 2,000-year history of the puzzle.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="evolution-of-puzzles" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The geometric core: Puzzles are more than games; they are simulators for the brain's pattern-recognition and logical-deduction systems, evolved over millennia to test the limits of human ingenuity.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            Why do we spend hours trying to fit cardboard pieces together, or twisting a plastic cube until the colors align, or staring at a grid of numbers until a pattern emerges? There is no biological survival advantage to solving a Sudoku. It doesn't find us food, and it doesn't protect us from predators. Yet, the urge to solve riddles is one of the most persistent traits of the human species.
          </p>
          <p>
            The <strong>History of Puzzles</strong> is a mirror of human cognitive development. As our societies became more complex, so did our riddles. From the geometric dissection puzzles of ancient Greece to the reality-bending digital environments of the 21st century, puzzles have always been the "gymnasium" of the human mind.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Archimedes' Loculus: The Riddle of the 14 Pieces</h2>
          <p>
            The oldest known mechanical puzzle is the <strong>Ostomachion</strong> (or 'Archimedes' Loculus'), dating back to the 3rd century BC. It consists of a square divided into 14 geometric pieces. At first glance, it looks like a simple jigsaw. But Archimedes—one of the greatest mathematicians in history—was interested in something deeper: how many ways can these pieces be rearranged to form a perfect square?
          </p>
          <p>
            It wasn't until 2003 that computer scientists finally solved it: there are <strong>17,152</strong> distinct ways. This was the first "Combinatorial" puzzle—a game that required not just patience, but a deep understanding of spatial relationships and mathematical permutations.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> The Tangram Craze
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              In the early 19th century, a Chinese puzzle called the **Tangram** reached the West and triggered the world's first viral 'gaming' craze. Legend has it that Napoleon Bonaparte spent his exile on St. Helena obsessively solving Tangrams. The puzzle's power lay in its simplicity: 7 shapes, infinite possibilities. It proved that the brain finds immense satisfaction in creating order out of chaos.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Industrial Revolution: Puzzles for the Masses</h2>
          <p>
            The late 1800s saw a massive explosion in puzzle popularity, driven by pioneers like <strong>Sam Loyd</strong> in the US and <strong>Henry Dudeney</strong> in the UK. Loyd's "15-Puzzle" (the sliding tile game) became a global obsession. 
          </p>
          <p>
            This era marked a shift: puzzles were no longer just for mathematicians; they were for everyone. The 15-Puzzle was so addictive that it was reportedly "banned" in some offices because it was destroying productivity. This was the ancestor of 'Angry Birds'—a simple, portable logic loop that triggered the brain's dopamine reward system.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <LayoutGrid style={{ color: '#00d4ff', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>The Crossword Revolution</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Arthur Wynne published the first 'Word-Cross' in 1913. During the Great Depression, it became a vital psychological escape, offering a sense of control in an uncertain world.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Target style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>The Rubik's Cube</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Erno Rubik's 1974 invention was originally built to teach students about 3D geometry. It became the best-selling toy in history, with 43 quintillion possible configurations.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Digital Renaissance: From Tetris to The Witness</h2>
          <p>
            The arrival of the computer changed the medium of puzzles, but not the spirit. <strong>Tetris</strong> (1984) proved that the brain could enter a state of 'Flow' by solving spatial puzzles in real-time. 
          </p>
          <p>
            Modern digital puzzles like <em>Portal</em>, <em>Myst</em>, and <em>The Witness</em> have expanded the genre into "Narrative Logic." You aren't just solving a puzzle; you are uncovering the rules of a world. These games leverage the **Caudate Nucleus**—the brain's learning center—to create a sense of mastery that is profoundly rewarding.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> The Neuroscience of 'Aha!'
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              When you solve a difficult puzzle, your brain releases a burst of dopamine in the **Nucleus Accumbens**. This 'Aha!' moment is literally a micro-high. Interestingly, your brain also shows a spike in gamma-wave activity exactly 300 milliseconds before you consciously realize you've found the solution. Your subconscious solves the puzzle before 'you' do.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Why We Need Puzzles</h2>
          <p>
            Puzzles serve three vital functions in the human experience:
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Cognitive Resilience:</strong> Solving puzzles maintains neuroplasticity and delays cognitive decline by forcing the brain to build new neural pathways.</li>
            <li style={{ marginBottom: 16 }}><strong>Emotional Regulation:</strong> Puzzles provide a 'Sense of Agency.' In a chaotic world where most problems are unsolvable, a puzzle is a discrete environment where order *can* be achieved.</li>
            <li style={{ marginBottom: 16 }}><strong>The Joy of Discovery:</strong> We are a species of explorers. A puzzle is a miniature world that rewards curiosity with insight.</li>
          </ol>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> VIBEMENOW: The Next Evolution
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              We see ourselves as the stewards of this 2,000-year tradition. Our platform takes the core principles of Archimedes and Rubik and translates them into a dynamic, adaptive digital experience. We don't just want to keep you entertained; we want to keep your pattern-recognition systems at peak performance. Every puzzle you solve on VIBEMENOW is a step in the infinite evolution of your own ingenuity.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: The Infinite Puzzle</h2>
          <p>
            As long as there are humans, there will be puzzles. They are the language of our curiosity and the measure of our persistence. Whether it is a clay tablet or a touchscreen, the joy of the 'Aha!' moment remains the same. The world is the ultimate puzzle—keep solving.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(0, 255, 148, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Join the Evolution</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to test your ingenuity against the latest in logical design? Explore our evolving puzzle landscape and find your 'Aha!' moment.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Solve New Puzzles
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Puzzle Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
