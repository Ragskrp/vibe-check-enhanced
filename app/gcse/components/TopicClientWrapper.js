'use client';

import { useEffect, useState } from 'react';
import TopicGame from './TopicGame';

// Mapping of subjects to their data loaders
const DATA_LOADERS = {
  'maths': () => import('../maths/topicData'),
  'science': () => import('../science/scienceData'),
  'computer-science': () => import('../computer-science/computerScienceData'),
  'business': () => import('../business/businessData'),
  'english-language': () => import('../english-language/englishLanguageData'),
  'english-literature': () => import('../english-literature/englishLiteratureData'),
  'history': () => import('../history/historyData'),
  'geography': () => import('../geography/geographyData'),
};

export default function TopicClientWrapper({ subject, topicSlug, initialConfig, ...rest }) {
  const [config, setConfig] = useState(initialConfig || null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (config) return; // Skip loading if we already have initialConfig
    const loadData = async () => {
      try {
        const loader = DATA_LOADERS[subject];
        if (!loader) {
          setError(true);
          return;
        }

        const module = await loader();
        // Most modules have getTopicBySlug or TOPICS[slug]
        let topicData = null;
        if (module.getTopicBySlug) {
          topicData = module.getTopicBySlug(topicSlug);
        } else if (module.TOPICS && module.TOPICS[topicSlug]) {
          topicData = { ...module.TOPICS[topicSlug], slug: topicSlug };
        } else if (module.getTopicsByCategory) {
            const categories = module.getTopicsByCategory();
            topicData = Object.values(categories).flat().find(t => t.slug === topicSlug);
        }

        if (!topicData) {
          setError(true);
        } else {
          setConfig(topicData);
        }
      } catch (err) {
        console.error('Failed to load topic data:', err);
        setError(true);
      }
    };

    loadData();
  }, [subject, topicSlug]);

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#000' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>Topic Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>We couldn't load the requested revision module.</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#000' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#00e5a0', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Loading module...</p>
        </div>
        <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return <TopicGame config={config} subjectSlug={subject} {...rest} />;
}
