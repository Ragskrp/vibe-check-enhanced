'use client';

import { useState } from 'react';
import { Zap } from 'lucide-react';

export default function LogicGateLab() {
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);
  const [gate, setGate] = useState('AND');

  const gates = {
    AND: (a, b) => a && b,
    OR: (a, b) => a || b,
    XOR: (a, b) => a !== b,
    NOT: (a) => !a,
  };

  const output = gate === 'NOT' ? gates.NOT(inA) : gates[gate](inA, inB);

  return (
    <div style={{
      padding: '32px',
      background: 'rgba(255,45,120,0.03)',
      borderRadius: '24px',
      border: '1px solid rgba(255,45,120,0.1)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#ff2d78', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
        Logic Gate Simulator
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
        {/* INPUT A */}
        <div onClick={() => setInA(inA ? 0 : 1)} style={{
          width: 50, height: 50, borderRadius: 12, background: inA ? '#ff2d78' : '#111',
          border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 18, fontWeight: 900, color: inA ? '#fff' : '#444'
        }}>
          {inA}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <select 
            value={gate} 
            onChange={(e) => setGate(e.target.value)}
            style={{
              background: '#000', color: '#ff2d78', border: '1px solid #ff2d78', borderRadius: 8,
              padding: '8px 12px', fontWeight: 800, fontSize: 14, outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
            <option value="XOR">XOR</option>
            <option value="NOT">NOT</option>
          </select>
          {gate !== 'NOT' && (
             <div onClick={() => setInB(inB ? 0 : 1)} style={{
                width: 50, height: 50, borderRadius: 12, background: inB ? '#ff2d78' : '#111',
                border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 18, fontWeight: 900, color: inB ? '#fff' : '#444'
              }}>
                {inB}
              </div>
          )}
        </div>

        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.2)' }}>→</div>

        {/* OUTPUT */}
        <div style={{
          width: 70, height: 70, borderRadius: '50%', background: output ? '#ff2d78' : '#111',
          border: `2px solid ${output ? '#fff' : 'rgba(255,255,255,0.05)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: output ? '0 0 30px rgba(255,45,120,0.5)' : 'none',
          transition: 'all 0.2s'
        }}>
          <Zap size={24} color={output ? '#fff' : '#222'} fill={output ? '#fff' : 'transparent'} />
        </div>
      </div>

      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>
        {gate === 'NOT' ? `NOT ${inA} = ${output ? 1 : 0}` : `${inA} ${gate} ${inB} = ${output ? 1 : 0}`}
      </div>
    </div>
  );
}
