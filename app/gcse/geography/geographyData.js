export function getTopicsByCategory() {
  return {
    'Physical Geography': [
      {
        slug: 'tectonic-hazards',
        title: 'Tectonic Hazards',
        description: 'Earthquakes, volcanoes, plate margins, and management strategies.',
        color: '#00e5a0',
        flashcards: [
          { q: 'What is a destructive plate margin?', a: 'Where an oceanic plate subducts under a continental plate, causing earthquakes and explosive volcanoes.' },
          { q: 'What is a constructive plate margin?', a: 'Where plates move apart and magma rises to fill the gap (e.g., Mid-Atlantic Ridge).' },
          { q: 'What is a primary effect of an earthquake?', a: 'Immediate damage caused directly by the shaking (e.g., collapsed buildings, injured people).' },
          { q: 'What is a secondary effect of an earthquake?', a: 'Damage that happens later as a result of primary effects (e.g., tsunamis, fires from broken gas pipes, disease).' },
          { q: 'Why do people live in tectonically active areas?', a: 'Fertile volcanic soil, geothermal energy, tourism, poverty/inability to move, or confidence in building design.' }
        ],
        quizzes: [
          { q: 'Which type of plate boundary features plates sliding past each other?', a: 'Conservative', options: ['Conservative', 'Constructive', 'Destructive', 'Collision'] },
          { q: 'At which plate boundary are fold mountains formed?', a: 'Collision', options: ['Collision', 'Conservative', 'Constructive', 'Divergent'] },
          { q: 'What scale is used to measure the magnitude of an earthquake?', a: 'Moment Magnitude Scale', options: ['Moment Magnitude Scale', 'Richter Scale', 'Mercalli Scale', 'Saffir-Simpson Scale'] }
        ]
      },
      {
        slug: 'weather-hazards',
        title: 'Weather Hazards',
        description: 'Tropical storms, extreme weather in the UK, and climate change.',
        color: '#00e5a0',
        flashcards: [
          { q: 'What temperature must the ocean be for a tropical storm to form?', a: 'At least 27°C.' },
          { q: 'What is the Coriolis effect?', a: 'The spin of the Earth that causes winds to curve and tropical storms to spin.' },
          { q: 'What is the eye of a tropical storm?', a: 'The calm, clear centre of the storm where air is descending.' },
          { q: 'Give one piece of evidence for climate change.', a: 'Shrinking glaciers and melting ice caps, rising sea levels, or tree ring analysis.' },
          { q: 'What is mitigation in the context of climate change?', a: 'Action taken to reduce or eliminate the long-term risk of climate change (e.g., renewable energy, carbon capture).' }
        ],
        quizzes: [
          { q: 'Which of these is a method of adapting to climate change?', a: 'Building sea walls', options: ['Building sea walls', 'Using solar panels', 'Planting trees', 'Carbon capture'] },
          { q: 'Where do tropical storms lose their energy?', a: 'Over land or cold water', options: ['Over land or cold water', 'At the equator', 'In the upper atmosphere', 'Near the eye wall'] }
        ]
      }
    ],
    'Human Geography': [
      {
        slug: 'urban-issues',
        title: 'Urban Issues & Challenges',
        description: 'Urbanisation, megacities, and sustainable urban living.',
        color: '#ffe600',
        flashcards: [
          { q: 'What is urbanisation?', a: 'The increasing proportion of people living in towns and cities compared to rural areas.' },
          { q: 'What is a megacity?', a: 'A city with a population of over 10 million people.' },
          { q: 'What is rural-urban migration?', a: 'The movement of people from the countryside to cities, often driven by push and pull factors.' },
          { q: 'Give an example of an economic pull factor.', a: 'Better paid jobs, more career opportunities.' },
          { q: 'What is urban sprawl?', a: 'The unplanned outward expansion of a city into the surrounding rural area.' }
        ],
        quizzes: [
          { q: 'Which of the following is an environmental challenge of urbanisation in LICs?', a: 'Lack of sanitation and open sewers', options: ['Lack of sanitation and open sewers', 'Traffic congestion on motorways', 'High house prices', 'Deindustrialisation'] },
          { q: 'What is the "informal economy"?', a: 'Unofficial work without taxes or legal protection (e.g., street vending).', options: ['Unofficial work without taxes or legal protection.', 'Working in a bank.', 'Government jobs.', 'Farming for your own family.'] }
        ]
      },
      {
        slug: 'economic-development',
        title: 'The Changing Economic World',
        description: 'Measuring development, the DTM, and reducing the global development gap.',
        color: '#ffe600',
        flashcards: [
          { q: 'What does HDI stand for?', a: 'Human Development Index (measures life expectancy, education, and GNI per capita).' },
          { q: 'What is the Demographic Transition Model (DTM)?', a: 'A model showing how birth rates and death rates change as a country develops.' },
          { q: 'What is Fairtrade?', a: 'A movement ensuring farmers in LICs get a fair price for their goods and better working conditions.' },
          { q: 'What is microfinance?', a: 'Small loans given to people in LICs (often women) to help them start small businesses.' }
        ],
        quizzes: [
          { q: 'Which indicator of development measures the total value of goods and services produced by a country in a year?', a: 'Gross National Income (GNI)', options: ['Gross National Income (GNI)', 'Life Expectancy', 'Literacy Rate', 'Human Development Index'] },
          { q: 'What is the primary sector of the economy?', a: 'Extracting raw materials (e.g., farming, mining)', options: ['Extracting raw materials', 'Manufacturing goods', 'Providing services', 'Research and IT'] }
        ]
      }
    ]
  };
}
