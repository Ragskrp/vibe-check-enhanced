'use client';

import { ChevronLeft, Share2, Star, Target, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import Link from 'next/link';

export default function VibeQuizGuide() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Article Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050508] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
          alt="Abstract Neon Lights" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
          <Link href="/guides" className="mb-6 flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={16} /> BACK TO GUIDES
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            The Ultimate Guide to <br/><span className="text-pink-500">Personality Vibes</span>
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
            <span>By VibeMaster Elite</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>8 Min Read</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-8 pb-32 -mt-10 relative z-30">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0d0d14] border border-white/5 shadow-2xl space-y-8 text-gray-300 leading-relaxed text-lg">
          
          <section className="space-y-4">
            <p>
              In the rapidly evolving digital landscape of 2026, understanding your "digital persona" has become more than just a pastime—it's a form of social currency. The <strong>Vibe Quiz</strong> on VibeMeNow isn't just a series of random questions; it's a carefully calibrated instrument designed to map your core aesthetic and behavioral patterns into recognizable archetypes.
            </p>
            <p>
              Whether you're a "Golden Vibe" or a "Minimalist Soul," these archetypes help us communicate our internal states to a world that moves faster than ever. In this guide, we'll dive deep into the science of vibes, how the quiz evaluates your choices, and how you can use your results to optimize your digital life.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="text-pink-500" /> 1. The Science of Aesthetic Choice
            </h2>
            <p>
              Every click you make during the Vibe Quiz serves as a data point. When you choose a "Cozy Bedroom" over a "Space Station," you're not just picking a picture; you're signaling a preference for comfort, stability, and organic textures over novelty, exploration, and clinical environments.
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Info size={18} className="text-cyan-500" /> Expert Tip:
              </h3>
              <p className="text-sm">
                To get the most accurate result, don't overthink. Your first instinct is usually the most honest representation of your "unfiltered vibe." Analysis bypasses your core aesthetic and taps into your social conditioning.
              </p>
            </div>
            <p>
              Our 2026 engine uses a weighted scoring system across eight dimensions: Nostalgia, Futurism, Organicism, Minimalism, Complexity, Warmth, Professionalism, and Chill. Each answer carries a hidden weight that shifts your profile toward one of our core archetypes.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-green-500" /> 2. Breaking Down the Archetypes
            </h2>
            <p>
              With our latest update, we've expanded the result set to include eight distinct vibe profiles. Understanding these is key to interpreting your results:
            </p>
            <ul className="space-y-4 list-disc pl-6 marker:text-pink-500">
              <li><strong>Golden Vibe:</strong> The classic optimist. You prefer warmth, sunlight, and retro-modern fusions.</li>
              <li><strong>Cyber Vibe:</strong> High-tech meets night-life. You thrive in the digital glow and value efficiency and neon aesthetics.</li>
              <li><strong>Nature Vibe:</strong> The grounded soul. You find peace in waterfalls, forests, and organic textures.</li>
              <li><strong>Minimal Vibe:</strong> Clarity is your superpower. You believe in "less is more" and value clean lines and open spaces.</li>
              <li><strong>Vintage Vibe:</strong> A romantic at heart. You feel most at home in the 70s, 80s, or 90s, valuing history and soul over modern polish.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="text-purple-500" /> 3. Why Vibes Matter in 2026
            </h2>
            <p>
              As AI continues to personalize every corner of our internet, knowing your own "vibe profile" allows you to curate your experience. Users who know they have a "Minimal Vibe" often find more success on productivity platforms that offer "Zen modes," while those with a "Cyber Vibe" excel in high-energy creative spaces.
            </p>
            <p>
              Furthermore, the Vibe Quiz serves as a team-building tool. Sharing results among coworkers or friends can bridge the communication gap, helping everyone understand the preferred "frequency" of their social circles.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white">Share Your Vibe</h2>
            <p>
              Once you've completed the quiz and read through your profile, don't keep it a secret. Use our instant-share tools to post your profile to your preferred social stack. After all, a vibe isn't real until it's shared.
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/vibe-quiz" className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition-transform">
                TAKE THE QUIZ NOW
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Footer Info */}
      <footer className="max-w-3xl mx-auto px-8 pb-24 text-center text-gray-500 text-sm">
        <p>© 2026 VibeMeNow Games. All rights reserved.</p>
        <p className="mt-2 italic">Authored by the VibeMeNow Editorial Team, Experts in Social Psychology and Game Design.</p>
      </footer>
    </div>
  );
}
