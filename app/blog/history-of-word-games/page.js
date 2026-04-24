import Link from 'next/link';
import { ArrowLeft, Book, Sparkles, History, Zap, Search, Globe, Smartphone, BookOpen, Quote } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function HistoryWordGamesPage() {
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
            <History size={16} /> Cultural History
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            The Archeology of Play: A <span>History</span> of Word Games
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            From the stone-carved Sator Square of Pompeii to the viral green squares of Wordle, humans have always been obsessed with linguistic puzzles. Explore the 2,000-year evolution of the word game.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="history-of-word-games" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The Sator Square: An ancient Roman palindrome that served as the world's first popular word puzzle and a magical talisman.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            Language is often viewed as a tool for utility—a way to transfer data from one mind to another. But for as long as we have had words, we have had the urge to play with them. Word games are unique because they exist at the intersection of <strong>logic</strong> and <strong>creativity</strong>. They require the analytical precision of a mathematician and the intuitive flair of a poet.
          </p>
          <p>
            This journey begins not in a digital app store, but in the ash-covered ruins of Pompeii, where an ancient Roman carved a five-by-five grid that would puzzle historians for two millennia.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Sator Square: The First Palindrome</h2>
          <p>
            Found in sites across the Roman Empire, the <strong>Sator Square</strong> is a masterpiece of linguistic symmetry. It contains five Latin words: SATOR, AREPO, TENET, OPERA, and ROTAS. These words form a palindrome that can be read top-to-bottom, bottom-to-top, left-to-right, and right-to-left. 
          </p>
          <p>
            For the Romans, this wasn't just a puzzle; it was a <strong>talisman</strong>. It was believed to have magical properties, capable of curing illnesses and protecting homes from fire. It represents the first time in recorded history where the <em>structure</em> of words was seen as having a power beyond their literal meaning.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(255, 215, 0, 0.04)', border: '1px solid rgba(255, 215, 0, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#ffd700', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Quote size={24} /> "The Sower Arepo Holds the Wheels"
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              While the literal translation is debated, the Sator Square's endurance (appearing in Medieval cathedrals and Viking runestones) proves that the 'Puzzle Instinct' is a universal human trait.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Victorian Era: Lewis Carroll and "Doublets"</h2>
          <p>
            Fast forward to the 19th century. The Victorian era was the golden age of the "parlor game." In 1877, Lewis Carroll, the author of *Alice in Wonderland*, invented a game called <strong>Doublets</strong> (now known as Word Ladders). 
          </p>
          <p>
            The challenge was simple: turn "COLD" into "WARM" by changing one letter at a time, with each step being a valid word (COLD -> CORD -> WORD -> WORM -> WARM). Carroll, a mathematician by trade, saw these games as more than entertainment; they were exercises in <strong>deductive logic</strong>. He believed that linguistic play could sharpen the mind for more "serious" scientific inquiry.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>1913: The Birth of the Crossword</h2>
          <p>
            On December 21, 1913, Arthur Wynne, a journalist for the *New York World*, published what he called a "Word-Cross" puzzle. He didn't know he was starting a revolution. The game was an instant hit, providing a much-needed distraction for a world on the brink of World War I.
          </p>
          <p>
            By the 1920s, the crossword had become a global craze. It was the first time that word games moved from the elite parlor rooms to the daily newspapers of the masses. The *New York Times*, however, resisted the trend for decades, calling crosswords a "primitive form of mental exercise," before finally relenting in 1942 as a way to provide relief from war news.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Search style={{ color: '#00d4ff', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Cryptic Clues</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>The British 'Cryptic' crossword added a layer of lateral thinking, requiring players to solve puns and anagrams to find the answers.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Globe style={{ color: '#00ff94', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Scrabble Diplomacy</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Invented during the Great Depression, Scrabble became a way for families to connect during lean times, eventually becoming a global competitive sport.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Digital Revolution: From Hangman to Wordle</h2>
          <p>
            As computers entered our homes in the 80s and 90s, word games were among the first to be digitized. Simple games like <strong>Hangman</strong> and <strong>TextTwist</strong> proved that linguistic play didn't need high-end graphics to be addictive.
          </p>
          <p>
            In 2021, the world was taken by storm by <strong>Wordle</strong>. Josh Wardle, a software engineer, created the game as a gift for his partner who loved word puzzles. Its success was a masterclass in modern psychology. By limiting the game to one puzzle per day, Wardle created <strong>scarcity</strong>. By allowing people to share their results via colored emoji grids, he created a <strong>shared social ritual</strong>.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Neuroscience: The Reward of the "Perfect Word"</h2>
          <p>
            Why do we find these games so satisfying? 2024 neuroimaging shows that solving a word puzzle activates <strong>Broca's Area</strong> (speech production) and the <strong>ventral striatum</strong> (the brain's reward center). 
          </p>
          <p>
            When you find a difficult word in a game, your brain releases a burst of dopamine. This is the same chemical reward you get from eating a good meal or winning a race. Linguistic play is effectively "hacking" our evolutionary need to communicate, turning the mastery of language into a source of pleasure.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Smartphone size={24} /> The VIBEMENOW Philosophy
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              We believe the future of word games lies in 'Adaptive Flow'. By using AI to match the difficulty of the game to your current vocabulary, we can ensure you are always in the 'Goldilocks Zone' of engagement—not so easy that it's boring, and not so hard that it's frustrating.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: The Endless Conversation</h2>
          <p>
            Word games are a testament to the versatility of the human mind. They show us that language is not a static set of rules, but a living, breathing playground. From the Sator Square to Wordle, these games have provided a bridge between cultures, generations, and technologies. As long as there are words, there will be humans eager to rearrange them, decode them, and play with them.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Join the History of Play</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to test your linguistic logic? Try our modern takes on classic word puzzles and see where you fit in the timeline of play.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Play Word Games
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              Explore More History
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
