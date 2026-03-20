'use client';

import { BookOpen, Zap, Users, Brain, Globe, Palette, Target } from 'lucide-react';
import Link from 'next/link';

export default function GuidesPage() {
  const guides = [
    {
      title: "The Ultimate Vibe Quiz Guide",
      desc: "How to accurately discover your personality archetype and share it with the world.",
      icon: <Zap className="text-pink-500" />,
      href: "/guides/vibe-quiz-mastery"
    },
    {
      title: "Mastering Reaction Arena",
      desc: "Pro tips to improve your millisecond response time and dominate the local leaderboards.",
      icon: <Zap className="text-cyan-500" />,
      href: "/guides/reaction-arena-tips"
    },
    {
      title: "The Psychology of Would You Rather",
      desc: "Why we choose the impossible scenarios and what it says about your decision making.",
      icon: <Brain className="text-purple-500" />,
      href: "/guides/would-you-rather-psychology"
    },
    {
      title: "WordVibe Mastery Strategies",
      desc: "Linguistics, frequency analysis, and the 'starter word' secret to guessing in 3.",
      icon: <Target className="text-cyan-500" />,
      href: "/guides/wordvibe-strategies"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 mb-6">
            <BookOpen size={16} />
            Expert Resources
          </div>
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Game Guides & <br/>Expert Insights
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Deep dives into the mechanics, psychology, and mastery of your favorite party games. 
            Built for the 2026 web with a focus on value and expertise.
          </p>
        </header>

        <div className="grid gap-6">
          {guides.map((guide, i) => (
            <Link key={i} href={guide.href} className="group">
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    {guide.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{guide.title}</h2>
                    <p className="text-gray-400 leading-relaxed">{guide.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white/60">
                      READ THE GUIDE <Zap size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
