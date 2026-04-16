import type { User } from '$lib/types/auth.ts';

let _user = $state<User | null>(null);
let _token = $state<string | null>(null);

export const auth = {
  get user() { return _user; },
  get token() { return _token; },
  get isLoggedIn() { return _user !== null; },
  get role() { return _user?.role ?? null; },
  get name() { return _user?.name ?? ''; },

  login(user: User, token: string) {
    _user = user;
    _token = token;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('rs_user', JSON.stringify(user));
      localStorage.setItem('rs_token', token);
    }
  },

  logout() {
    _user = null;
    _token = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('rs_user');
      localStorage.removeItem('rs_token');
    }
  },

  hydrate() {
    if (typeof localStorage === 'undefined') return;
    const stored = localStorage.getItem('rs_user');
    const token = localStorage.getItem('rs_token');
    if (stored && token) {
      try {
        _user = JSON.parse(stored) as User;
        _token = token;
      } catch { /* ignore */ }
    }
  }
};
