'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function SortingLab() {
  const [array, setArray] = useState([8, 3, 1, 7, 4, 6, 2, 5]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);

  const reset = () => {
    setArray([8, 3, 1, 7, 4, 6, 2, 5].sort(() => Math.random() - 0.5));
    setIsSorting(false);
    setComparing([]);
    setSorted([]);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;
    let newSorted = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await new Promise(r => setTimeout(r, 400));
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
      newSorted.push(n - i - 1);
      setSorted([...newSorted]);
    }
    setComparing([]);
    setIsSorting(false);
  };

  return (
    <div style={{
      padding: '32px',
      background: 'rgba(0,255,148,0.03)',
      borderRadius: '24px',
      border: '1px solid rgba(0,255,148,0.1)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#00ff94', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
        Bubble Sort Visualizer
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        gap: 8, 
        height: 120, 
        marginBottom: 32,
        padding: '0 20px'
      }}>
        {array.map((val, i) => (
          <div key={i} style={{
            width: 24,
            height: val * 12,
            background: comparing.includes(i) ? '#ff2d78' : sorted.includes(i) ? '#00ff94' : 'rgba(255,255,255,0.1)',
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: -20, width: '100%', fontSize: 10, fontWeight: 800, color: '#fff' }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button onClick={reset} disabled={isSorting} className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
          <RotateCcw size={16} /> Reset
        </button>
        <button onClick={bubbleSort} disabled={isSorting} className="btn-primary" style={{ background: '#00ff94', color: '#000' }}>
          <Play size={16} /> Start Bubble Sort
        </button>
      </div>
    </div>
  );
}
