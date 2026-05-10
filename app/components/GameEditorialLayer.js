'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const GAME_CONTENT = {
  '/wordvibe': {
    title: 'WordVibe editorial notes',
    description: 'WordVibe is a compact word deduction game built around evidence, not luck.',
    details: [
      'The useful part of a five-letter word game is the reasoning trail between guesses. A good round starts with broad letter coverage, then narrows into position testing, duplicate-letter checks, and careful elimination. That makes the page more than a single puzzle screen: it gives players a repeatable way to practise vocabulary, spelling patterns, and constraint-based thinking in short sessions.',
      'The game is intentionally lightweight because the best word rounds are easy to restart. Players can test one opening strategy, compare it with another, and notice how different vowels or consonant clusters change the search space. This is why the surrounding guidance focuses on interpreting feedback instead of memorising one magic starter word.',
    ],
    tips: ['Open with common vowels and consonants.', 'Use a probe guess when too many endings remain.', 'Track rejected letters before chasing a hunch.'],
    related: [['/vocab-match', 'Vocab Vibe'], ['/emoji-iq', 'Emoji IQ'], ['/2048-vibe', 'Merge Vibe']],
  },
  '/vibeordie': {
    title: 'Vibe or Die editorial notes',
    description: 'Vibe or Die is a reaction game about patience under pressure.',
    details: [
      'Fast reaction games are often misunderstood as pure speed tests. In practice, a good score also depends on restraint. The player has to wait through anticipation, avoid false starts, and respond only when the signal is valid. That mix of inhibition and timing is why the game works as a quick focus drill rather than a random clicking toy.',
      'The best way to improve is to control the setup: keep the mouse or thumb in a comfortable position, avoid hovering tensely over the button, and play several short rounds instead of one long frustrated session. The page is designed for repeat attempts, so improvement comes from comparing averages and reducing mistakes rather than relying on one lucky tap.',
    ],
    tips: ['Relax your hand before the signal appears.', 'Count false starts as part of the score story.', 'Play several rounds and compare consistency.'],
    related: [['/reaction-arena', 'Reaction Arena'], ['/whack-a-vibe', 'Whack-a-Vibe'], ['/odd-one-out', 'Odd One Out']],
  },
  '/emoji-iq': {
    title: 'Emoji IQ editorial notes',
    description: 'Emoji IQ turns tiny symbols into a language and context puzzle.',
    details: [
      'Emoji puzzles are useful because they sit between visual recognition and phrase decoding. A player has to decide whether an icon should be read literally, as a sound clue, as a cultural reference, or as part of a sequence. That makes each answer a small exercise in flexible interpretation.',
      'The strongest strategy is to avoid locking onto the first meaning too quickly. Read the full set of icons, look for common phrase structures, and test whether the answer would still make sense if one emoji were removed. This page supports quick play, but it also rewards the slower habit of checking context before submitting.',
    ],
    tips: ['Read the whole emoji chain before guessing.', 'Test literal and figurative meanings.', 'Look for common sayings, films, and song titles.'],
    related: [['/wordvibe', 'WordVibe'], ['/vibe-quiz', 'Vibe Quiz'], ['/guides/emoji-iq-mastery', 'Emoji IQ guide']],
  },
  '/vocab-match': {
    title: 'Vocab Vibe editorial notes',
    description: 'Vocab Vibe is a matching exercise for vocabulary recall and precision.',
    details: [
      'Matching a word to a definition is simple on the surface, but the useful skill is discrimination. Many wrong answers can feel close, especially when terms share a topic or root. Players improve by finding the anchor phrase in each definition, then checking whether the term actually fits every part of that clue.',
      'The game is built for short practice sessions where a player can refresh terms without turning the page into a formal lesson. Solo play works for quiet recall, while room play adds pace and comparison. The educational value comes from repeated exposure, immediate correction, and the small moment of retrieval before each match.',
    ],
    tips: ['Find the anchor phrase in each definition.', 'Match obvious pairs first to reduce clutter.', 'Review near-misses after the round ends.'],
    related: [['/wordvibe', 'WordVibe'], ['/gcse', 'GCSE revision'], ['/blog/science-of-reading', 'Reading science']],
  },
  '/hot-takes': {
    title: 'Hot Takes editorial notes',
    description: 'Hot Takes is a light opinion game about instinct, comparison, and conversation.',
    details: [
      'A good opinion prompt is not a fact check. It is a small social mirror that lets players see how a group splits on taste, habit, or preference. The useful content on this page is the prompt design and the voting result: players get a fast comparison point without needing a long account setup or a serious debate format.',
      'The healthiest way to play is to keep the stakes low. Treat the percentages as a snapshot of participating players, not as scientific polling. That distinction matters because it keeps the game honest and makes the experience suitable for casual groups, classrooms, or quick breaks where discussion is welcome but pressure is not.',
    ],
    tips: ['Vote before overthinking the prompt.', 'Use results to start conversation, not settle facts.', 'Avoid treating casual splits as research data.'],
    related: [['/would-you-rather', 'Would You Rather'], ['/poll-party', 'Poll Party'], ['/vibe-quiz', 'Vibe Quiz']],
  },
  '/vibe-quiz': {
    title: 'Vibe Quiz editorial notes',
    description: 'Vibe Quiz is a playful personality-style quiz with shareable outcomes.',
    details: [
      'Personality quizzes work best when they are transparent about being entertainment. Vibe Quiz uses choices, patterns, and result text to create a fun reflection point, not a diagnosis or professional assessment. The page therefore gives players a clear frame: enjoy the result, compare it with friends, and treat it as a prompt for conversation.',
      'The value comes from well-paced questions and outcomes that feel specific enough to discuss. Players often replay to see how different choices change the result, which makes the quiz a lightweight branching experience. It is intentionally quick, but it still benefits from careful wording and an honest explanation of what the results do and do not mean.',
    ],
    tips: ['Answer by instinct rather than optimising.', 'Replay only if you want to compare paths.', 'Treat results as entertainment and discussion prompts.'],
    related: [['/emoji-iq', 'Emoji IQ'], ['/hot-takes', 'Hot Takes'], ['/guides/vibe-quiz-mastery', 'Quiz guide']],
  },
  '/would-you-rather': {
    title: 'Would You Rather editorial notes',
    description: 'Would You Rather turns impossible choices into quick social comparison.',
    details: [
      'The format is durable because it asks players to reveal a preference when neither option is perfect. A strong question avoids obvious answers and gives both sides a reason to exist. That tension creates replay value because the fun is not only the choice itself, but also discovering which trade-offs other people accept.',
      'For groups, the page works as a low-friction icebreaker. Players can vote quickly, explain their reasoning, and move to the next prompt without needing a host to prepare cards. For solo players, the result is still useful as a fast comparison point and a reminder that different people rank discomfort, reward, risk, and humour differently.',
    ],
    tips: ['Choose the option you could defend out loud.', 'Notice which trade-off the prompt is testing.', 'Use the result as a conversation starter.'],
    related: [['/hot-takes', 'Hot Takes'], ['/poll-party', 'Poll Party'], ['/guides/would-you-rather-psychology', 'Psychology guide']],
  },
  '/quiz-arena': {
    title: 'Quiz Arena editorial notes',
    description: 'Quiz Arena is multiplayer trivia built for fast room-based rounds.',
    details: [
      'Trivia becomes more engaging when pace and fairness are both visible. Quiz Arena gives players a shared room, the same questions, and a simple scoring loop so that the contest is about recall under time pressure rather than confusing setup. The page supports quick sessions for friends, classrooms, or casual challenge nights.',
      'Good quiz play involves more than knowing facts. Players learn when to trust memory, when to slow down for wording, and how to recover after a missed question. The surrounding content explains the format so visitors and crawlers can understand that the page offers an actual playable trivia experience, not just a thin doorway to an ad slot.',
    ],
    tips: ['Read every answer option before tapping.', 'Do not let one missed question rush the next.', 'Use short rematches to keep the room engaged.'],
    related: [['/gcse', 'GCSE revision'], ['/vocab-match', 'Vocab Vibe'], ['/reaction-arena', 'Reaction Arena']],
  },
  '/reaction-arena': {
    title: 'Reaction Arena editorial notes',
    description: 'Reaction Arena turns reflex timing into a multiplayer room challenge.',
    details: [
      'The appeal of a reaction room is that everyone faces the same waiting game. Players are not only competing against the signal; they are also managing anticipation while knowing that friends are doing the same thing. This makes the result easier to understand than a vague score because every round has a shared context.',
      'The best sessions are short and repeated. One round can be affected by distraction, device latency, or a false start, but several rounds reveal consistency. The page is therefore designed around quick rematches and clear feedback, giving players a useful way to compare focus and timing without pretending to be a laboratory-grade measurement tool.',
    ],
    tips: ['Use the same device when comparing scores.', 'Watch consistency across rounds.', 'Treat latency as part of casual play, not a medical metric.'],
    related: [['/vibeordie', 'Vibe or Die'], ['/whack-a-vibe', 'Whack-a-Vibe'], ['/guides/reaction-arena-tips', 'Reaction tips']],
  },
  '/odd-one-out': {
    title: 'Odd One Out editorial notes',
    description: 'Odd One Out is a visual scanning game about attention and pattern breaks.',
    details: [
      'Spotting a hidden difference sounds easy until the grid becomes crowded. The skill is selective attention: players must scan efficiently, avoid staring at one area for too long, and identify which feature actually breaks the pattern. That gives the page a clear cognitive purpose beyond simple tapping.',
      'In multiplayer sessions, the pressure changes the experience. A player who scans calmly often beats someone who moves randomly. The page works because it encourages repeatable visual strategies: sweep by rows, check edges, then inspect the centre. Each round is short enough to make strategy changes noticeable.',
    ],
    tips: ['Scan in a consistent direction.', 'Check corners and edges before the centre.', 'Look for shape, colour, spacing, and rotation changes.'],
    related: [['/memory-arena', 'Memory Arena'], ['/reaction-arena', 'Reaction Arena'], ['/emoji-iq', 'Emoji IQ']],
  },
  '/memory-arena': {
    title: 'Memory Arena editorial notes',
    description: 'Memory Arena is a room-based memory challenge for recall under pressure.',
    details: [
      'Memory games are valuable when they make the recall demand clear. Memory Arena asks players to encode a pattern, hold it briefly, and reproduce or recognise it while the room moves through the same challenge. That gives every score a context: attention, strategy, and timing all matter.',
      'Strong players usually create structure instead of trying to remember everything as separate pieces. They group positions, name patterns, or build a quick story around what they see. The page encourages those habits by keeping rounds compact and repeatable, so players can experiment with a memory method and immediately test whether it helped.',
    ],
    tips: ['Group items into chunks.', 'Name the pattern silently while viewing it.', 'Compare methods over several rounds.'],
    related: [['/odd-one-out', 'Odd One Out'], ['/vocab-match', 'Vocab Vibe'], ['/blog/retrieval-practice', 'Retrieval practice']],
  },
  '/poll-party': {
    title: 'Poll Party editorial notes',
    description: 'Poll Party is a group prompt game built around anonymous answers and voting.',
    details: [
      'The strongest party games give quieter players a structure for contributing. Poll Party does that by separating answer writing from voting, which gives everyone a moment to think before the room reacts. The anonymity also shifts attention onto the answer itself rather than the loudest person in the group.',
      'Good hosting matters. Clear prompts, short answers, and a friendly voting tone keep the room moving. The page explains that the results are social entertainment rather than formal polling, which protects the experience from being misread and gives reviewers a clearer understanding of why the page exists.',
    ],
    tips: ['Keep answers short enough to read quickly.', 'Vote for the response, not the person.', 'Use prompts that fit the group.'],
    related: [['/hot-takes', 'Hot Takes'], ['/would-you-rather', 'Would You Rather'], ['/drawing-dash', 'Drawing Dash']],
  },
  '/drawing-dash': {
    title: 'Drawing Dash editorial notes',
    description: 'Drawing Dash is a multiplayer drawing and guessing game for quick creative rounds.',
    details: [
      'Drawing games work because imperfect sketches are often funnier and more revealing than polished art. The player drawing has to communicate a concept quickly, while the guessers search for clues in shape, movement, and context. That gives the page a genuine interactive purpose for groups.',
      'The best strategy is clarity over decoration. A simple outline, one strong clue, and a readable scale usually beat a detailed drawing that takes too long to understand. The page is built for short turns so players can rotate roles and keep the room lively without needing a separate app or account.',
    ],
    tips: ['Draw the main noun first.', 'Use arrows or context only when needed.', 'Prioritise readable shapes over detail.'],
    related: [['/poll-party', 'Poll Party'], ['/quiz-arena', 'Quiz Arena'], ['/odd-one-out', 'Odd One Out']],
  },
  '/geography-guesser': {
    title: 'Geography Guesser editorial notes',
    description: 'Geography Guesser helps players practise flag and place recognition.',
    details: [
      'Geography recognition improves through repeated exposure and comparison. A player learns to notice colour order, symbols, regional patterns, and the small details that separate similar flags. That makes the page a useful practice tool for general knowledge rather than a one-off image quiz.',
      'The best approach is to review mistakes by feature. If two flags are confused, identify the exact difference: emblem, stripe direction, colour shade, or shape. The game keeps the loop quick so players can build recognition gradually while still enjoying the pace of a browser challenge.',
    ],
    tips: ['Group flags by region and colour pattern.', 'Review lookalike flags immediately.', 'Learn symbols as clues, not decoration.'],
    related: [['/guides/geography-guesser-tips', 'Geography tips'], ['/quiz-arena', 'Quiz Arena'], ['/gcse', 'GCSE revision']],
  },
  '/vibe-clicker': {
    title: 'Vibe Clicker editorial notes',
    description: 'Vibe Clicker is an idle upgrade game about compounding choices.',
    details: [
      'Clicker games are satisfying because progress is visible and decisions compound. Each upgrade changes the value of future clicks, so the interesting question is not only how fast a player can tap, but when an upgrade becomes worth buying. That gives the game a simple economy for players to explore.',
      'A good run alternates between active clicking and upgrade planning. Players can compare whether early automation, multipliers, or manual boosts produce better growth. The page explains that loop so the experience reads as a playable incremental game with strategy, not a thin screen of buttons.',
    ],
    tips: ['Compare upgrade cost against future return.', 'Buy multipliers before long idle stretches.', 'Reset expectations as growth speeds up.'],
    related: [['/2048-vibe', 'Merge Vibe'], ['/whack-a-vibe', 'Whack-a-Vibe'], ['/gravity-dash', 'Neon Strike']],
  },
  '/2048-vibe': {
    title: 'Merge Vibe editorial notes',
    description: 'Merge Vibe is a neon-infused puzzle challenge where every swipe creates a visual ripple.',
    details: [
      'Tile merge games reward planning because every move changes the future board. The useful habit is to keep high-value tiles organised, preserve empty spaces, and avoid moves that scatter the board for a short-term merge. That gives the game more strategic depth than the simple swipe controls suggest.',
      'The classic tile-merge format has been upgraded with a high-contrast neon palette and reactive animations. Players improve by choosing a corner plan and sticking with it until the board forces a change. Every merge creates a glowing "vibe" that adds to the visual momentum of the game, turning a strategic puzzle into a rhythmic experience.',
    ],
    tips: ['Keep the largest tile anchored.', 'Preserve open spaces whenever possible.', 'Avoid reversing your board plan too often.'],
    related: [['/wordvibe', 'WordVibe'], ['/vibe-clicker', 'Vibe Clicker'], ['/gravity-dash', 'Neon Strike']],
  },
  '/gravity-dash': {
    title: 'Neon Strike editorial notes',
    description: 'Neon Strike is a high-octane space combat game about precision, upgrades, and swarm survival.',
    details: [
      'Top-down space combat is built around the balance of movement and firepower. In Neon Strike, the player must manage a 360-degree range of motion while identifying which weapon upgrade—Triple Shot, Beam, or Rapid Fire—best fits the current wave of drones. That makes the experience more than a simple shooter: it is a fast lesson in spatial awareness and resource priority.',
      'The best way to survive the later swarms is to keep moving while leading your targets. Standing still makes the ship an easy target for homing drones, while constant rotation allows the player to sweep the field and collect power-ups efficiently. The page is designed for high-replay sessions where players can test different upgrade paths and compare their peak scores against the increasing difficulty curve.',
    ],
    tips: ['Keep moving to avoid homing swarms.', 'Prioritise weapon upgrades early in the round.', 'Use the screen boundaries to sweep drones into clusters.'],
    related: [['/vibeordie', 'Vibe or Die'], ['/whack-a-vibe', 'Whack-a-Vibe'], ['/2048-vibe', 'Merge Vibe']],
  },
  '/whack-a-vibe': {
    title: 'Whack-a-Vibe editorial notes',
    description: 'Whack-a-Vibe is a fast target game about accuracy under a timer.',
    details: [
      'Target games are strongest when accuracy matters as much as speed. Whack-a-Vibe asks players to hit the right targets, avoid penalties, and keep scanning while the clock runs. That turns the round into a balance between quick action and careful recognition.',
      'The best players do not simply click everywhere. They keep their eyes moving, wait long enough to confirm the target, and avoid losing points through rushed mistakes. The page supports that learning loop with short rounds that make it easy to test whether a calmer strategy beats frantic tapping.',
    ],
    tips: ['Confirm the target before clicking.', 'Keep your cursor near the centre when possible.', 'Value accuracy over one risky extra hit.'],
    related: [['/vibeordie', 'Vibe or Die'], ['/reaction-arena', 'Reaction Arena'], ['/gravity-dash', 'Neon Strike']],
  },
  '/ricochet-strike': {
    title: 'Ricochet Strike editorial notes',
    description: 'Ricochet Strike is a tactical physics shooter about angles, reflection, and anticipation.',
    details: [
      'The core value of a ricochet mechanic is that it forces the player to think two steps ahead. Instead of simply aiming at a target, the player must calculate the bounce path off the arena boundaries. This shifts the game from a pure reflex test into a spatial reasoning exercise, where the environment itself becomes a weapon.',
      'Tactical depth is further enhanced by the inclusion of shielded drones. Since these enemies block direct frontal fire, the player must use the ricochet logic to bypass defenses. This encourages experimentation with different angles and teaches the importance of "leading" targets into the path of a bouncing projectile rather than chasing them directly.',
    ],
    tips: [
      'Use the side walls to "bank" shots behind shielded enemies.',
      'Bullets last for up to 4 bounces—clear clusters with a single well-aimed burst.',
      'Stay near the center of the arena to maintain the widest range of shooting angles.'
    ],
    related: [['/gravity-dash', 'Neon Strike'], ['/vibeordie', 'Vibe or Die'], ['/2048-vibe', 'Merge Vibe']],
  },
};

export default function GameEditorialLayer() {
  const pathname = usePathname();
  const content = GAME_CONTENT[pathname];

  if (!content) {
    return null;
  }

  return (
    <section
      className="seo-guide"
      aria-labelledby="game-editorial-heading"
      style={{
        maxWidth: 920,
        margin: '24px auto 56px',
        padding: '0 20px',
        color: '#d6d6d6',
        lineHeight: 1.75,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 28,
        }}
      >
        <h2 id="game-editorial-heading" style={{ color: '#fff', fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: 12 }}>
          {content.title}
        </h2>
        <p style={{ color: '#aeb7c2', fontSize: 17, marginBottom: 24 }}>{content.description}</p>

        {content.details.map((paragraph) => (
          <p key={paragraph} style={{ marginBottom: 18 }}>
            {paragraph}
          </p>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, margin: '28px 0' }}>
          {content.tips.map((tip, index) => (
            <div
              key={tip}
              style={{
                padding: 16,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ color: '#00d4ff', fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Practice note {index + 1}</div>
              <p style={{ margin: 0, color: '#c8c8c8', fontSize: 14 }}>{tip}</p>
            </div>
          ))}
        </div>

        <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 12 }}>Where to go next</h3>
        <p style={{ marginBottom: 14 }}>
          Players who enjoy this format often get the most value from rotating between related games. Switching formats keeps the session fresh while still practising attention, recall, timing, or social decision-making.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {content.related.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              style={{
                color: '#0a0a0f',
                background: '#ded895',
                borderRadius: 8,
                padding: '9px 12px',
                fontWeight: 800,
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
