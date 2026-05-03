import Link from 'next/link';
import { ArrowLeft, Gavel, Scale, AlertCircle, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Musk v. Altman: The Tech Trial of the Century | Tech Pulse',
  description: 'Elon Musk spent three days on the stand arguing "you can\'t just steal a charity." Review of the dramatic first week in the Musk v. Altman trial.',
  openGraph: {
    title: 'Musk v. Altman: The Tech Trial of the Century Just Had Its Most Dramatic Week Yet',
    description: 'Inside the Oakland courtroom where the future of OpenAI is being decided.',
    type: 'article',
    url: '/tech-news/musk-v-altman-tech-trial-week-1',
  },
  alternates: {
    canonical: '/tech-news/musk-v-altman-tech-trial-week-1',
  },
};

export default function MuskAltmanTrialPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/tech-news" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Tech Pulse
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff2d78', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Scale size={16} /> Legal & AI Governance
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Musk v. Altman: The <span>"Tech Trial of the Century"</span> Just Had Its Most Dramatic Week Yet
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            When Elon Musk filed a lawsuit against Sam Altman and OpenAI back in 2024, many observers treated it as billionaire theatre. After Week 1 in Oakland, that reading is starting to look very wrong.
          </p>
        </header>

        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ronald_V._Dellums_Federal_Building_Oakland_CA.jpg/1280px-Ronald_V._Dellums_Federal_Building_Oakland_CA.jpg" 
          alt="Ronald V. Dellums Federal Building in Oakland, California" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            What unfolded in the Ronald V. Dellums Federal Building last week is arguably <strong>the most consequential technology trial in American history</strong>: a case that could force the restructuring of an $850 billion company, determine who gets to control AI development, and set legal precedents about the obligations that come with building world-changing technology as a nonprofit.
          </p>
          
          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>"You Can't Just Steal a Charity"</h2>
          <p>
            Musk spent <strong>three full days on the witness stand</strong>, a rare occurrence for any plaintiff. His central argument never wavered: OpenAI was founded as a nonprofit with a promise to develop AI safely and transparently for the benefit of humanity, not for private enrichment. 
          </p>
          <p>
            When Altman and co-founder Greg Brockman converted it into a for-profit enterprise without honouring that founding mission, they effectively took charitable donations — including roughly <strong>$38 million</strong> from Musk — and used them to build a private company. His phrase became the refrain of the week: <em>"You can't just steal a charity."</em>
          </p>

          <div style={{ margin: '40px 0', padding: '32px', borderRadius: 24, background: 'rgba(255, 45, 120, 0.05)', border: '1px solid rgba(255, 45, 120, 0.1)' }}>
            <h3 style={{ color: '#ff2d78', fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Gavel size={20} /> The Counterattack
            </h3>
            <p style={{ marginBottom: 16, fontSize: 16 }}>OpenAI's attorney Bill Savitt landed several hard hits during cross-examination:</p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 12 }}><strong>The Fine Print:</strong> Emails from 2018 showed Altman informing Musk about plans for a $10B commercial structure. Musk claimed he "did not read the fine print."</li>
              <li style={{ marginBottom: 12 }}><strong>The xAI Conflict:</strong> Musk called for an AI pause while simultaneously building his own competitor, xAI.</li>
              <li style={{ marginBottom: 12 }}><strong>The Purchase Bid:</strong> Musk bid $97.4B to <em>buy</em> OpenAI in 2025, suggesting his opposition isn't purely about nonprofit principles.</li>
            </ul>
          </div>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Judge Shuts Down the Extinction Narrative</h2>
          <p>
            Presiding Judge Yvonne Gonzalez Rogers emerged as one of the most notable figures of the week. When Musk's attorneys tried to frame the trial as a referendum on whether AI could cause human extinction, she shut it down directly. She made the scope unmistakably clear: <strong>this trial is about alleged breach of charitable duty, not AI existential risk.</strong>
          </p>
          
          <p>
            Rogers split the trial into two phases: a liability phase (concluding by May 21) where a nine-person jury delivers an advisory verdict, and a remedies phase to determine outcomes. Musk's attorneys are seeking up to <strong>$134 billion in damages</strong>, though they've indicated any recovery should go back to OpenAI's nonprofit foundation rather than to Musk personally.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Why It Matters</h2>
          <p>
            Whatever the verdict, this trial is already reshaping how Silicon Valley thinks about the relationship between nonprofit ambitions and commercial realities. Both Musk and Altman are simultaneously pushing their companies toward what could be among the largest IPOs in history — SpaceX is reportedly eyeing a mid-June roadshow — adding a layer of financial stakes to an already supercharged legal battle.
          </p>

          <blockquote>
            "There's nothing wrong with having a for-profit organisation. You just can't steal a charity."
            <cite>— Elon Musk, under cross-examination, April 2026</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <a href="https://www.cnbc.com/2026/05/02/musk-testimony-dominated-first-week-musk-v-altman-trial-in-oakland.html" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>CNBC</a>
              <a href="https://www.nbcnews.com/tech/tech-news/elon-musk-testimony-day-three-sam-altman-openai-trial-rcna342967" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>NBC News</a>
              <a href="https://www.cnn.com/2026/04/30/takeaways-elon-musk-openai-sam-altman-lawsuit" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>CNN</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #ff2d78, #ff8c00)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Tech Policy & Legal Desk • May 3, 2026</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p { margin-bottom: 24px; }
        .blog-content strong { color: #fff; }
        blockquote {
          margin: 40px 0;
          padding: 24px 32px;
          border-left: 4px solid #ff2d78;
          background: rgba(255, 45, 120, 0.03);
          font-style: italic;
          color: #eee;
        }
        blockquote cite {
          display: block;
          margin-top: 12px;
          font-style: normal;
          color: #888;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
