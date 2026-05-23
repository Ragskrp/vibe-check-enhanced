import { useAuth } from '../../lib/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function UserProfileCard() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      borderRadius: 12,
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      backdropFilter: 'blur(12px)'
    }}>
      <img
        src={user.photoURL || '/placeholder-avatar.png'}
        alt="Avatar"
        style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #00d4ff' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{user.displayName || 'Student'}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{user.email || ''}</div>
      </div>
      <button
        onClick={logout}
        title="Sign out"
        style={{
          background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          padding: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
        <LogOut size={16} color="rgba(255,255,255,0.5)" />
      </button>
    </div>
  );
}
