'use client';

import { getTopicsByCategory } from '../businessData';
import MockExam from '../../components/MockExam';

export default function BusinessMockExamPage() {
  const topicsByCategory = getTopicsByCategory();
  
  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <MockExam 
        subjectData={topicsByCategory}
        accentColor="#ffe600"
        hubPath="/gcse/business"
        backLabel="Back to Business"
        statsKey="gcse-business-stats"
      />
    </div>
  );
}
