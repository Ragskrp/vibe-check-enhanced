import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Flower2, Infinity } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function MathNaturePage() {
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
            <Infinity size={16} /> Theoretical Biology
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            The Hidden Code: <span>Mathematics in Nature</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            The universe is written in the language of mathematics. From the spiral of a galaxy to the pattern of a sunflower, explore the geometric blueprints that govern the natural world.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="mathematics-in-nature" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            Natural geometry: Mathematics is not just a human invention; it is a fundamental property of the universe. Nature uses recursive algorithms and geometric constraints to maximize efficiency and resilience.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            When we think of mathematics, we often think of dry textbooks, complex equations, and dusty chalkboards. But if you step outside and look at a snowflake, a seashell, or the arrangement of leaves on a stem, you are looking at mathematics in its most beautiful and functional form.
          </p>
          <p>
            Galileo Galilei once said, "The universe cannot be read until we have learnt the language and become familiar with the characters in which it is written. It is written in mathematical language." This isn't just a poetic metaphor; it is a biological reality. Nature is an optimizer, and <strong>Mathematics</strong> is the tool it uses to find the perfect solution for survival.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Fibonacci Sequence: Nature's Numbering System</h2>
          <p>
            One of the most famous patterns in nature is the <strong>Fibonacci Sequence</strong>: 0, 1, 1, 2, 3, 5, 8, 13, 21, and so on. Each number is the sum of the two preceding ones. 
          </p>
          <p>
            Look at a sunflower. The seeds are arranged in two sets of spirals—one clockwise and one counter-clockwise. If you count those spirals, you will almost always find two consecutive Fibonacci numbers (e.g., 34 and 55). Why? Because this specific arrangement, based on the **Golden Angle** (approx. 137.5 degrees), allows the plant to pack the maximum number of seeds into the smallest possible space without any gaps. It is the mathematical solution to the problem of space efficiency.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> The Golden Ratio (Phi)
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              As the Fibonacci numbers increase, the ratio between them approaches 1.618—the **Golden Ratio**. This proportion is found everywhere: in the dimensions of the Parthenon, the spiral of the Nautilus shell, and even the proportions of the human face. We find this ratio inherently 'beautiful' because it is the signature of biological growth and balance.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Fractals: The Infinite Complexity of a Fern</h2>
          <p>
            In traditional geometry, we deal with smooth lines and perfect circles. But nature is jagged. To describe the shape of a cloud or a mountain, we need <strong>Fractals</strong>. 
          </p>
          <p>
            A fractal is a pattern that repeats itself at every scale. Look at a fern leaf. Each small leaflet is a miniature version of the larger branch, which is a miniature version of the entire plant. This "self-similarity" allows nature to create massive complexity using a very simple set of instructions (recursive algorithms). Your lungs and your circulatory system are fractals, allowing a massive surface area for gas exchange to fit inside a small chest cavity.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Flower2 style={{ color: '#00d4ff', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Hexagonal Tiling</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Bees build hexagonal honeycombs because the hexagon is the most efficient shape for covering a surface with the minimum amount of wax while maximizing storage volume.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Repeat style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Voronoi Patterns</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>The pattern on a giraffe's skin or the veins in a leaf are Voronoi diagrams—a mathematical way of dividing space based on the distance to a set of points.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Symmetry: The Beauty of Balance</h2>
          <p>
            Nature loves symmetry, but it's not just for aesthetics. <strong>Bilateral Symmetry</strong> (two mirrored sides) is found in most animals because it allows for efficient movement in a single direction. <strong>Radial Symmetry</strong> (symmetry around a center point) is found in jellyfish and flowers because it allows them to interact with their environment from all sides simultaneously. 
          </p>
          <p>
            Symmetry is a "biological signal" of health and genetic quality. We are mathematically hard-wired to find symmetrical faces more attractive because they indicate a lack of parasites or developmental errors. Beauty, it turns out, is just a subconscious calculation of geometric perfection.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> The Mandelbrot Set
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Benoit Mandelbrot discovered that complex natural shapes could be generated by a simple equation: z = z² + c. This proved that the 'chaos' of nature is actually a deeply ordered system. We don't live in a world of random accidents; we live in a world of iterated logic.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>How to See the Math Around You</h2>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Count the Petals:</strong> Next time you see a flower, count the petals. You will find that 3, 5, 8, 13, and 21 are the most common numbers.</li>
            <li style={{ marginBottom: 16 }}><strong>Look at the Trees:</strong> Notice how the trunk splits into two branches, which split into two more. This is a fractal branching pattern that maximizes sunlight exposure.</li>
            <li style={{ marginBottom: 16 }}><strong>Observe the Bubbles:</strong> Look at the foam on your coffee. Notice how the bubbles meet at 120-degree angles to form hexagons. This is the 'Plateau's Laws' of surface tension in action.</li>
          </ol>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> VIBEMENOW: Natural Logic
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Our logic puzzles are heavily inspired by these natural patterns. We use Fibonacci-based scaling, fractal-like recursive challenges, and geometric constraints to mirror the 'Efficiency of Nature.' By training with our modules, you are aligning your mind with the same mathematical principles that govern the stars and the cells. We don't just teach you math; we help you see the code of the world.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: Decoding the World</h2>
          <p>
            Mathematics is not a burden to be carried; it is a lens through which to see the world. When you understand the math in nature, the world stops being a collection of random objects and becomes a masterpiece of structural logic. You are part of that math. Your DNA, your heartbeats, and your thoughts are all part of the infinite equation. Step outside, open your eyes, and start reading the code.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(0, 255, 148, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Calculate Your Potential</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to dive deeper into the geometric blueprints of reality? Challenge your pattern-recognition skills with our nature-inspired logic modules.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Start Logic Training
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Nature Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
