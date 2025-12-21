import { atom } from 'jotai';

export const selectedDateTimeAtom = atom<string | null>(null);
export const selectedEmojisAtom = atom<string[]>([]);
