import { atom } from 'jotai';

export const selectedDateTimeAtom = atom<string | null>(null);
export const selectedEmojisAtom = atom<string[]>([]);
export const retrospectTitleAtom = atom('');
export const retrospectContentAtom = atom('');
export const retrospectPhotoAtom = atom<File | null>(null);
