'use client';

import { getTopicsByCategory } from '../scienceData';
import MockExam from '../../components/MockExam';

export default function ScienceMockExamPage() {
  const topicsByCategory = getTopicsByCategory();
  
  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <MockExam 
        subjectData={topicsByCategory}
        accentColor="#00d4ff"
        hubPath="/gcse/science"
        backLabel="Back to Science"
        statsKey="gcse-science-stats"
      />
    </div>
  );
}
