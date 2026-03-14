'use client';

import { ChevronLeft, Share2, Zap, Clock, Disc, Brain, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ReactionArenaGuide() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Article Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050508] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-50"
          alt="Abstract Tech"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
          <Link href="/guides" className="mb-6 flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={16} /> BACK TO GUIDES
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            The Science of <br/><span className="text-cyan-400">Reaction Speed</span>
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
            <span>By Speedster Mike</span>
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
              In the arena of millisecond competition, the difference between a "Casual Vibing" and "God Tier" reaction time is less than the blink of an eye. <strong>Reaction Arena</strong> is more than just a tap game; it's a test of your central nervous system's ability to process visual information and trigger motor output.
            </p>
            <p>
              While the average human reaction time is around 250ms, the top 1% of players on VibeMeNow consistently hit sub-150ms scores. How do they do it? Is it pure genetics, or can you train your way to the top? In this guide, we break down the physics and biology of speed.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Clock className="text-cyan-400" /> 1. The Neural Pathway
            </h2>
            <p>
              When the screen turns pink in Reaction Arena, light enters your eye, hits the retina, and travels through the optic nerve to the visual cortex. From there, your brain identifies the "Go" signal and sends a message down your spinal cord to your finger.
            </p>
            <p>
              Each of these steps takes time. By minimizing environmental distractions—like screen lag or physical fatigue—you can shave critical milliseconds off your total score. 
            </p>
            <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck size={18} className="text-cyan-400" /> Pro Secret: Active Anticipation
              </h3>
              <p className="text-sm">
                Don't wait for your brain to recognize 'Pink'. Focus on the transition itself. The human brain is faster at detecting change than identifying specific color hues.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Disc className="text-purple-500" /> 2. Hardware and Environment
            </h2>
            <p>
              In 2026, display technology has reached incredible heights, but input lag still exists. To achieve the best possible scores in Reaction Arena, follow these hardware tips:
            </p>
            <ul className="space-y-4 list-disc pl-6 marker:text-cyan-400">
              <li><strong>Refresh Rates:</strong> Ensure your device is running at 120Hz or higher. Lower refresh rates can hide the transition for up to 16ms.</li>
              <li><strong>Touch vs. Click:</strong> High-end mice often have lower latency than touchscreens. If you're on a phone, use a firm, direct tap.</li>
              <li><strong>Focus Mode:</strong> Disable background notifications. Even a tiny frame drop can ruin a perfect round.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Brain className="text-green-500" /> 3. Training Your Reflexes
            </h2>
            <p>
              Reflexes are like muscles. Regular play in our "Series of 5" mode builds neural pathways that make reactions more automatic. We recommend three 5-round sessions a day: Morning, Afternoon, and Evening to account for circadian rhythm shifts in speed.
            </p>
            <p>
              Hydration and focus are also key. Studies show that even mild dehydration can slow reaction times by up to 10%—the difference between 200ms and 220ms.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white">Ready to Compete?</h2>
            <p>
              Theory only goes so far. The only way to truly master the arena is through practice. Challenge your friends to a 5-round match and see who truly has the fastest reflexes in your circle.
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/reaction-arena" className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 transition-transform uppercase tracking-wider">
                Enter the Arena
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Footer Info */}
      <footer className="max-w-3xl mx-auto px-8 pb-24 text-center text-gray-500 text-sm">
        <p>© 2026 VibeMeNow Games. All rights reserved.</p>
        <p className="mt-2 text-cyan-500/50">AUTHORITATIVE CONTENT • EXPERT CERTIFIED • 2026 STANDARDS</p>
      </footer>
    </div>
  );
}
