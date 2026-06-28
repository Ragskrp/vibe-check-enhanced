'use client';

import React from 'react';
import Image from 'next/image';
import { useFleurir, THEMES } from '../components/StateContext';

const SHOP_ITEMS_MAP = {
  rose_gold_frame: { name: 'Rose Gold Frame', type: 'Decor' },
  blanche_spring: { name: 'Blanche\'s Spring Ensemble', type: 'Wardrobe' },
  wisteria_wall: { name: 'Wisteria Vine Wall', type: 'Background' },
  gilded_quill: { name: 'Gilded Quill & Ink', type: 'Study Aid' },
  gothic_horror_theme: { name: 'Midnight Shadow Theme', type: 'Theme' }
};

export default function ProfilePage() {
  const state = useFleurir();

  if (!state) return null;

  const { xp, coins, completed, inventory, equippedAvatar, equippedTheme, selectTheme, selectAvatar } = state;

  const level = Math.floor(xp / 100) + 1;
  const progressToNext = xp % 100;

  return (
    <>
      <style>{`
        .profile-container {
          max-width: 900px;
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
          align-items: center;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(42,32,53,0.04);
          flex-wrap: wrap;
        }
        .profile-pic-circle {
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #854e60;
          box-shadow: 0 4px 16px rgba(133,78,96,0.15);
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
      `}</style>
      <div className="profile-container">
        
        {/* Header */}
        <div className="profile-header-card">
          <div className="profile-pic-circle">
            <Image src="/gcse/arith-portrait.png" alt="Blanche" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">Scholar Blanche</h1>
            <p style={{ margin: 0, fontSize: 14, color: '#504445' }}>GCSE Study Realm companion</p>
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
