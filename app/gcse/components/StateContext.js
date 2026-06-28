'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext(null);

import { COMPANIONS, getOnboardingCompanions } from '@/app/gcse/data/companions';

export const THEMES = {
  princess_scholar: {
    id: 'princess_scholar',
    name: 'Princess Scholar',
    bg: '#fff8f0',
    gridColor: '#d4c2c480',
    primary: '#854e60',
    secondary: '#7a545a',
    accent: '#7b5900',
    cardBg: '#ffffff',
    borderColor: '#e8e2d8'
  },
  gothic_horror: {
    id: 'gothic_horror',
    name: 'Midnight Shadow',
    bg: '#0F0B18',
    gridColor: 'rgba(255,255,255,0.03)',
    primary: '#E8B4C8',
    secondary: '#a8607a',
    accent: '#F5C870',
    cardBg: 'rgba(30, 20, 45, 0.85)',
    borderColor: 'rgba(200,180,212,0.2)'
  }
};

const INITIAL_COMPANIONS = ['blanche', 'pip', 'sage'].map(id => ({
  id,
  acquiredAt: Date.now(),
  acquiredBy: 'onboarding_gift',
  equipped: id === 'blanche',
}));

export function StateProvider({ children }) {
  const [xp, setXp] = useState(250);
  const [coins, setCoins] = useState(1450);
  const [completed, setCompleted] = useState([]);
  const [inventory, setInventory] = useState(['gilded_quill']);
  const [companions, setCompanions] = useState(INITIAL_COMPANIONS);
  const [equippedTheme, setEquippedTheme] = useState('princess_scholar');

  // Load from localstorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fleurir_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.xp !== undefined) setXp(parsed.xp);
        if (parsed.coins !== undefined) setCoins(parsed.coins);
        if (parsed.completed !== undefined) setCompleted(parsed.completed);
        if (parsed.inventory !== undefined) setInventory(parsed.inventory);
        if (parsed.companions !== undefined) setCompanions(parsed.companions);
        if (parsed.equippedTheme !== undefined) setEquippedTheme(parsed.equippedTheme);
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
  }, []);

  // Save to localstorage on change
  const saveState = (updated) => {
    try {
      localStorage.setItem('fleurir_state', JSON.stringify({
        xp: updated.xp ?? xp,
        coins: updated.coins ?? coins,
        completed: updated.completed ?? completed,
        inventory: updated.inventory ?? inventory,
        companions: updated.companions ?? companions,
        equippedTheme: updated.equippedTheme ?? equippedTheme
      }));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  };

  const addXp = (amount) => {
    setXp(prev => {
      const next = prev + amount;
      saveState({ xp: next });
      return next;
    });
  };

  const addCoins = (amount) => {
    setCoins(prev => {
      const next = prev + amount;
      saveState({ coins: next });
      return next;
    });
  };

  const completeTopic = (topicId) => {
    setCompleted(prev => {
      if (prev.includes(topicId)) return prev;
      const next = [...prev, topicId];
      saveState({ completed: next });
      return next;
    });
  };

  const buyItem = (itemId, cost) => {
    if (coins < cost) return false;
    setCoins(prev => {
      const next = prev - cost;
      setInventory(inv => {
        const nextInv = [...inv, itemId];
        saveState({ coins: next, inventory: nextInv });
        return nextInv;
      });
      return next;
    });
    return true;
  };

  const buyCompanion = (companionId, cost) => {
    if (coins < cost) return false;
    const companion = COMPANIONS.find(c => c.id === companionId);
    if (!companion) return false;
    
    setCoins(prev => {
      const next = prev - cost;
      setCompanions(comp => {
        if (comp.some(c => c.id === companionId)) return comp;
        const nextComp = [...comp, {
          id: companionId,
          acquiredAt: Date.now(),
          acquiredBy: 'purchase',
          equipped: false,
        }];
        saveState({ coins: next, companions: nextComp });
        return nextComp;
      });
      return next;
    });
    return true;
  };

  const equipCompanion = (companionId) => {
    setCompanions(prev => {
      const next = prev.map(c => ({
        ...c,
        equipped: c.id === companionId,
      }));
      saveState({ companions: next });
      return next;
    });
  };

  const unlockBossCompanion = (companionId, bossBattleId) => {
    setCompanions(prev => {
      if (prev.some(c => c.id === companionId)) return prev;
      const next = [...prev, {
        id: companionId,
        acquiredAt: Date.now(),
        acquiredBy: 'boss_battle',
        bossBattleId,
        equipped: false,
      }];
      saveState({ companions: next });
      return next;
    });
  };

  const selectTheme = (themeId) => {
    setEquippedTheme(themeId);
    saveState({ equippedTheme: themeId });
  };

  const activeTheme = THEMES[equippedTheme] || THEMES.princess_scholar;
  const equippedCompanion = companions.find(c => c.equipped) || companions[0];
  const equippedCompanionData = COMPANIONS.find(c => c.id === equippedCompanion?.id) || COMPANIONS[0];
  const ownedCompanionIds = companions.map(c => c.id);
  const ownedCompanions = COMPANIONS.filter(c => ownedCompanionIds.includes(c.id));
  const availableCompanions = COMPANIONS.filter(c => 
    c.unlockSource === 'shop' && !ownedCompanionIds.includes(c.id)
  );

  return (
    <StateContext.Provider value={{
      xp,
      coins,
      completed,
      inventory,
      companions,
      equippedCompanion,
      equippedCompanionData,
      ownedCompanions,
      availableCompanions,
      equippedTheme,
      activeTheme,
      onboardingCompanions: getOnboardingCompanions(),
      addXp,
      addCoins,
      completeTopic,
      buyItem,
      buyCompanion,
      equipCompanion,
      unlockBossCompanion,
      selectTheme
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useFleurir() {
  return useContext(StateContext);
}