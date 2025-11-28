import type { SnackbarType } from '$lib/types/SnackbarType';
import { writable } from 'svelte/store';

interface Snackbar {
  message: string;
  type: SnackbarType;
  id: number;
}

export const snackbars = writable<Snackbar[]>([]);

let idCounter = 0;

function showSnackbar(message: string, type: SnackbarType) {
  const id = idCounter++;
  const snackbar: Snackbar = { message, type, id };

  snackbars.update(bars => [...bars, snackbar]);

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    snackbars.update(bars => bars.filter(bar => bar.id !== id));
  }, 4000);
}

export function infoSnackbar(message: string) {
  showSnackbar(message, 'info');
}

export function warnSnackbar(message: string) {
  showSnackbar(message, 'warning');
}

export function errorSnackbar(message: string) {
  showSnackbar(message, 'error');
}

export function successSnackbar(message: string) {
  showSnackbar(message, 'success');
}