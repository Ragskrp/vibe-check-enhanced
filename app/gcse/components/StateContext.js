'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext(null);

export const AVATARS = {
  blanche: { id: 'blanche', name: 'Blanche', img: '/gcse/arith-portrait.png', desc: 'The quiet scholar of the rose gardens.' },
  clara: { id: 'clara', name: 'Clara', img: '/gcse/arith.png', desc: 'Adventurous archivist of the Tower.' }
};

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

export function StateProvider({ children }) {
  const [xp, setXp] = useState(250);
  const [coins, setCoins] = useState(1450);
  const [completed, setCompleted] = useState([]);
  const [inventory, setInventory] = useState(['gilded_quill']);
  const [equippedAvatar, setEquippedAvatar] = useState('blanche');
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
        if (parsed.equippedAvatar !== undefined) setEquippedAvatar(parsed.equippedAvatar);
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
        equippedAvatar: updated.equippedAvatar ?? equippedAvatar,
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

  const selectAvatar = (avatarId) => {
    setEquippedAvatar(avatarId);
    saveState({ equippedAvatar: avatarId });
  };

  const selectTheme = (themeId) => {
    setEquippedTheme(themeId);
    saveState({ equippedTheme: themeId });
  };

  const activeTheme = THEMES[equippedTheme] || THEMES.princess_scholar;

  return (
    <StateContext.Provider value={{
      xp,
      coins,
      completed,
      inventory,
      equippedAvatar,
      equippedTheme,
      activeTheme,
      addXp,
      addCoins,
      completeTopic,
      buyItem,
      selectAvatar,
      selectTheme
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useFleurir() {
  return useContext(StateContext);
}
