import { create } from 'zustand';

type ModalType =
  | 'detail'
  | 'turnToSignal'
  | 'emotion'
  | 'writeReason'
  | 'success'
  | 'delete'
  | null;

type ModalPayload = {
  postId?: number;
};

interface ModalState {
  activeModal: ModalType;
  payload: ModalPayload | null;

  // eslint-disable-next-line no-unused-vars
  openModal: (modal: ModalType, payload?: ModalPayload) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  payload: null,

  openModal: (modal, payload) => set({ activeModal: modal, payload: payload ?? null }),
  closeModal: () => set({ activeModal: null, payload: null }),
}));
