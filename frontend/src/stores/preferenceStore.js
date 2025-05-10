import { writable } from 'svelte/store';

const STORAGE_KEY = 'preferences';

const defaultPrefs = {
  currency: 'DKK',
  defaultSort: 'recent',
  itemsPerPage: 20,
  gridView: true,
  preferredTags: [],
  betaFeatures: false,
};

function loadPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultPrefs, ...JSON.parse(stored) } : defaultPrefs;
  } catch {
    return defaultPrefs;
  }
}

export const preferences = writable(loadPreferences());

preferences.subscribe(prefs => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
});
