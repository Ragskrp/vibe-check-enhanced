'use client';

import { getTopicsByCategory } from '../topicData';
import MockExam from '../../components/MockExam';

export default function MathsMockExamPage() {
  const topicsByCategory = getTopicsByCategory();
  
  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <MockExam 
        subjectData={topicsByCategory}
        accentColor="#00e5a0"
        hubPath="/gcse/maths"
        backLabel="Back to Maths"
        statsKey="gcse-maths-stats"
      />
    </div>
  );
}
