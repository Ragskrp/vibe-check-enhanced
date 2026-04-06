'use client';

import Link from 'next/link';
import { ChevronLeft, Clock } from 'lucide-react';

export default function ScreenTimeVsGameTime() {
  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: 24 }}>
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
          <ChevronLeft size={14} /> BACK TO BLOG
        </Link>
      </div>

      <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>⏱️</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#b14aed', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Wellness & Research</span>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 30, marginBottom: 12, lineHeight: 1.3 }}>
            Screen Time vs. Game Time: Why Not All <span style={{ color: '#b14aed' }}>Digital Minutes Are Equal</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555', flexWrap: 'wrap' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> 11 Min Read</span>
            <span>•</span>
            <span>March 2026</span>
          </div>
        </div>

        <div style={{ color: '#ccc', lineHeight: 1.85, fontSize: 16 }}>
          <p style={{ marginBottom: 20, fontSize: 18, color: '#aaa', fontStyle: 'italic' }}>
            &quot;Reduce your screen time." It is one of the most common health recommendations of the digital age. But mounting research suggests that the advice is fundamentally flawed — because it treats all screen-based activities as equally harmful, when they are anything but.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>The Problem with &quot;Screen Time" as a Metric</h2>
          <p style={{ marginBottom: 20 }}>
            The concept of &quot;screen time" emerged in the early 2010s as a convenient shorthand for measuring digital engagement, particularly among children. Health organisations, worried about rising rates of childhood obesity, attention disorders, and sleep disruption, began issuing guidelines recommending strict limits on the number of hours spent looking at screens.
          </p>
          <p style={{ marginBottom: 20 }}>
            The problem with these guidelines is that they lump fundamentally different activities into a single category. Under the &quot;screen time" umbrella, passively watching autoplay videos on a social media feed is treated as equivalent to actively solving a puzzle. Video-chatting with a grandparent is counted the same as doom-scrolling through rage-inducing political commentary. Creating digital art is measured the same as watching a stranger eat food on YouTube.
          </p>
          <p style={{ marginBottom: 20 }}>
            This one-dimensional approach to measuring digital health is, to use an analogy, like measuring physical health solely by &quot;food time" — the total number of minutes you spend eating per day — without distinguishing between a balanced meal and a bag of sweets. The duration is far less important than the <strong>quality, type, and context</strong> of the activity.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>Active vs. Passive Screen Use: What the Research Shows</h2>
          <p style={{ marginBottom: 20 }}>
            Researchers have increasingly adopted a more nuanced framework that distinguishes between <strong>active</strong> and <strong>passive</strong> screen use. Active use refers to activities that require cognitive engagement, decision-making, creativity, or social interaction. Passive use refers to activities characterised by consumption without meaningful mental engagement.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16,
            marginBottom: 24, marginTop: 24
          }}>
            <div style={{ padding: 20, borderRadius: 16, background: 'rgba(0, 255, 148, 0.05)', border: '1px solid rgba(0, 255, 148, 0.15)' }}>
              <p style={{ fontWeight: 700, color: '#00ff94', marginBottom: 8, fontSize: 14 }}>✅ Active Screen Use</p>
              <ul style={{ fontSize: 13, color: '#888', paddingLeft: 16 }}>
                <li style={{ marginBottom: 4 }}>Playing brain-training games</li>
                <li style={{ marginBottom: 4 }}>Video-chatting with friends</li>
                <li style={{ marginBottom: 4 }}>Creating digital content</li>
                <li style={{ marginBottom: 4 }}>Solving puzzles and quizzes</li>
                <li style={{ marginBottom: 4 }}>Interactive learning platforms</li>
                <li>Cooperative multiplayer gaming</li>
              </ul>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: 'rgba(255, 45, 120, 0.05)', border: '1px solid rgba(255, 45, 120, 0.15)' }}>
              <p style={{ fontWeight: 700, color: '#ff2d78', marginBottom: 8, fontSize: 14 }}>⚠️ Passive Screen Use</p>
              <ul style={{ fontSize: 13, color: '#888', paddingLeft: 16 }}>
                <li style={{ marginBottom: 4 }}>Infinite-scrolling social feeds</li>
                <li style={{ marginBottom: 4 }}>Watching autoplay video loops</li>
                <li style={{ marginBottom: 4 }}>Browsing without purpose</li>
                <li style={{ marginBottom: 4 }}>Consuming outrage content</li>
                <li style={{ marginBottom: 4 }}>Passive news consumption</li>
                <li>Comparing lifestyles on social media</li>
              </ul>
            </div>
          </div>

          <p style={{ marginBottom: 20 }}>
            A landmark 2023 study from the Oxford Internet Institute analysed data from over 400,000 participants and found that the relationship between digital technology use and wellbeing was <strong>&quot;tiny, and not clinically meaningful."</strong> However — and this is the crucial finding — when the researchers broke the data down by type of activity, clear differences emerged. Active, goal-directed use (including gaming) was associated with <strong>neutral or slightly positive</strong> wellbeing outcomes, while passive consumption was associated with <strong>negative</strong> outcomes, particularly for adolescents.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>The &quot;Flow State" Advantage of Structured Gaming</h2>
          <p style={{ marginBottom: 20 }}>
            When you play a well-designed game — whether it is WordVibe, Whack-a-Vibe, or a five-minute round of Geography Guesser — your brain enters what psychologist Mihaly Csikszentmihalyi called a <strong>&quot;flow state."</strong> Flow is the mental experience of being fully immersed in an activity that is challenging enough to be engaging, but not so difficult that it becomes frustrating. It is the state of optimal experience, and it is reliably associated with increased happiness, reduced anxiety, and enhanced cognitive performance.
          </p>
          <p style={{ marginBottom: 20 }}>
            Passive scrolling, by contrast, rarely produces flow. Social feeds are designed to capture attention through novelty and emotional provocation, not through structured challenge. The result is a state that psychologists sometimes call <strong>&quot;default mode network activation"</strong> — your brain is active, but in a diffuse, unfocused way that tends to amplify rumination, self-criticism, and comparison with others.
          </p>

          <div style={{
            padding: 24, borderRadius: 16,
            background: 'rgba(177, 74, 237, 0.05)',
            border: '1px solid rgba(177, 74, 237, 0.15)',
            marginBottom: 24
          }}>
            <p style={{ fontWeight: 700, color: '#b14aed', marginBottom: 8, fontSize: 14 }}>💜 The Flow Equation</p>
            <p style={{ fontSize: 14 }}>
              Flow occurs when the <strong>difficulty</strong> of a task matches the <strong>skill level</strong> of the participant. Games are uniquely suited to producing flow because they can dynamically adjust difficulty. A WordVibe puzzle that takes you 3 guesses today might take 6 tomorrow — the variability keeps you in the flow zone.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>Time-Bounded vs. Infinite Experiences</h2>
          <p style={{ marginBottom: 20 }}>
            One of the most important distinctions between healthy and unhealthy screen use is whether the experience has a <strong>natural endpoint</strong>. A WordVibe puzzle ends. A round of Quiz Arena concludes. A session of Whack-a-Vibe lasts 30 seconds. These time-bounded experiences give your brain a clear signal: &quot;We are done. Time to return to the real world."
          </p>
          <p style={{ marginBottom: 20 }}>
            Social media feeds, by design, have no endpoint. They use infinite scroll, autoplay, and algorithmic content injection to eliminate every natural stopping point. The absence of a clear &quot;game over" screen means that the decision to stop must always come from the user&apos;s willpower — a finite resource that degrades throughout the day. This is why people routinely report spending 45 minutes on social media when they intended to spend 5, but rarely report the same experience with a daily puzzle game. The game's structure respects the player's time by design.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>The Cortisol Question: Stress, Screens, and Recovery</h2>
          <p style={{ marginBottom: 20 }}>
            Cortisol, the body&apos;s primary stress hormone, provides a useful physiological measure of how different screen activities affect us. Research from the University of Basel found that <strong>passive social media use</strong> was associated with elevated cortisol levels, particularly when it involved exposure to negative news or social comparison. The more time participants spent scrolling, the higher their stress levels climbed.
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>Structured gaming</strong>, by contrast, showed a different cortisol profile. Short gaming sessions — particularly puzzle and casual games — were associated with <strong>cortisol reduction</strong>, suggesting that they function as genuine &quot;stress-relief&quot; activities rather than stress amplifiers. The key, researchers noted, was the game&apos;s ability to redirect cognitive attention away from real-world stressors and toward a controlled, solvable challenge. In other words, a five-minute game is a &quot;mental holiday&quot;; a five-minute scroll is often a mental amplifier of whatever was already bothering you.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>Practical Guidelines for Healthier Digital Habits</h2>
          <p style={{ marginBottom: 20 }}>
            Based on the current research, here are evidence-based guidelines for making your screen time genuinely beneficial:
          </p>
          <ol style={{ paddingLeft: 20, marginBottom: 24 }}>
            <li style={{ marginBottom: 12 }}><strong>Audit, don&apos;t count.</strong> Instead of tracking total screen minutes, categorise your usage as active or passive. Actively playing Emoji IQ for 10 minutes is fundamentally different from passively scrolling for 10 minutes.</li>
            <li style={{ marginBottom: 12 }}><strong>Prioritise structured activities.</strong> Choose screen activities with clear goals, rules, and endpoints. Games, creative tools, and interactive learning platforms are all examples of structured screen use.</li>
            <li style={{ marginBottom: 12 }}><strong>Replace &quot;scroll breaks" with "game breaks."</strong> When you reach for your phone during a work break, play a quick round of WordVibe or Hot Takes instead of opening a social feed. You will feel more refreshed and return to work with greater focus.</li>
            <li style={{ marginBottom: 12 }}><strong>Use social gaming for connection.</strong> When you want to connect with friends or colleagues, suggest a multiplayer game session rather than a group chat. The shared activity creates stronger bonds than text exchanges.</li>
            <li style={{ marginBottom: 12 }}><strong>Respect the endpoint.</strong> Choose games and platforms that have natural stopping points, rather than infinite-scroll experiences. If a platform is designed to keep you engaged indefinitely, be cautious.</li>
          </ol>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>A More Nuanced Conversation</h2>
          <p style={{ marginBottom: 24 }}>
            The blanket advice to &quot;reduce screen time" is well-intentioned but scientifically outdated. Not all digital minutes are created equal. The key question is not <em>how much</em> time you spend on screens, but <em>how</em> you spend that time. Structured, goal-directed, social, and time-bounded activities — like the games on VIBEMENOW — represent the healthy end of the digital spectrum. As research continues to refine our understanding of digital health, the conversation is shifting from quantity to quality. And that is a genuinely positive development.
          </p>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/#games-listing">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                ⚡ Make Your Screen Time Count
              </button>
            </Link>
          </div>
        </div>
      </article>

      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Based on published peer-reviewed research.</p>
      </div>
    </div>
  );
}
