import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Palette, Eye } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function ColorPsychologyPage() {
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
            <Palette size={16} /> Visual Neuroscience
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            The Silent Language: Understanding the <span>Psychology of Color</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            Color is more than just decoration; it is a physiological trigger that dictates your mood, your hunger, and your buying habits. Explore the hidden power of the spectrum.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="psychology-of-color" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The spectral influence: Different wavelengths of light trigger specific hormonal and neurological responses in the brain, bypasssing logical thought to influence our primal emotions.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            Imagine you walk into a room painted entirely in vibrant, neon red. Within seconds, your heart rate increases, your blood pressure rises, and you feel a strange sense of urgency. Now imagine walking into a room painted in a soft, deep navy blue. Your breathing slows, your muscles relax, and your mind begins to quiet.
          </p>
          <p>
            This isn't just "preference." This is <strong>Color Psychology</strong>—the study of how different hues influence human behavior and decision-making. Color is one of the most powerful and immediate forms of communication we have, yet we rarely notice it's happening.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Biology of Hue: Light and the Hypothalamus</h2>
          <p>
            When light hits your eyes, it's not just "seen" by the visual cortex. Some of that light is routed to the <strong>Hypothalamus</strong>—the brain's master control center for hormones and the autonomic nervous system. 
          </p>
          <p>
            Different wavelengths (colors) trigger different hormonal responses. Red, with its long wavelength, triggers the release of adrenaline. Blue, with its shorter wavelength, can suppress the production of melatonin (making you alert) or trigger the release of calming neurotransmitters. We are biological machines tuned to the frequencies of the world around us.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(255, 45, 120, 0.04)', border: '1px solid rgba(255, 45, 120, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#ff2d78', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> The Red/Yellow Hunger Loop
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              Why are the logos of McDonald's, Burger King, and KFC all red and yellow? Red creates urgency and raises the heart rate, while yellow is associated with happiness and optimism. Together, they create a 'Ketchup and Mustard' effect that triggers hunger and encourages fast, impulsive decision-making. Marketers use your biology against you before you've even seen the menu.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Spectrum of Emotion</h2>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Blue:</strong> The color of trust and productivity. This is why banks, tech companies (Intel, Dell, IBM), and social networks (Facebook, LinkedIn) use it. It signals stability and reliability.</li>
            <li style={{ marginBottom: 16 }}><strong>Green:</strong> Associated with health, nature, and restoration. It is the easiest color for the human eye to process, which is why it's used in hospitals and 'green rooms' for actors to relax.</li>
            <li style={{ marginBottom: 16 }}><strong>Black:</strong> Authority, luxury, and sophistication. It signals power and mystery. In the 'Deep Space Academic' aesthetic, black provides the 'void' that allows other colors to pop, creating a sense of focus and premium quality.</li>
            <li style={{ marginBottom: 16 }}><strong>Orange:</strong> The color of creativity and friendliness. It's less aggressive than red but more energetic than yellow.</li>
          </ul>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Eye style={{ color: '#00d4ff', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Visual Weight</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Darker colors appear 'heavier' than lighter ones. In UX design, we use this to create 'Visual Hierarchy,' guiding your eye to the most important buttons first.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Target style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>The Isolation Effect</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Also known as the Von Restorff effect. An item that 'stands out like a sore thumb' (e.g., a neon green button on a black background) is much more likely to be remembered and clicked.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Pink Effect: Baker-Miller Pink</h2>
          <p>
            In the 1970s, researchers found that a specific shade of bubblegum pink, now known as <strong>Baker-Miller Pink</strong>, had a dramatic calming effect on aggressive prisoners. Inmates placed in pink cells showed a measurable decrease in heart rate and muscle strength within seconds. 
          </p>
          <p>
            While the effect's long-term viability is debated, it proved that color isn't just about "style"—it's an environmental factor that can physically restrain or excite us. We are in a constant, silent conversation with the colors of our rooms, our clothes, and our screens.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> Cultural Color
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Color perception isn't universal. In the West, white signals purity and weddings. In many Eastern cultures, it's the color of mourning and death. When designing for a global audience, we must navigate these deeply ingrained cultural associations to ensure our message isn't 'lost in translation.'
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>How to Hack Your Environment with Color</h2>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>For Focus:</strong> Use deep blues or forest greens. These colors minimize 'Visual Noise' and keep the brain in a state of calm alertness.</li>
            <li style={{ marginBottom: 16 }}><strong>For Energy:</strong> Add pops of orange or red. Use these sparingly for things like gym clothes or a morning coffee mug to trigger that 'get-up-and-go' response.</li>
            <li style={{ marginBottom: 16 }}><strong>For Creativity:</strong> Purple or yellow. Purple is often associated with the 'mystical' and the 'royal,' encouraging lateral thinking, while yellow sparks fast, innovative ideation.</li>
            <li style={{ marginBottom: 16 }}><strong>For Rest:</strong> Warm, dim ambers. These colors mimic the sunset and tell the brain to begin producing melatonin.</li>
          </ol>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> Color at VIBEMENOW
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Our 'Deep Space Academic' theme isn't accidental. We use a pitch-black background to eliminate distractions and lower eye strain. We use 'Neon Cyan' for logic flows because it signals high-tech precision, and 'Vibrant Pink' for success cues to trigger a high-energy reward response. Every pixel on our platform is color-coded to guide your brain into a state of 'Deep Immersion' and 'Peak Logic.'
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: Painting Your Reality</h2>
          <p>
            You are the artist of your own cognitive experience. By understanding the psychology of color, you can stop being a victim of your environment and start being its architect. Whether you're painting your office, choosing your clothes, or designing your next big project, remember: color is the first thing the brain sees and the last thing it forgets. Paint wisely.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(255, 45, 120, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>See the World in High-Definition</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to train your visual processing and master the language of hue? Enter our chromatic logic modules and sharpen your perception.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Enter Chromatic Lab
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Visual Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
