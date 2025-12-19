import { atom } from 'jotai';

const isTurnToSignalModalAtom = atom<boolean>(false);
const isEmotionSeletModalAtom = atom<boolean>(false);
const isWriteReasonModalAtom = atom<boolean>(false);
const isSuccessModalAtom = atom<boolean>(false);
const isDeleteModalOpenAtom = atom<boolean>(false);

export {
  isTurnToSignalModalAtom,
  isEmotionSeletModalAtom,
  isWriteReasonModalAtom,
  isSuccessModalAtom,
  isDeleteModalOpenAtom,
};
