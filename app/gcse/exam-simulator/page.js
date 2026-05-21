'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExamSimulator from '../components/ExamSimulator';
import { getTopicsByCategory as getMaths } from '../maths/topicData';
import { getTopicsByCategory as getScience } from '../science/scienceData';
import { getTopicsByCategory as getCS } from '../computer-science/computerScienceData';
import { getTopicsByCategory as getHistory } from '../history/historyData';
import { getTopicsByCategory as getGeography } from '../geography/geographyData';
import { getTopicsByCategory as getEngLang } from '../english-language/englishLanguageData';
import { getTopicsByCategory as getEngLit } from '../english-literature/englishLiteratureData';
import { getTopicsByCategory as getBusiness } from '../business/businessData';

const ALL_TOPICS = [
  ...Object.values(getMaths()).flat().map(t => ({ ...t, subjectId: 'maths' })),
  ...Object.values(getScience()).flat().map(t => ({ ...t, subjectId: 'science' })),
  ...Object.values(getCS()).flat().map(t => ({ ...t, subjectId: 'computer-science' })),
  ...Object.values(getHistory()).flat().map(t => ({ ...t, subjectId: 'history' })),
  ...Object.values(getGeography()).flat().map(t => ({ ...t, subjectId: 'geography' })),
  ...Object.values(getEngLang()).flat().map(t => ({ ...t, subjectId: 'english-language' })),
  ...Object.values(getEngLit()).flat().map(t => ({ ...t, subjectId: 'english-literature' })),
  ...Object.values(getBusiness()).flat().map(t => ({ ...t, subjectId: 'business' })),
];

export default function ExamSimulatorPage() {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Generate 20 random questions on load
    const qList = [];
    const usedIndices = new Set();
    while (qList.length < 20 && usedIndices.size < ALL_TOPICS.length) {
      const idx = Math.floor(Math.random() * ALL_TOPICS.length);
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        const topic = ALL_TOPICS[idx];
        if (topic.generateQuestion) {
          const q = topic.generateQuestion('higher'); // Generate higher tier questions for exam mode
          if (q) {
            qList.push({ ...q, topicTitle: topic.title, subjectId: topic.subjectId });
          }
        }
      }
    }
    setQuestions(qList);
  }, []);

  if (questions.length === 0) return <div style={{ color: '#fff', padding: 40, textAlign: 'center' }}>Generating Exam Paper...</div>;

  return (
    <div className="page-container" style={{ minHeight: '100vh', padding: '40px 20px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginBottom: 20 }}>
          ← Back to Dashboard
        </button>
        <ExamSimulator questions={questions} />
      </div>
    </div>
  );
}
