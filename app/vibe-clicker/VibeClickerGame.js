'use client';

import { useState, useEffect } from 'react';

const UPGRADES = [
  { id: 'cursor', name: 'Auto-Clicker', baseCost: 10, cps: 1, icon: '🖱️', desc: 'Clicks automatically once per second' },
  { id: 'grandma', name: 'Vibe Grandmaster', baseCost: 100, cps: 5, icon: '🧙‍♂️', desc: 'A wise master of the vibe' },
  { id: 'factory', name: 'Vibe Factory', baseCost: 1000, cps: 50, icon: '🏭', desc: 'Industrial scale vibing' },
  { id: 'mine', name: 'Vibe Mine', baseCost: 10000, cps: 250, icon: '⛏️', desc: 'Mining deep into the vibe core' },
  { id: 'temple', name: 'Vibe Temple', baseCost: 100000, cps: 1500, icon: '🏛️', desc: 'Sacred grounds of infinite vibes' }
];

export default function VibeClickerGame() {
  const [vibes, setVibes] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [inventory, setInventory] = useState({
    cursor: 0, grandma: 0, factory: 0, mine: 0, temple: 0
  });

  const [clickParticles, setClickParticles] = useState([]);

  const getCost = (upgrade) => {
    return Math.floor(upgrade.baseCost * Math.pow(1.15, inventory[upgrade.id]));
  };

  const getCPS = () => {
    let total = 0;
    UPGRADES.forEach(u => {
      total += u.cps * inventory[u.id];
    });
    return total;
  };

  // Main game loop (1 second intervals for CPS)
  useEffect(() => {
    const cps = getCPS();
    if (cps === 0) return;
    
    // We update state 10 times a second for smoother visual counter
    const interval = setInterval(() => {
      setVibes(prev => prev + (cps / 10));
    }, 100);
    
    return () => clearInterval(interval);
  }, [inventory]);

  const handleMainClick = (e) => {
    // Add 1 vibe plus 1% of CPS per click for scaling
    const clickPower = 1 + (getCPS() * 0.01);
    setVibes(prev => prev + clickPower);
    setTotalClicks(prev => prev + 1);

    // Generate floating particle
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const id = Date.now() + Math.random();
    setClickParticles(prev => [...prev, { id, x, y, value: clickPower }]);
    
    setTimeout(() => {
      setClickParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const buyUpgrade = (upgrade) => {
    const cost = getCost(upgrade);
    if (vibes >= cost) {
      setVibes(prev => prev - cost);
      setInventory(prev => ({
        ...prev,
        [upgrade.id]: prev[upgrade.id] + 1
      }));
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1.5fr)',
      gap: '24px',
      maxWidth: '1000px',
      margin: '0 auto',
      background: '#111',
      padding: '24px',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      minHeight: '600px'
    }} className="clicker-layout">
      
      {/* Left panel Container (Main Clicker) */}
      <div style={{
        background: '#1a1a2e',
        borderRadius: '16px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Vibes</div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#fff', textShadow: '0 0 20px rgba(0,212,255,0.5)' }}>
            {Math.floor(vibes).toLocaleString()}
          </div>
          <div style={{ fontSize: '16px', color: '#00d4ff', marginTop: '8px' }}>
            {getCPS().toLocaleString(undefined, { maximumFractionDigits: 1 })} vibe/sec
          </div>
        </div>

        <button 
          onClick={handleMainClick}
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #ff2d78, #1a0b2e)',
            border: '10px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 50px rgba(255,45,120,0.4), inset 0 0 40px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            position: 'relative',
            transition: 'transform 0.05s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ✨
          
          {/* Particles */}
          {clickParticles.map(p => (
            <div 
              key={p.id}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                color: '#fff',
                fontSize: '24px',
                fontWeight: 'bold',
                pointerEvents: 'none',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                animation: 'floatUp 1s ease-out forwards'
              }}
            >
              +{p.value < 2 ? 1 : Math.floor(p.value)}
            </div>
          ))}
        </button>

        <div style={{ marginTop: 'auto', paddingTop: '40px', color: '#555', fontSize: '12px' }}>
          Total Clicks: {totalClicks.toLocaleString()}
        </div>
      </div>

      {/* Right panel (Upgrades Store) */}
      <div style={{
        background: '#1a1a2e',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflowY: 'auto',
        maxHeight: '600px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '16px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>
          Upgrades 🛒
        </h2>
        
        {UPGRADES.map(u => {
          const cost = getCost(u);
          const canAfford = vibes >= cost;
          
          return (
            <button
              key={u.id}
              onClick={() => buyUpgrade(u)}
              disabled={!canAfford}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: canAfford ? 'rgba(0,212,255,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${canAfford ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '12px',
                cursor: canAfford ? 'pointer' : 'not-allowed',
                opacity: canAfford ? 1 : 0.6,
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={e => {
                if (canAfford) e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
              }}
              onMouseOut={e => {
                if (canAfford) e.currentTarget.style.background = 'rgba(0,212,255,0.05)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '32px', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '12px' }}>
                  {u.icon}
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>{u.name}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>{u.desc}</div>
                  <div style={{ fontSize: '14px', color: '#00ff94', marginTop: '4px', fontWeight: 600 }}>
                    Cost: {cost.toLocaleString()} vibes
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#444' }}>
                {inventory[u.id]}
              </div>
            </button>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
        }
        @media (max-width: 768px) {
          .clicker-layout {
             grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
