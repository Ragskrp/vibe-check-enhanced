'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useFleurir } from '../components/StateContext';
import { COMPANIONS, getShopCompanions, RARITY_BORDERS } from '../data/companions';
import { CompanionDisplay, CompanionSelector } from '../components/CompanionDisplay';

const SHOP_ITEMS = [
  {
    id: 'rose_gold_frame',
    name: 'Rose Gold Frame',
    category: 'customise',
    tag: 'DECOR',
    desc: 'An elegant vintage frame for your finest achievements.',
    cost: 150,
    img: '/gcse/bg-library.png'
  },
  {
    id: 'wisteria_wall',
    name: 'Wisteria Vine Wall',
    category: 'customise',
    tag: 'BACKGROUND',
    desc: 'Transform your study space with trailing magical blossoms.',
    cost: 1200,
    img: '/gcse/bg-fractions.png',
    badge: 'RARE'
  },
  {
    id: 'gilded_quill',
    name: 'Gilded Quill & Ink',
    category: 'customise',
    tag: 'STUDY AID',
    desc: 'Grants a 5% bonus to focus streaks during literature study.',
    cost: 250,
    img: '/gcse/bg-ratio.png'
  },
  {
    id: 'gothic_horror_theme',
    name: 'Midnight Shadow Theme',
    category: 'customise',
    tag: 'THEME',
    desc: 'Unlock the Atmospheric Brutalism Gothic Horror theme layout.',
    cost: 600,
    img: '/gcse/bg-indices.png',
    badge: 'UNUSUAL'
  }
];

export default function BloomShop() {
  const state = useFleurir();
  const [tab, setTab] = useState('customise'); // customise | companions | french_corner
  const [celebrateTrigger, setCelebrateTrigger] = useState(0);

  if (!state) return null;

  const { coins, inventory, activeTheme, equippedCompanionData, buyItem, buyCompanion, ownedCompanions } = state;
  const ownedCompanionIds = ownedCompanions.map(c => c.id);
  const shopCompanions = getShopCompanions();

  const customiseItems = SHOP_ITEMS.filter(item => item.category === 'customise');

  return (
    <>
      <style>{`
        .shop-container {
          max-width: 1040px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .shop-banner {
          background: #fff5f6;
          border: 1px solid #fce8eb;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(133,78,96,0.03);
        }
        .shop-banner-left {
          max-width: 500px;
        }
        .shop-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 700;
          color: #2A2035;
          margin: 0 0 8px;
        }
        .shop-subtitle {
          font-size: 14px;
          line-height: 1.6;
          color: #6a585a;
          margin: 0;
        }
        .companion-avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .companion-circle {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          overflow: hidden;
          border: 2.5px solid #854e60;
          box-shadow: 0 4px 16px rgba(133,78,96,0.15);
        }
        .companion-active-label {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #854e60;
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 9999px;
          padding: 3px 12px;
          text-transform: uppercase;
        }
        .shop-tabs {
          display: flex;
          gap: 32px;
          border-bottom: 1px solid #e8e2d8;
          margin-bottom: 32px;
        }
        .shop-tab {
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #827475;
          padding: 12px 4px;
          cursor: pointer;
          position: relative;
        }
        .shop-tab.active {
          color: #854e60;
          font-weight: 600;
        }
        .shop-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #854e60;
        }
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        .shop-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 16px rgba(42,32,53,0.03);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .shop-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(42,32,53,0.08);
        }
        .shop-card-badge {
          position: absolute;
          top: -8px;
          right: 16px;
          background: #ffc83b;
          border-radius: 9999px;
          padding: 2px 10px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          color: #7b5900;
          letter-spacing: 0.05em;
        }
        .shop-card-image {
          position: relative;
          width: 100%;
          height: 140px;
          border-radius: 10px;
          overflow: hidden;
          background: #faf3e9;
          margin-bottom: 12px;
        }
        .shop-card-tag {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #ffffff;
          background: #504445;
          padding: 2px 8px;
          border-radius: 4px;
          align-self: flex-start;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .shop-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #2A2035;
          margin: 0 0 6px;
        }
        .shop-card-desc {
          font-size: 12px;
          line-height: 1.5;
          color: #6a585a;
          margin: 0 0 16px;
          flex: 1;
        }
        .shop-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #f4ede3;
          padding-top: 12px;
        }
        .shop-card-cost {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #504445;
        }
        .shop-btn {
          background: #854e60;
          color: #fff8f0;
          border: none;
          padding: 6px 16px;
          border-radius: 9999px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .shop-btn:hover { background: #6e3f50; }
        .shop-btn.owned {
          background: #faf3e9;
          color: #827475;
          border: 1px solid #e8e2d8;
          cursor: default;
        }
        .companion-shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 20px;
        }
        .companion-shop-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          position: relative;
          box-shadow: 0 4px 16px rgba(42,32,53,0.03);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .companion-shop-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(42,32,53,0.08);
        }
        .companion-rarity-badge {
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
        .rarity-common { background: #fff0f3; color: #854e60; border: 1px solid #d4c2c4; }
        .rarity-uncommon { background: #f0f7ee; color: #4e6b50; border: 1px solid #9db58a; }
        .rarity-rare { background: #fffbea; color: #7b5900; border: 1px solid #f0c060; }
        .companion-name {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 700;
          color: #2A2035;
          margin: 4px 0 2px;
          text-align: center;
        }
        .companion-desc {
          font-size: 11px;
          line-height: 1.4;
          color: #6a585a;
          margin: 0 0 8px;
          text-align: center;
        }
        .companion-price {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #854e60;
          margin-bottom: 8px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #2A2035;
          margin: 0;
        }
        .coins-display {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #504445;
          background: #faf3e9;
          border: 1px solid #e8e2d8;
          border-radius: 9999px;
          padding: 6px 16px;
        }
      `}</style>
      <div className="shop-container">
        {/* Banner */}
        <div className="shop-banner">
          <div className="shop-banner-left">
            <h1 className="shop-title">The Bloom Shop</h1>
            <p className="shop-subtitle">
              Curate your elegant academic sanctuary. Spend your hard-earned petals on exquisite companions, decor, and refined study aids.
            </p>
          </div>
          <div className="companion-avatar-wrap">
            <CompanionDisplay 
              companionId={equippedCompanionData.id}
              variant="large"
              animation={celebrateTrigger % 2 === 1 ? 'celebrate' : 'idle'}
              showLabel
              labelPosition="bottom"
            />
            <button 
              onClick={() => setCelebrateTrigger(t => t + 1)}
              style={{
                background: '#854e60',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: 8,
              }}
            >
              ✨ Celebrate
            </button>
          </div>
        </div>

        {/* Coins display */}
        <div className="coins-display" style={{ marginBottom: 24, justifyContent: 'flex-end' }}>
          <span>🌸</span>
          <span>{coins.toLocaleString()}</span>
        </div>

        {/* Tabs */}
        <div className="shop-tabs">
          <button className={`shop-tab ${tab === 'customise' ? 'active' : ''}`} onClick={() => setTab('customise')}>Customise</button>
          <button className={`shop-tab ${tab === 'companions' ? 'active' : ''}`} onClick={() => setTab('companions')}>Companions</button>
          <button className={`shop-tab ${tab === 'french_corner' ? 'active' : ''}`} onClick={() => setTab('french_corner')}>French Corner</button>
        </div>

        {tab === 'customise' && (
          <>
            <div className="section-header">
              <h2 className="section-title">Decor & Themes</h2>
            </div>
            <div className="shop-grid">
              {customiseItems.map(item => {
                const isOwned = inventory.includes(item.id);
                return (
                  <div key={item.id} className="shop-card">
                    {item.badge && <span className="shop-card-badge">{item.badge}</span>}
                    <div className="shop-card-image">
                      <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <span className="shop-card-tag" style={{ background: item.tag === 'THEME' ? '#7b5900' : '#854e60' }}>{item.tag}</span>
                    <h3 className="shop-card-title">{item.name}</h3>
                    <p className="shop-card-desc">{item.desc}</p>
                    <div className="shop-card-footer">
                      <div className="shop-card-cost">
                        <span>🌸</span>
                        <span>{item.cost}</span>
                      </div>
                      {isOwned ? (
                        <button className="shop-btn owned" disabled>✓ Owned</button>
                      ) : (
                        <button
                          className="shop-btn"
                          onClick={() => {
                            if (coins >= item.cost) {
                              buyItem(item.id, item.cost);
                              alert(`Success! You have purchased ${item.name}!`);
                            } else {
                              alert(`Insufficient petals! You need ${item.cost - coins} more petals.`);
                            }
                          }}
                        >
                          Acquire
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === 'companions' && (
          <>
            <div className="section-header">
              <h2 className="section-title">Companions</h2>
              <div className="coins-display">
                <span>🌸</span>
                <span>{coins.toLocaleString()}</span>
              </div>
            </div>
            <CompanionSelector
              companions={shopCompanions}
              selectedId={equippedCompanionData.id}
              onSelect={(id) => buyCompanion(id, shopCompanions.find(c => c.id === id)?.price || 0)}
              variant="default"
              showPrice={true}
              ownedIds={ownedCompanionIds}
            />
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#827475', fontFamily: "'DM Sans', sans-serif" }}>
              Owned companions appear in your Profile where you can equip them as your active companion.
            </p>
          </>
        )}

        {tab === 'french_corner' && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🇫🇷</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#2A2035', margin: '0 0 12px' }}>French Corner</h2>
            <p style={{ fontSize: 15, color: '#504445', margin: '0 0 24px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              Unlock beautiful French motivational phrases by reaching milestones in your studies. 
              Each phrase arrives with Cosette's Parisian charm.
            </p>
            <div style={{ background: '#faf3e9', border: '1px solid #e8e2d8', borderRadius: 16, padding: '24px', maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: '#854e60', fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>COMING SOON</p>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#504445', lineHeight: 2 }}>
                <li>Unlock phrases at streak milestones (Day 7, 14, 30...)</li>
                <li>Earn phrases for Boss Battle victories</li>
                <li>Collect all 30 phrases for the <em>Je Parle Français</em> badge</li>
                <li>View your collection in the Profile page</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </>
  );
}