import { writable } from 'svelte/store';

export const searchQuery = writable('');
export const searchActive = writable(false);

export function performSearch(query: string) {
  searchQuery.set(query);
  searchActive.set(true);
}

export function clearSearch() {
  searchQuery.set('');
  searchActive.set(false);
}