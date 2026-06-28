'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { COMPANIONS } from '@/app/gcse/data/companions';

const COMPANION_EMOJIS = {
  blanche: '🐰',
  mochi: '🧸',
  pip: '🐼',
  rosette: '🐼',
  maple: '🐻',
  cosette: '🐩',
  fern: '🦌',
  soleil: '🦜',
  luna: '🐈‍⬛',
  sage: '🦉',
  prism: '🦄',
  aurora: '🦄',
  blossom: '🦄',
  iris: '👸',
  pearl: '👸',
  ember: '🦊',
  marina: '🐬',
  frost: '🐻‍❄️',
  stardust: '🦄',
  velvet: '🐰',
  celestia: '🐈',
  onyx: '🐎',
  jasper: '🐯',
  cipher: '🕊️',
  vyne: '🌿',
  prisme: '🦊',
  flora: '🌱',
  alchema: '🐰',
  volt: '🦡',
  finale_companion: '✨',
};

const COMPANION_COLORS = {
  common: { bg: '#fff0f3', border: '#854e60', glow: 'rgba(133,78,96,0.3)' },
  uncommon: { bg: '#f0f7ee', border: '#4e6b50', glow: 'rgba(78,107,80,0.3)' },
  rare: { bg: '#fffbea', border: '#7b5900', glow: 'rgba(123,89,0,0.3)' },
  boss_exclusive: { bg: 'linear-gradient(135deg, #fff0f3, #fffbea, #f0f7ee)', border: '#854e60', glow: 'rgba(133,78,96,0.5)' },
};

const ANIMATION_VARIANTS = {
  idle: {
    bob: 'floatIdle 3s ease-in-out infinite',
    blink: 'blink 4s ease-in-out infinite',
  },
  encourage: {
    bob: 'floatEncourage 0.8s ease-out',
    spin: 'spinOnce 0.8s ease-out',
    scale: 'popScale 0.6s ease-out',
  },
  celebrate: {
    bob: 'floatCelebrate 1.5s ease-out',
    spin: 'spinCelebrate 1.5s ease-out',
    sparkle: 'sparkleBurst 1.5s ease-out',
  },
};

function getCompanionEmoji(companionId) {
  return COMPANION_EMOJIS[companionId] || '🐰';
}

function getCompanionColor(companionId) {
  const companion = COMPANIONS.find(c => c.id === companionId);
  if (!companion) return COMPANION_COLORS.common;
  return COMPANION_COLORS[companion.rarity] || COMPANION_COLORS.common;
}

export function CompanionDisplay({ 
  companionId = 'blanche', 
  variant = 'default', 
  animation = 'idle',
  onAnimationComplete,
  className = '',
  style = {},
  showLabel = false,
  labelPosition = 'bottom',
}) {
  const [animState, setAnimState] = useState('idle');
  const animTimeoutRef = useRef(null);
  const emoji = getCompanionEmoji(companionId);
  const colors = getCompanionColor(companionId);
  const companion = COMPANIONS.find(c => c.id === companionId);
  const name = companion?.name || companionId;

  const sizes = {
    default: { size: 80, emojiSize: 36, labelSize: 10 },
    small: { size: 56, emojiSize: 24, labelSize: 9 },
    large: { size: 140, emojiSize: 60, labelSize: 12 },
    profile: { size: 200, emojiSize: 90, labelSize: 14 },
    corner: { size: 64, emojiSize: 28, labelSize: 9 },
    tiny: { size: 40, emojiSize: 18, labelSize: 8 },
  };

  const config = sizes[variant] || sizes.default;

  const triggerAnimation = (animType, callback) => {
    setAnimState(animType);
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    const duration = animType === 'celebrate' ? 1500 : animType === 'encourage' ? 800 : 0;
    if (duration > 0) {
      animTimeoutRef.current = setTimeout(() => {
        setAnimState('idle');
        callback?.();
      }, duration);
    }
  };

  useEffect(() => {
    if (animation !== 'idle' && animation !== animState) {
      triggerAnimation(animation, onAnimationComplete);
    }
  }, [animation]);

  const getAnimationClasses = () => {
    const base = 'companion-anim';
    const animClasses = {
      idle: 'anim-idle',
      encourage: 'anim-encourage',
      celebrate: 'anim-celebrate',
    };
    return `${base} ${animClasses[animState] || animClasses.idle}`;
  };

  const labelStyle = labelPosition === 'bottom' 
    ? { marginTop: 8, textAlign: 'center' }
    : { marginBottom: 8, textAlign: 'center' };

  return (
    <div 
      className={`${getAnimationClasses()} ${className}`}
      style={{
        display: 'flex',
        flexDirection: labelPosition === 'top' ? 'column-reverse' : 'column',
        alignItems: 'center',
        gap: 4,
        ...style,
      }}
    >
      <div
        className="companion-circle"
        style={{
          width: config.size,
          height: config.size,
          borderRadius: '50%',
          background: colors.bg,
          border: `3px solid ${colors.border}`,
          boxShadow: `0 8px 24px ${colors.glow}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onClick={() => triggerAnimation('encourage')}
      >
        <span style={{ fontSize: config.emojiSize, lineHeight: 1 }}>{emoji}</span>
        
        {animation === 'celebrate' && (
          <div className="sparkle-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,105,180,0.3) 0%, transparent 50%)',
            pointerEvents: 'none',
            animation: 'sparkleRotate 1.5s linear infinite',
          }} />
        )}
        
        {animation === 'encourage' && (
          <div className="heart-pop" style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: config.emojiSize * 0.6,
            animation: 'heartFloat 0.8s ease-out forwards',
          }}>💖</div>
        )}
      </div>
      
      {showLabel && (
        <span style={{
          ...labelStyle,
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: config.labelSize,
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: colors.border,
          background: '#ffffff',
          border: `1px solid ${colors.border}`,
          borderRadius: '9999px',
          padding: '3px 10px',
          whiteSpace: 'nowrap',
        }}>
          {name.toUpperCase()}
        </span>
      )}
      
      <style jsx>{`
        .companion-anim {
          transition: opacity 0.2s;
        }
        
        .anim-idle .companion-circle {
          animation: floatIdle 3s ease-in-out infinite;
        }
        
        .anim-encourage .companion-circle {
          animation: floatEncourage 0.8s ease-out, popScale 0.6s ease-out;
        }
        
        .anim-celebrate .companion-circle {
          animation: floatCelebrate 1.5s ease-out, spinCelebrate 1.5s ease-out;
        }
        
        @keyframes floatIdle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        
        @keyframes floatEncourage {
          0% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-10px) scale(1.05) rotate(-3deg); }
          50% { transform: translateY(-5px) scale(1.1) rotate(3deg); }
          75% { transform: translateY(-8px) scale(1.05) rotate(-2deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }
        
        @keyframes floatCelebrate {
          0% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-15px) rotate(-5deg); }
          40% { transform: translateY(-8px) rotate(5deg); }
          60% { transform: translateY(-12px) rotate(-3deg); }
          80% { transform: translateY(-5px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes popScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        
        @keyframes spinOnce {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spinCelebrate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }
        
        @keyframes sparkleRotate {
          0% { transform: rotate(0deg); opacity: 0.5; }
          100% { transform: rotate(360deg); opacity: 1; }
        }
        
        @keyframes sparkleBurst {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        
        @keyframes heartFloat {
          0% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-40px) scale(1.5); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        
        .companion-circle:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 12px 32px rgba(133,78,96,0.4) !important;
        }
      `}</style>
    </div>
  );
}

export function CompanionSelector({ 
  companions, 
  selectedId, 
  onSelect, 
  variant = 'default',
  showPrice = false,
  ownedIds = [],
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
      {companions.map(comp => {
        const isOwned = ownedIds.includes(comp.id);
        const isSelected = selectedId === comp.id;
        const colors = getCompanionColor(comp.id);
        
        return (
          <div 
            key={comp.id}
            onClick={() => !showPrice && onSelect?.(comp.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: showPrice ? 'default' : 'pointer',
              opacity: isOwned || !showPrice ? 1 : 0.5,
              position: 'relative',
            }}
          >
            <CompanionDisplay 
              companionId={comp.id}
              variant={variant}
              animation="idle"
              style={{
                border: isSelected ? `3px solid ${colors.border}` : 'none',
                boxShadow: isSelected ? `0 0 0 4px ${colors.border}40` : 'none',
                borderRadius: '12px',
                padding: isSelected ? 4 : 0,
              }}
            />
            {showPrice && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: isOwned ? '#827475' : colors.border,
              }}>
                {isOwned ? (
                  <span>✓ Owned</span>
                ) : comp.price ? (
                  <>
                    <span>🌸</span>
                    <span>{comp.price}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelect?.(comp.id); }}
                      style={{
                        marginLeft: 8,
                        background: colors.border,
                        color: '#fff',
                        border: 'none',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: "'Nunito Sans', sans-serif",
                        cursor: 'pointer',
                      }}
                    >
                      Buy
                    </button>
                  </>
                ) : (
                  <span style={{ color: '#827475' }}>Boss Exclusive</span>
                )}
              </div>
            )}
            {!showPrice && (
              <span style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isSelected ? colors.border : '#827475',
                background: isSelected ? colors.bg : '#faf3e9',
                border: `1px solid ${isSelected ? colors.border : '#e8e2d8'}`,
                borderRadius: '9999px',
                padding: '3px 10px',
              }}>
                {comp.name.toUpperCase()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function CompanionPreview({ companionId, size = 120, animation = 'idle' }) {
  const emoji = getCompanionEmoji(companionId);
  const colors = getCompanionColor(companionId);
  const companion = COMPANIONS.find(c => c.id === companionId);
  
  return (
    <div style={{ 
      width: size, 
      height: size, 
      borderRadius: '50%', 
      background: colors.bg,
      border: `3px solid ${colors.border}`,
      boxShadow: `0 8px 24px ${colors.glow}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <span style={{ fontSize: size * 0.45, lineHeight: 1 }}>{emoji}</span>
      {companion && (
        <span style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: colors.border,
          background: '#ffffff',
          border: `1px solid ${colors.border}`,
          borderRadius: '9999px',
          padding: '3px 12px',
        }}>
          {companion.name.toUpperCase()}
        </span>
      )}
      <style jsx>{`
        @keyframes floatIdle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes floatEncourage {
          0% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-10px) scale(1.05) rotate(-3deg); }
          50% { transform: translateY(-5px) scale(1.1) rotate(3deg); }
          75% { transform: translateY(-8px) scale(1.05) rotate(-2deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }
        @keyframes floatCelebrate {
          0% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-15px) rotate(-5deg); }
          40% { transform: translateY(-8px) rotate(5deg); }
          60% { transform: translateY(-12px) rotate(-3deg); }
          80% { transform: translateY(-5px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}