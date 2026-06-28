'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useFleurir } from '../components/StateContext';
import { CompanionDisplay, CompanionSelector } from '../components/CompanionDisplay';

const SHOP_ITEMS_MAP = {
  rose_gold_frame: { name: 'Rose Gold Frame', type: 'Decor' },
  blanche_spring: { name: "Blanche's Spring Ensemble", type: 'Wardrobe' },
  wisteria_wall: { name: 'Wisteria Vine Wall', type: 'Background' },
  gilded_quill: { name: 'Gilded Quill & Ink', type: 'Study Aid' },
  gothic_horror_theme: { name: 'Midnight Shadow Theme', type: 'Theme' }
};

export default function ProfilePage() {
  const state = useFleurir();
  const [celebrateTrigger, setCelebrateTrigger] = useState(0);

  if (!state) return null;

  const { 
    xp, 
    coins, 
    completed, 
    inventory, 
    equippedTheme, 
    equippedCompanionData,
    ownedCompanions,
    selectTheme,
    equipCompanion,
  } = state;

  const level = Math.floor(xp / 100) + 1;
  const progressToNext = xp % 100;
  const ownedCompanionIds = ownedCompanions.map(c => c.id);

  return (
    <>
      <style>{`
        .profile-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .profile-header-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          gap: 28px;
          align-items: flex-start;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(42,32,53,0.04);
          flex-wrap: wrap;
        }
        .companion-main-display {
          flex-shrink: 0;
        }
        .profile-info {
          flex: 1;
          min-width: 240px;
        }
        .profile-name {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #2A2035;
          margin: 0 0 8px;
        }
        .xp-bar-container {
          background: #e8e2d8;
          height: 8px;
          border-radius: 99px;
          margin: 12px 0 6px;
          overflow: hidden;
          max-width: 320px;
        }
        .xp-bar-fill {
          height: 100%;
          background: #854e60;
          border-radius: 99px;
          transition: width 0.4s ease;
        }
        .xp-sub {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 11px;
          color: #827475;
          font-weight: 700;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(42,32,53,0.03);
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #854e60;
          margin: 0 0 4px;
        }
        .stat-label {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #827475;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #2A2035;
          margin-bottom: 16px;
          border-bottom: 1.5px solid #e8e2d8;
          padding-bottom: 8px;
        }
        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .inventory-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .inventory-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: 0 2px 10px rgba(42,32,53,0.02);
        }
        .inventory-tag {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          color: #827475;
          text-transform: uppercase;
        }
        .inventory-name {
          font-weight: 600;
          font-size: 14px;
          color: #1e1b16;
        }
        .theme-select-grid {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .theme-btn {
          background: #ffffff;
          border: 1.5px solid #e8e2d8;
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #504445;
          transition: all 0.2s;
        }
        .theme-btn.active {
          border-color: #854e60;
          background: #fff0f3;
          color: #854e60;
        }
        .companion-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
          margin-bottom: 8px;
        }
        .companion-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .companion-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(42,32,53,0.08);
        }
        .companion-card.equipped {
          border-color: #854e60;
          box-shadow: 0 0 0 3px rgba(133,78,96,0.15);
        }
        .companion-card.locked {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .companion-badge {
          position: absolute;
          top: -8px;
          right: 16px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 9999px;
          letter-spacing: 0.05em;
        }
        .badge-common { background: #fff0f3; color: #854e60; border: 1px solid #d4c2c4; }
        .badge-uncommon { background: #f0f7ee; color: #4e6b50; border: 1px solid #9db58a; }
        .badge-rare { background: #fffbea; color: #7b5900; border: 1px solid #f0c060; }
        .badge-boss_exclusive { background: linear-gradient(135deg, #fff0f3, #fffbea); color: #854e60; border: 1px solid #854e60; }
        .equip-indicator {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: #854e60;
          color: #fff;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 10px;
          border-radius: 9999px;
          white-space: nowrap;
        }
      `}</style>
      <div className="profile-container">
        
        {/* Header with Companion */}
        <div className="profile-header-card">
          <div className="companion-main-display">
            <CompanionDisplay 
              companionId={equippedCompanionData.id}
              variant="profile"
              animation={celebrateTrigger % 2 === 1 ? 'celebrate' : 'idle'}
              showLabel
              labelPosition="bottom"
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">Scholar {equippedCompanionData.name}</h1>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#504445' }}>{equippedCompanionData.desc}</p>
            <div className="xp-bar-container">
              <div className="xp-bar-fill" style={{ width: `${progressToNext}%` }} />
            </div>
            <span className="xp-sub">LEVEL {level} · {progressToNext}/100 XP to next level</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-value">{coins}</h3>
            <span className="stat-label">Petal Coins</span>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">{completed.length}</h3>
            <span className="stat-label">Topics Restored</span>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">{xp}</h3>
            <span className="stat-label">Total XP</span>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">{ownedCompanions.length}</h3>
            <span className="stat-label">Companions Owned</span>
          </div>
        </div>

        {/* Active Companion */}
        <div style={{ marginBottom: 32 }}>
          <div className="section-title-row">
            <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Active Companion</h2>
            <button 
              onClick={() => setCelebrateTrigger(t => t + 1)}
              style={{
                background: '#854e60',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ✨ Celebrate
            </button>
          </div>
        </div>

        {/* Companion Collection */}
        <h2 className="section-title">Companion Collection</h2>
        <div className="companion-grid">
          {ownedCompanions.map(comp => {
            const isEquipped = equippedCompanionData.id === comp.id;
            const rarityClass = `badge-${comp.rarity}`;
            return (
              <div 
                key={comp.id}
                className={`companion-card ${isEquipped ? 'equipped' : ''}`}
                onClick={() => !isEquipped && equipCompanion(comp.id)}
              >
                <span className={`companion-badge ${rarityClass}`}>{comp.rarity.toUpperCase()}</span>
                <CompanionDisplay 
                  companionId={comp.id}
                  variant="default"
                  animation={isEquipped ? 'idle' : 'idle'}
                  style={{ pointerEvents: 'none' }}
                />
                {isEquipped && <span className="equip-indicator">ACTIVE</span>}
              </div>
            );
          })}
        </div>

        {/* Inventory */}
        <h2 className="section-title">My Sanctuary Inventory</h2>
        <div className="inventory-list">
          {inventory.map(itemId => {
            const detail = SHOP_ITEMS_MAP[itemId] || { name: itemId, type: 'Collectable' };
            return (
              <div key={itemId} className="inventory-card">
                <span className="inventory-tag">{detail.type}</span>
                <span className="inventory-name">{detail.name}</span>
              </div>
            );
          })}
        </div>

        {/* Themes Selection */}
        <h2 className="section-title">Sanctuary Aesthetics (Themes)</h2>
        <div className="theme-select-grid">
          <button 
            className={`theme-btn ${equippedTheme === 'princess_scholar' ? 'active' : ''}`}
            onClick={() => selectTheme('princess_scholar')}
          >
            🌸 Princess Scholar (Light)
          </button>
          
          {inventory.includes('gothic_horror_theme') ? (
            <button 
              className={`theme-btn ${equippedTheme === 'gothic_horror' ? 'active' : ''}`}
              onClick={() => selectTheme('gothic_horror')}
            >
              🌌 Midnight Shadow (Dark)
            </button>
          ) : (
            <button className="theme-btn" style={{ opacity: 0.5, cursor: 'default' }} disabled>
              🔒 Midnight Shadow (Locked in Shop)
            </button>
          )}
        </div>

      </div>
    </>
  );
}