'use client';

import { ChevronLeft, Share2, Star, Target, ShieldCheck, TrendingUp, Info, Zap, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function WordVibeGuide() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Article Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050508] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop" 
          alt="Dictionary and Pen" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
          <Link href="/guides" className="mb-6 flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={16} /> BACK TO GUIDES
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            WordVibe Mastery: <br/><span className="text-cyan-400">Winning Strategies</span>
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
            <span>By Lexicon Lord</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>12 Min Read</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-8 pb-32 -mt-10 relative z-30">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0d0d14] border border-white/5 shadow-2xl space-y-8 text-gray-300 leading-relaxed text-lg">
          
          <section className="space-y-4">
            <p>
              In the 2026 iteration of the 5-letter word game, <strong>WordVibe</strong> has become a daily ritual. But for the serious player, it's more than just a lucky guess. Winning consistently—and under the targeted 4-guess mark—requires a combination of statistical analysis, linguistic intuition, and a focused "word-vibe."
            </p>
            <p>
              This guide will deconstruct the mathematics of the game, providing you with a roadmap to dominate the VIBEMENOW leaderboards every single day.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="text-cyan-400" /> 1. The Power of "Starter Words"
            </h2>
            <p>
              The most common mistake beginners make is choosing a word like "QUEUE" or "FUZZY" to start. While these are fun, they are statistically inefficient. A perfect starter word should contain <strong>high-frequency vowels and consonants</strong>.
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Lightbulb size={20} className="text-yellow-400" /> Statistical Elites:
              </h3>
              <p className="text-sm">
                Try "ADIEU," "ARISE," or "STARE." These words cover the most common English letters (A, E, I, S, R, T). Starting with one of these gives you a 78% higher chance of landing a green or yellow tile on the first turn.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="text-green-400" /> 2. The Narrowing Down Technique
            </h2>
            <p>
              Once you've had your first turn, the "Narrowing Down" method begins. If you have "ARISE" and only the 'R' and 'E' are yellow, your next word shouldn't necessarily use them again. 
            </p>
            <p>
              <strong>The Sacrifice Turn:</strong> Sometimes, on turn two, it's better to type a word that uses entirely <em>new</em> letters to eliminate as many possibilities as possible. For example, if "ARISE" failed, try "CLOUD" or "NYMPH." This "vibe check" on the alphabet is how you avoid the "trap" of words ending in "ING" or "ED."
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-purple-400" /> 3. Recognizing Patterns & Vibe Clusters
            </h2>
            <p>
              English words often follow "clusters." If your word ends in "IGHT," you're in a cluster (NIGHT, FIGHT, RIGHT, MIGHT). Blindly guessing here is a recipe for 6-try failure. 
            </p>
            <p>
              When you're caught in a cluster, use a sacrificial word to test all the <em>start</em> letters at once (e.g., if you're stuck on _IGHT, try "FORMS" to test 'F', 'R', 'M', and 'S').
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Star className="text-yellow-400" /> 4. Daily Vibe Rituals
            </h2>
            <p>
              WordVibe updates every 24 hours. Because the word of the day is often themed around current global vibes or historical events, keeping a pulse on the cultural zeitgeist can give you an edge. 
            </p>
            <p>
              Is it a holiday? Is there a major sporting event? Our "vibe-algorithm" often nods to the world around us. Let the vibe guide your logic.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white">Prove Your Mastery</h2>
            <p>
              You've got the theory. Now it's time for the application. Head over to WordVibe and take today's challenge. Can you get it in under 3 tries? 
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/wordvibe" className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 transition-transform flex items-center gap-2">
                GUESS TODAY'S WORD <Zap size={18} />
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Footer Info */}
      <footer className="max-w-3xl mx-auto px-8 pb-24 text-center text-gray-500 text-sm">
        <p>© 2026 VibeMeNow Games. This guide is compiled by competitive word-game experts to help you achieve the best "vibe-score" possible.</p>
        <p className="mt-2 italic">Authored by The Word Smith, Grandmaster of VIBEMENOW Word Challenges.</p>
      </footer>
    </div>
  );
}
