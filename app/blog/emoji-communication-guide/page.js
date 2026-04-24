import Link from 'next/link';
import { ArrowLeft, MessageSquare, Heart, Globe, UserCheck, AlertTriangle, ShieldCheck, History, BookOpen, Smartphone } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function EmojiGuidePage() {
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
            <MessageSquare size={16} /> Digital Linguistics
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Digital Body Language: The <span>Linguistics</span> of the Emoji
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            In the absence of facial expressions and tone of voice, emojis have become the "body language" of the internet. Explore the complex social science behind how we speak with pixels.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="static-image" src="/blog/emoji-guide.png" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The evolution of visual language: From ancient hieroglyphics to modern digital semiotics, our need to communicate complex emotions through imagery remains unchanged.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            When you speak to someone in person, only about 7% of your communication is purely through words. The rest—the massive 93%—is conveyed through <strong>non-verbal cues</strong>: the arch of an eyebrow, the speed of your breathing, and the pitch of your voice. For decades, text-based communication (email, SMS, Slack) stripped away this context, leading to a global epidemic of "tone-deaf" misunderstandings.
          </p>
          <p>
            Enter the emoji. What started as a set of 176 pixelated icons for Japanese pagers in 1999 has evolved into a sophisticated, universal language. Emojis aren't just "decorations" for your sentences; they are <strong>digital body language</strong>. They provide the metadata that tells the reader how to interpret the text.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The New Hieroglyphics: Semantics of the Icon</h2>
          <p>
            Linguists like Gretchen McCulloch argue that emojis are not a "degradation" of language, but a necessary evolution. We use them as <strong>co-speech gestures</strong>. Just as you might wave your hands while talking to add emphasis, you add a 🚀 to a message about a new project to signal excitement and momentum. 
          </p>
          <p>
            Interestingly, emojis follow their own grammatical rules. For example, we rarely put an emoji in the middle of a word; they almost always come at the end of a thought or as a separate "beat" in the conversation. They function as <strong>punctuation for the soul</strong>.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(255, 45, 120, 0.04)', border: '1px solid rgba(255, 45, 120, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#ff2d78', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> The Shigetaka Kurita Legacy
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              The first emojis were inspired by weather symbols and Manga icons. Kurita realized that 'I understand' could sound cold or dismissive in text, but adding a simple heart or a smiley face transformed it into an empathetic acknowledgement. This was the birth of 'Emotional Metadata'.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Generational Divide: Why "😂" is Dead</h2>
          <p>
            If you want to see language evolution in real-time, look at how different generations use the same icons. To a Millennial or Gen Xer, the 😂 (Face with Tears of Joy) is the standard way to show something is funny. To Gen Z, however, this emoji is "cringe" and "old." 
          </p>
          <p>
            Instead, younger users have shifted to the 💀 (Skull) or 😭 (Loudly Crying Face) to signify that they are "dead" or "crying" with laughter. This is known as <strong>semantic bleaching</strong>—when a symbol is used so often that it loses its original meaning and is replaced by something more extreme. Understanding these shifts is the key to maintaining "Digital EQ" in a multi-generational workforce.
          </p>

          <h3 style={{ color: '#ff2d78', fontSize: 24, marginTop: 40, marginBottom: 16 }}>Cross-Cultural Landmines</h3>
          <p>
            Because emojis feel universal, we often forget they are culturally situated. The 👍 (Thumbs Up) is a positive affirmation in most Western cultures, but in parts of the Middle East and Greece, it can be a deeply offensive gesture. Similarly, the 🙃 (Upside-Down Face) can mean anything from "I'm being silly" to "I'm experiencing a mental breakdown" depending on the social context of the group.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Globe style={{ color: '#00d4ff', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Cultural Semiotics</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>The 'Prayer Hands' 🙏 are often used as a 'High Five' in the US, but as a sign of gratitude or apology in Japan.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <UserCheck style={{ color: '#00ff94', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Emoji Mirroring</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>In digital sales and leadership, mirroring the other person's emoji frequency and style builds rapport and 'Vibe' similarity.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Emoji and EQ: Reading Between the Pixels</h2>
          <p>
            Psychologists have found that people with high <strong>Emotional Intelligence (EQ)</strong> are better at choosing and interpreting emojis. They use them to "soften" feedback or to build social safety in digital teams. A manager who says "We need to talk" creates anxiety; a manager who says "We need to talk ☕" signals a low-stakes, friendly catch-up.
          </p>
          <p>
            However, there is a dark side to this. The "Passive-Aggressive Smiley" 🙂 has become a symbol of hidden frustration in corporate Slack channels. The ability to decode these subtle "micro-expressions" of the internet is a vital modern skill.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Case Study: The "Courtroom Emoji"</h2>
          <p>
            In recent years, emojis have moved from our phones into the courtroom. Judges are increasingly having to interpret the legal meaning of symbols. Is a 🔫 (Water Pistol/Gun) in a text message a credible threat of violence? Does a 🤝 (Handshake) in an email constitute a legally binding contract? 
          </p>
          <p>
            In one 2017 case in Israel, a judge ruled that a couple's use of a "🍾", "💃", and "👯" in a message to a landlord signified a "good faith" intent to rent, even though a contract hadn't been signed yet. When the couple backed out, they were sued for damages. The lesson: **Google and the Law take your emojis seriously.**
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={24} /> Professional Etiquette: The Golden Rule
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              The best rule of thumb for professional emoji use: **Mirror your audience.** If your client is formal and text-only, stay text-only. If they use a 🤘 in their first reply, you have permission to relax. Emojis are the 'Casual Friday' of communication—use them to build warmth, but never at the expense of clarity.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Future: Beyond the Static Icon</h2>
          <p>
            As we move into VR and AR (the Metaverse), the emoji is evolving again. Animojis and Memojis allow us to map our actual facial expressions onto digital avatars in real-time. We are moving from "selecting a symbol" to "being the symbol." 
          </p>
          <p>
            Furthermore, AI is beginning to suggest "context-aware" emojis that predict the emotional tone of our messages. While this makes us faster, we must be careful not to lose the "Human Vibe" in the process. The power of the emoji lies in its ability to show we are not just machines—we are feeling, laughing, crying humans on the other side of the screen.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: Speak the Language of the Future</h2>
          <p>
            Language has never been static. From the cave paintings of Lascaux to the printing press, we have always found new ways to bridge the gap between our minds. Emojis are simply the latest tool in that journey. By mastering their linguistics, you aren't just "being trendy"—you are becoming a more empathetic, effective, and nuanced communicator in the digital age.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(255, 45, 120, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Test Your Digital IQ</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Can you read between the pixels? Challenge your social intuition with our Emoji IQ and communication games.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Play Emoji IQ
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Social Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
