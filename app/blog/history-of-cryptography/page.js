import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Lock, ShieldCheck } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function CryptographyHistoryPage() {
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
            <Lock size={16} /> Information Theory
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            The War of Whispers: A <span>History of Cryptography</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            From Spartan scrolls to Quantum keys, explore the millennia-long battle between those who keep secrets and those who break them.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="history-of-cryptography" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The geometric shield: Cryptography is the application of mathematical functions to data to ensure that only the intended recipient can read it. It is the foundation of privacy in the digital age.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            As long as there have been secrets, there have been codes. For over 4,000 years, kings, generals, and spies have used <strong>Cryptography</strong> (from the Greek *kryptos*, meaning hidden) to communicate across enemy lines. 
          </p>
          <p>
            It is a history of brilliant minds, mechanical monsters, and the slow realization that anything a human mind can hide, another human mind can eventually find. It is the ultimate test of <strong>Structural Logic</strong>.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Caesar Cipher: The Birth of the Shift</h2>
          <p>
            One of the earliest and simplest forms of cryptography was the <strong>Caesar Cipher</strong>, used by Julius Caesar to communicate with his generals. It is a "substitution cipher" where each letter in the plaintext is replaced by a letter a fixed number of positions down the alphabet. 
          </p>
          <p>
            If the shift is 3, A becomes D, B becomes E, and so on. To the untrained eye, the resulting message is gibberish. But for the cryptanalyst, it's a simple pattern-matching problem. For nearly a thousand years, this type of cipher was considered "unbreakable"—until the Islamic Golden Age.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(255, 215, 0, 0.04)', border: '1px solid rgba(255, 215, 0, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#ffd700', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> Al-Kindi and Frequency Analysis
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              In the 9th century, Al-Kindi realized that letters are not distributed equally in a language. In English, the letter 'E' is far more common than 'Z.' By counting the frequency of characters in a long ciphertext, Al-Kindi proved he could map them back to the original letters. He had invented **Cryptanalysis**, the art of breaking codes through statistical inference.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Enigma: The Mechanical Monster</h2>
          <p>
            By the 20th century, codes had become mechanical. The <strong>Enigma Machine</strong>, used by the German military in WWII, was a masterpiece of engineering. It used a series of rotating wheels (rotors) and a plugboard to create a cipher that changed with every single letter typed. 
          </p>
          <p>
            There were 158 quintillion possible settings for an Enigma machine. The Germans believed it was perfectly secure. But they hadn't accounted for the logical persistence of <strong>Alan Turing</strong> and the team at Bletchley Park. 
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <ShieldCheck style={{ color: '#00d4ff', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Bletchley Park</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>The breaking of the Enigma code is estimated to have shortened the war by at least two years and saved over 14 million lives. It was the moment that information theory became a literal matter of life and death.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Target style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>The Vigenère Square</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Known for centuries as 'The Indecipherable Cipher,' the Vigenère cipher used a keyword to change the shift for every letter, defeating Al-Kindi's simple frequency analysis.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Digital Fortress: Public Key Cryptography</h2>
          <p>
            In the 1970s, a breakthrough occurred: <strong>Asymmetric Encryption</strong>. Before this, both the sender and receiver needed the same "secret key." If the key was intercepted, the security was gone. 
          </p>
          <p>
            Diffie, Hellman, and the RSA team (Rivest, Shamir, Adleman) proposed a system with two keys: a <strong>Public Key</strong> (which anyone can use to lock a message) and a <strong>Private Key</strong> (which only the recipient has to unlock it). This is the foundation of every secure transaction you make online today. It relies on the "hardness" of prime number factorization—a mathematical mountain that modern computers cannot climb.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> The Blockchain Era
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              In 2008, an anonymous figure named Satoshi Nakamoto combined cryptography with a 'distributed ledger' to create Bitcoin. For the first time in history, we had a system of trust that didn't require a central authority. The cryptography *was* the authority.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Quantum Threat</h2>
          <p>
            We are now entering the era of <strong>Quantum Computing</strong>. While a classical computer would take billions of years to crack an RSA key, a quantum computer using Shor's Algorithm could do it in seconds. This has triggered a race to develop "Post-Quantum Cryptography"—new mathematical lattices that even a quantum machine cannot penetrate.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> Cryptic Logic at VIBEMENOW
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Our platform features dedicated 'Cryptography' modules that walk you through the history of code-breaking. You will learn to spot frequency patterns, understand rotor-shift logic, and master the basic principles of hashing. We don't just want you to use encryption; we want you to understand the 'Mathematical Beauty' of the shield. Training your mind in cryptanalysis is the ultimate exercise in lateral thinking and pattern recognition.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: The Infinite Shield</h2>
          <p>
            Cryptography is more than just math; it is the battle for the freedom of thought. In a world of total surveillance, the ability to hide a secret is the ultimate form of power. As the tools of decryption grow stronger, so too must our mastery of the logic that protects us. The war of whispers will never end, but as long as we have mathematics, we have a shield.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Break the Code</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to test your code-breaking skills? Enter our cryptography lab and see if you can penetrate the most advanced logic-gates we've designed.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Start Cryptanalysis
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Code Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
