import type { Toast } from '$lib/types/common.ts';

let _mobileMenuOpen = $state(false);
let _toasts = $state<Toast[]>([]);

export const ui = {
  get mobileMenuOpen() { return _mobileMenuOpen; },
  get toasts() { return _toasts; },

  toggleMobileMenu() { _mobileMenuOpen = !_mobileMenuOpen; },
  closeMobileMenu() { _mobileMenuOpen = false; },

  toast(message: string, type: Toast['type'] = 'info', duration = 4000) {
    const id = Math.random().toString(36).slice(2);
    _toasts = [..._toasts, { id, message, type, duration }];
    setTimeout(() => { _toasts = _toasts.filter(t => t.id !== id); }, duration);
  },

  closeToast(id: string) {
    _toasts = _toasts.filter(t => t.id !== id);
  }
};
