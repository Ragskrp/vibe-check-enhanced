'use client';

import { useState } from 'react';

export default function BinaryConverter() {
  const [binary, setBinary] = useState('00000000');

  const toggleBit = (idx) => {
    const bits = binary.split('');
    bits[idx] = bits[idx] === '0' ? '1' : '0';
    setBinary(bits.join(''));
  };

  const denary = parseInt(binary, 2);
  const hex = denary.toString(16).toUpperCase().padStart(2, '0');

  return (
    <div style={{
      padding: '32px',
      background: 'rgba(0,212,255,0.03)',
      borderRadius: '24px',
      border: '1px solid rgba(0,212,255,0.1)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
        Interactive Binary Lab
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
        {binary.split('').map((bit, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
              {Math.pow(2, 7 - i)}
            </div>
            <button
              onClick={() => toggleBit(i)}
              style={{
                width: 'clamp(30px, 6vw, 48px)',
                height: 'clamp(40px, 8vw, 64px)',
                borderRadius: 12,
                background: bit === '1' ? '#00d4ff' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${bit === '1' ? '#fff' : 'rgba(255,255,255,0.1)'}`,
                color: bit === '1' ? '#000' : '#fff',
                fontSize: 20,
                fontWeight: 900,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: bit === '1' ? '0 0 20px rgba(0,212,255,0.4)' : 'none',
                transform: bit === '1' ? 'translateY(-2px)' : 'none'
              }}
            >
              {bit}
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>DENARY</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>{denary}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>HEX</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#00d4ff' }}>{hex}</div>
        </div>
      </div>
    </div>
  );
}
