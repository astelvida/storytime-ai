import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
  age: 0,
  name: '',
  theme: '',
  gender: '',
  setAge: (age) => set(() => ({ age })),
  setName: (name) => set(() => ({ name })),
  reset: () => set({ age: 0, name: '', theme: '', gender: '' }),
}));
