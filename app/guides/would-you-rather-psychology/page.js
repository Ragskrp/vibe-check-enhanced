'use client';

import { ChevronLeft, Brain, Target, ShieldCheck, TrendingUp, Info, Zap } from 'lucide-react';
import Link from 'next/link';

export default function WouldYouRatherPsychologyGuide() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Article Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050508] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop" 
          alt="Abstract Choices" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
          <Link href="/guides" className="mb-6 flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={16} /> BACK TO GUIDES
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            The Psychology of <br/><span className="text-purple-500">Impossible Choices</span>
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
            <span>By Cognitive Vibe Lab</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>10 Min Read</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-8 pb-32 -mt-10 relative z-30">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0d0d14] border border-white/5 shadow-2xl space-y-8 text-gray-300 leading-relaxed text-lg">
          
          <section className="space-y-4">
            <p>
              Why do we find it so exhilarating to choose between living without a sense of taste or living without a sense of smell? On the surface, "Would You Rather" seems like a simple playground game. But in reality, it is a sophisticated cognitive exercise that forces the brain to perform complex value-weighting and loss-aversion analysis.
            </p>
            <p>
              In the context of 2026's digital social spaces, these "impossible choices" serve as a mirror to our subconscious priorities. When you play <strong>Would U Rather</strong> on VibeMeNow, you're engaging in a form of ethical and aesthetic triage.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Brain className="text-purple-500" /> 1. The Burden of Counterfactual Thinking
            </h2>
            <p>
              When presented with two equally daunting or equally exciting options, the brain enters a state of "counterfactual simulation." You aren't just reading text; you are mentally inhabiting the world where each choice has become reality. 
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Info size={18} className="text-purple-500" /> Psychological Insight:
              </h3>
              <p className="text-sm">
                Studies show that during these games, people often choose the option that preserves their "core identity" even if it's logically worse. This is why choices about values (e.g., "Always speak the truth" vs "Never be sad") are the most debated.
              </p>
            </div>
            <p>
              This simulation is what makes the game "addictive." The brain is wired to resolve ambiguity. By forcing a choice, you close a loop of uncertainty, providing a small hit of dopamine upon "solving" the impossible.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="text-orange-500" /> 2. The Social Comparison Effect
            </h2>
            <p>
              One of the most powerful features of modern "Would You Rather" platforms is the ability to see how others voted. This triggers the "Social Comparison Effect." 
            </p>
            <p>
              When you see that 80% of people chose the opposite of you, it creates a moment of self-reflection. "Am I an outlier? Or do I see something others don't?" This social validation—or contradiction—is what drives the "viral" nature of VibeMeNow's social games.
            </p>
            <ul className="space-y-4 list-disc pl-6 marker:text-purple-500">
              <li><strong>The Majority Vibe:</strong> Choosing with the crowd signals a desire for social harmony and shared reality.</li>
              <li><strong>The Contrarian Vibe:</strong> Choosing against the grain often signals a high degree of independent thought or a niche aesthetic preference.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-cyan-500" /> 3. Gamifying Decision Making
            </h2>
            <p>
              In a world of information overload, we often suffer from "decision fatigue." Engaging in low-stakes, high-impact imaginary choices like those found in our games acts as "cross-training" for your decision-making muscles. 
            </p>
            <p>
              By decoupling the <em>consequence</em> from the <em>choice</em>, you allow your brain to explore paths it would normally be too afraid to consider. It's a safe space for the "What If?"
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white">Challenge Your Brain</h2>
            <p>
              Ready to see where your subconscious values lie? Head over to our Would You Rather arena and face today's curated list of impossible choices. See if you're a member of the majority or a true vibe pioneer.
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/would-you-rather" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold hover:scale-105 transition-transform flex items-center gap-2">
                PICK YOUR PATH <Zap size={18} />
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Footer Info */}
      <footer className="max-w-3xl mx-auto px-8 pb-24 text-center text-gray-500 text-sm">
        <p>© 2026 VibeMeNow Games. This article is for informational purposes and explores the intersection of game design and social psychology.</p>
        <p className="mt-2 italic">Authored by Dr. Vibe, Lead Researcher at the VibeMeNow Social Dynamics Department.</p>
      </footer>
    </div>
  );
}
