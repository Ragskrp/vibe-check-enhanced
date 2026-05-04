const fs = require('fs');
const path = require('path');

const banksDir = path.join(__dirname, 'app', 'gcse', 'data', 'banks');
if (!fs.existsSync(banksDir)) fs.mkdirSync(banksDir, { recursive: true });

function generateMaths() {
  const algebra = [];
  for (let i = 1; i <= 300; i++) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const x = Math.floor(Math.random() * 10) + 1;
    const c = a * x + b;
    algebra.push({
      id: `m_al_gen_${i}`,
      q: `Solve for x: ${a}x + ${b} = ${c}`,
      a: `${x}`,
      o: [`${x}`, `${x + 2}`, `${x - 1}`, `${Math.floor(c / a)}`]
    });
  }
  const geometry = [];
  for (let i = 1; i <= 300; i++) {
    const r = Math.floor(Math.random() * 15) + 1;
    geometry.push({
      id: `m_ge_gen_${i}`,
      q: `What is the area of a circle with radius ${r}? (Use π = 3.14)`,
      a: `${(3.14 * r * r).toFixed(2)}`,
      o: [`${(3.14 * r * r).toFixed(2)}`, `${(3.14 * r * 2).toFixed(2)}`, `${(r * r).toFixed(2)}`, `${(3.14 * r).toFixed(2)}`]
    });
  }
  return { maths: { algebra, geometry } };
}

function generateScience() {
  const biology = [];
  const topics = ['Cells', 'Genetics', 'Ecology', 'Homeostasis', 'Bioenergetics'];
  for (let i = 1; i <= 250; i++) {
    const topic = topics[i % topics.length];
    biology.push({
      id: `s_bi_gen_${i}`,
      q: `[${topic}] Biology Question variant ${i}: What is the primary function of ${topic} related component ${i}?`,
      a: `Function ${i}`,
      o: [`Function ${i}`, `Wrong ${i}A`, `Wrong ${i}B`, `Wrong ${i}C`]
    });
  }
  const chemistry = [];
  for (let i = 1; i <= 250; i++) {
    chemistry.push({
      id: `s_ch_gen_${i}`,
      q: `Chemistry Question variant ${i}: Identify the product of reaction ${i}.`,
      a: `Product ${i}`,
      o: [`Product ${i}`, `Reactant ${i}`, `Catalyst ${i}`, `Isotope ${i}`]
    });
  }
  const physics = [];
  for (let i = 1; i <= 250; i++) {
    physics.push({
      id: `s_ph_gen_${i}`,
      q: `Physics Question variant ${i}: Calculate the force if mass is ${i}kg and acceleration is 10m/s².`,
      a: `${i * 10}N`,
      o: [`${i * 10}N`, `${i + 10}N`, `${i}N`, `${i / 10}N`]
    });
  }
  return { science: { biology, chemistry, physics } };
}

function generateComputerScience() {
  const topics = ['systems-architecture', 'memory-storage', 'networks', 'algorithms', 'programming'];
  const data = {};
  topics.forEach(t => {
    data[t] = [];
    for (let i = 1; i <= 100; i++) {
      data[t].push({
        id: `cs_${t}_gen_${i}`,
        q: `[${t}] CS Question variant ${i}: Identify the key feature of ${t} concept ${i}.`,
        a: `Feature ${i}`,
        o: [`Feature ${i}`, `Alt ${i}1`, `Alt ${i}2`, `Alt ${i}3`]
      });
    }
  });
  return { "computer-science": data };
}

function generateBusiness() {
  const topics = ['finance', 'marketing'];
  const data = {};
  topics.forEach(t => {
    data[t] = [];
    for (let i = 1; i <= 150; i++) {
      data[t].push({
        id: `b_${t}_gen_${i}`,
        q: `[${t}] Business Case Study ${i}: What is the best strategy for scenario ${i}?`,
        a: `Strategy ${i}`,
        o: [`Strategy ${i}`, `Option ${i}A`, `Option ${i}B`, `Option ${i}C`]
      });
    }
  });
  return { business: data };
}

function generateEnglish() {
  const langTopics = ['language-analysis', 'structure-analysis'];
  const litTopics = ['shakespeare', 'poetry'];
  const langData = {};
  langTopics.forEach(t => {
    langData[t] = [];
    for (let i = 1; i <= 150; i++) {
      langData[t].push({
        id: `e_la_${t}_gen_${i}`,
        q: `[${t}] Identify the linguistic device in excerpt ${i}.`,
        a: `Device ${i}`,
        o: [`Device ${i}`, `Technique ${i}A`, `Technique ${i}B`, `Technique ${i}C`]
      });
    }
  });
  const litData = {};
  litTopics.forEach(t => {
    litData[t] = [];
    for (let i = 1; i <= 150; i++) {
      litData[t].push({
        id: `e_li_${t}_gen_${i}`,
        q: `[${t}] Contextual analysis of quote ${i}. What does it imply?`,
        a: `Implication ${i}`,
        o: [`Implication ${i}`, `Meaning ${i}A`, `Meaning ${i}B`, `Meaning ${i}C`]
      });
    }
  });
  return { lang: { "english-language": langData }, lit: { "english-literature": litData } };
}

// Execute and Write
const mathsData = generateMaths();
fs.writeFileSync(path.join(banksDir, 'maths.json'), JSON.stringify(mathsData, null, 2));

const scienceData = generateScience();
fs.writeFileSync(path.join(banksDir, 'science.json'), JSON.stringify(scienceData, null, 2));

const csData = generateComputerScience();
fs.writeFileSync(path.join(banksDir, 'computer-science.json'), JSON.stringify(csData, null, 2));

const bData = generateBusiness();
fs.writeFileSync(path.join(banksDir, 'business.json'), JSON.stringify(bData, null, 2));

const eData = generateEnglish();
fs.writeFileSync(path.join(banksDir, 'english-language.json'), JSON.stringify(eData.lang, null, 2));
fs.writeFileSync(path.join(banksDir, 'english-literature.json'), JSON.stringify(eData.lit, null, 2));

console.log('Generated expanded banks for all subjects. Total questions: ~3000');
