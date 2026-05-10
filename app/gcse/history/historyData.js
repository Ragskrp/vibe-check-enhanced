export function getTopicsByCategory() {
  return {
    'Medicine in Britain': [
      {
        slug: 'medieval-medicine',
        title: 'Medicine in Medieval England',
        description: 'Ideas about causes of disease, approaches to treatment and prevention.',
        color: '#ff6b35',
        flashcards: [
          { q: 'What were the four humours?', a: 'Blood, phlegm, yellow bile, black bile. Imbalance was believed to cause disease.' },
          { q: 'Who proposed the Theory of the Four Humours?', a: 'Hippocrates, and it was later developed by Galen.' },
          { q: 'What was the miasma theory?', a: 'The belief that bad air, filled with poisonous fumes from decaying matter, caused disease.' },
          { q: 'What role did the Church play in Medieval medicine?', a: 'Controlled education, promoted Galen\'s ideas, and taught that illness was a punishment from God.' },
          { q: 'When was the Black Death?', a: '1348-1349 in England.' }
        ],
        quizzes: [
          { q: 'Which physician wrote "The Canon of Medicine", heavily used in Medieval England?', a: 'Avicenna (Ibn Sina)', options: ['Avicenna', 'Hippocrates', 'Galen', 'Vesalius'] },
          { q: 'What was a "vivisection"?', a: 'Dissecting a live criminal, sometimes done in Alexandria.', options: ['Dissecting a live criminal', 'Amputating a limb', 'Bloodletting', 'A herbal remedy'] },
          { q: 'What was the primary method of treatment based on the Four Humours?', a: 'Purging and bloodletting', options: ['Purging and bloodletting', 'Antibiotics', 'Vaccination', 'Quarantine'] },
          { q: 'What was an apothecary?', a: 'Someone who mixed herbal remedies.', options: ['Someone who mixed herbal remedies.', 'A trained doctor at a university.', 'A priest who prayed for the sick.', 'A surgeon who performed amputations.'] }
        ]
      },
      {
        slug: 'renaissance-medicine',
        title: 'The Medical Renaissance',
        description: 'Vesalius, Harvey, Sydenham, and the printing press.',
        color: '#ff6b35',
        flashcards: [
          { q: 'Who proved Galen wrong about the anatomy of the jaw?', a: 'Andreas Vesalius (proved humans have one jaw bone, not two like apes).' },
          { q: 'What book did Vesalius publish in 1543?', a: 'On the Fabric of the Human Body.' },
          { q: 'What did William Harvey discover?', a: 'The circulation of blood, pumped by the heart, rather than being constantly manufactured in the liver.' },
          { q: 'What was the Royal Society?', a: 'A scientific group founded in 1660 to promote discussion and spread of scientific ideas.' },
          { q: 'How did the Printing Press aid medicine?', a: 'Allowed exact copies of medical texts and anatomical drawings to be shared rapidly without Church interference.' }
        ],
        quizzes: [
          { q: 'What was Thomas Sydenham known as?', a: 'The English Hippocrates', options: ['The English Hippocrates', 'The Father of Anatomy', 'The Discoverer of Circulation', 'The First Surgeon'] },
          { q: 'Which disease hit London severely in 1665?', a: 'The Great Plague', options: ['The Great Plague', 'The Black Death', 'Cholera', 'Spanish Flu'] },
          { q: 'What did Harvey use to prove blood only flowed one way?', a: 'Valves in the veins', options: ['Valves in the veins', 'Microscopes', 'X-rays', 'Chemical analysis'] }
        ]
      }
    ],
    'Weimar and Nazi Germany': [
      {
        slug: 'weimar-republic',
        title: 'The Weimar Republic 1918-29',
        description: 'Origins, early challenges, hyperinflation, and recovery.',
        color: '#ff2d78',
        flashcards: [
          { q: 'When was the armistice signed ending WWI?', a: '11 November 1918' },
          { q: 'What was Article 48 of the Weimar Constitution?', a: 'Gave the President emergency powers to rule by decree without the Reichstag.' },
          { q: 'What were the terms of the Treaty of Versailles (LAMB)?', a: 'Land lost, Army reduced (100k), Money (Reparations £6.6bn), Blame (Article 231).' },
          { q: 'What was the Spartacist Uprising (1919)?', a: 'A communist revolt led by Rosa Luxemburg and Karl Liebknecht, crushed by the Freikorps.' },
          { q: 'When was the hyperinflation crisis?', a: '1923, triggered by the French occupation of the Ruhr and the government printing money to pay striking workers.' }
        ],
        quizzes: [
          { q: 'Who was the Chancellor during the "Golden Age" (1924-1929)?', a: 'Gustav Stresemann', options: ['Gustav Stresemann', 'Friedrich Ebert', 'Paul von Hindenburg', 'Adolf Hitler'] },
          { q: 'What was the Dawes Plan (1924)?', a: 'US loans to Germany to help pay reparations.', options: ['US loans to Germany to help pay reparations.', 'A plan to rearm Germany.', 'A treaty with the USSR.', 'A reduction in the German army.'] },
          { q: 'What was the Kapp Putsch (1920)?', a: 'A right-wing revolt by the Freikorps.', options: ['A right-wing revolt by the Freikorps.', 'A communist uprising.', 'A strike in the Ruhr.', 'A mutiny in the navy.'] }
        ]
      },
      {
        slug: 'hitlers-rise',
        title: 'Hitler\'s Rise to Power',
        description: 'Early NSDAP, Munich Putsch, the Great Depression, and becoming Chancellor.',
        color: '#ff2d78',
        flashcards: [
          { q: 'What was the Munich Putsch (1923)?', a: 'Hitler\'s failed attempt to seize power in Bavaria. He was imprisoned and wrote Mein Kampf.' },
          { q: 'How did the 1929 Wall Street Crash affect Germany?', a: 'US recalled loans, leading to mass unemployment (6 million by 1932), which fueled support for extremist parties.' },
          { q: 'Who was appointed Chancellor before Hitler in 1932?', a: 'Franz von Papen and Kurt von Schleicher.' },
          { q: 'When was Hitler appointed Chancellor?', a: '30 January 1933.' }
        ],
        quizzes: [
          { q: 'What was the SA?', a: 'The Sturmabteilung (Brownshirts), the Nazi paramilitary wing.', options: ['The Sturmabteilung (Brownshirts)', 'The Secret Police', 'The regular army', 'Hitler\'s personal bodyguards'] },
          { q: 'What did Hindenburg and von Papen mistakenly believe they could do to Hitler in 1933?', a: 'Control him', options: ['Control him', 'Arrest him', 'Assassinate him', 'Ignore him'] }
        ]
      }
    ],
    'Cold War Relations': [
      {
        slug: 'cold-war-origins',
        title: 'Origins of the Cold War',
        description: 'Yalta, Potsdam, the Iron Curtain, and the Truman Doctrine.',
        color: '#00d4ff',
        flashcards: [
          { q: 'Who were the "Big Three" at Yalta (Feb 1945)?', a: 'Roosevelt, Churchill, Stalin.' },
          { q: 'What changed by the Potsdam Conference (July 1945)?', a: 'Truman replaced Roosevelt, Attlee replaced Churchill, and the USA had successfully tested the atomic bomb.' },
          { q: 'What was the Truman Doctrine (1947)?', a: 'The US policy of containment—providing aid to any country threatened by communism.' },
          { q: 'What was the Marshall Plan (1947)?', a: '$13.7 billion in US economic aid to rebuild Western Europe and prevent the spread of communism.' }
        ],
        quizzes: [
          { q: 'What did Churchill call the division of Europe in his 1946 speech?', a: 'The Iron Curtain', options: ['The Iron Curtain', 'The Berlin Wall', 'The Soviet Sphere', 'The Great Divide'] },
          { q: 'What was Stalin\'s response to the Marshall Plan?', a: 'Comecon (Council for Mutual Economic Assistance)', options: ['Comecon', 'Cominform', 'The Warsaw Pact', 'The Berlin Blockade'] }
        ]
      }
    ]
  };
}
