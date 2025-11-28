import type { EventType } from '../types/EventType.js';

const icons: Record<EventType, string> = {
  success: '✓',
  error: '✖',
  warning: '⚠',
  info: 'ℹ',
};

const showSnackbar = (message: string, type: EventType) => {
  const snackbar = document.querySelector('#snackbar') as HTMLDivElement | null;
  if (!snackbar) {
    console.error('Snackbar HTML element not found');
    return;
  }

  // Reset classes
  snackbar.className = '';

  // Add base + type + show
  snackbar.classList.add('show', type);

  // Insert icon + text
  snackbar.innerHTML = `<span class="icon">${icons[type]}</span><span>${message}</span>`;

  // Auto-hide after 3s
  setTimeout(() => {
    snackbar.classList.remove('show', type);
  }, 3000);
};

export const warnSnackbar = (message: string) =>
  showSnackbar(message, 'warning');
export const errorSnackbar = (message: string) =>
  showSnackbar(message, 'error');
export const successSnackbar = (message: string) =>
  showSnackbar(message, 'success');
export const infoSnackbar = (message: string) => showSnackbar(message, 'info');
