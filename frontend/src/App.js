import React, { useState } from 'react';

const API = 'http://localhost:5001';

const styles = {
  body: {
    margin: 0,
    minHeight: '100vh',
    background: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', sans-serif",
    color: '#fff',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: '48px 40px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: 16,
    boxShadow: '0 0 80px rgba(220,50,50,0.08)',
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 28,
    fontWeight: 800,
    color: '#fff',
    marginBottom: 8,
    letterSpacing: '-0.5px',
  },
  logoAccent: { color: '#e03535' },
  subtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 36,
    fontWeight: 400,
  },
  tabs: {
    display: 'flex',
    gap: 4,
    marginBottom: 32,
    background: '#0a0a0a',
    padding: 4,
    borderRadius: 10,
  },
  tab: (active) => ({
    flex: 1,
    padding: '10px 0',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    background: active ? '#e03535' : 'transparent',
    color: active ? '#fff' : '#555',
    transition: 'all 0.2s',
  }),
  inputGroup: { marginBottom: 16 },
  label: {
    display: 'block',
    fontSize: 11,
    fontWeight: 500,
    color: '#555',
    marginBottom: 6,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #222',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    padding: '13px',
    background: '#e03535',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    marginTop: 8,
  },
  error: {
    background: 'rgba(220,50,50,0.1)',
    border: '1px solid rgba(220,50,50,0.3)',
    color: '#e03535',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 16,
  },
  success: {
    background: 'rgba(50,200,100,0.1)',
    border: '1px solid rgba(50,200,100,0.3)',
    color: '#32c864',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 16,
  },
  dashboard: {
    width: '100%',
    maxWidth: 700,
    padding: '48px 40px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: 16,
  },
  dashHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutBtn: {
    padding: '8px 18px',
    background: 'transparent',
    border: '1px solid #333',
    color: '#888',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: {
    textAlign: 'left',
    padding: '10px 14px',
    color: '#555',
    fontWeight: 500,
    borderBottom: '1px solid #1e1e1e',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  td: { padding: '12px 14px', borderBottom: '1px solid #1a1a1a', color: '#ccc' },
  badge: {
    display: 'inline-block',
    padding: '2px 10px',
    background: 'rgba(220,50,50,0.15)',
    color: '#e03535',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  },
};

function AuthPage({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError(''); setSuccess(''); setLoading(true);
    const endpoint = tab === 'login' ? '/login' : '/register';
    const body = tab === 'login'
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };
    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else if (tab === 'register') {
        setSuccess('Account created! You can now log in.');
        setTab('login');
        setForm({ name: '', email: '', password: '' });
      } else {
        onLogin(data.token, data.user);
      }
    } catch {
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.logo}>auth<span style={styles.logoAccent}>.</span>app</div>
      <div style={styles.subtitle}>React · Node.js · PostgreSQL</div>
      <div style={styles.tabs}>
        <button style={styles.tab(tab === 'login')} onClick={() => { setTab('login'); setError(''); setSuccess(''); }}>Login</button>
        <button style={styles.tab(tab === 'register')} onClick={() => { setTab('register'); setError(''); setSuccess(''); }}>Register</button>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      {tab === 'register' && (
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input style={styles.input} name="name" value={form.name} onChange={handle} placeholder="John Doe" />
        </div>
      )}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Email</label>
        <input style={styles.input} name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Password</label>
        <input style={styles.input} name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" />
      </div>
      <button style={styles.btn} onClick={submit} disabled={loading}>
        {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
      </button>
    </div>
  );
}

function Dashboard({ user, token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
      setLoaded(true);
    } catch {
      alert('Failed to load users');
    }
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.dashHeader}>
        <div>
          <div style={styles.logo}>Welcome, <span style={styles.logoAccent}>{user.name}</span></div>
          <div style={styles.subtitle}>{user.email}</div>
        </div>
        <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
      </div>
      <button style={{ ...styles.btn, marginBottom: 24 }} onClick={loadUsers}>
        {loaded ? 'Refresh Users' : 'Load All Users'}
      </button>
      {loaded && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={styles.td}>#{u.id}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}><span style={styles.badge}>active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState(null);
  return (
    <div style={styles.body}>
      {!auth
        ? <AuthPage onLogin={(token, user) => setAuth({ token, user })} />
        : <Dashboard token={auth.token} user={auth.user} onLogout={() => setAuth(null)} />
      }
    </div>
  );
}
