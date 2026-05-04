'use client';

import { getTopicsByCategory } from '../computerScienceData';
import MockExam from '../../components/MockExam';

export default function CSMockExamPage() {
  const topicsByCategory = getTopicsByCategory();
  
  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <MockExam 
        subjectData={topicsByCategory}
        accentColor="#ff2d78"
        hubPath="/gcse/computer-science"
        backLabel="Back to Computer Science"
        statsKey="gcse-compsci-stats"
      />
    </div>
  );
}
