import { create } from 'zustand';

type ModalType =
  | 'detail'
  | 'turnToSignal'
  | 'emotion'
  | 'writeReason'
  | 'success'
  | 'delete'
  | null;

interface ModalState {
  activeModal: ModalType;

  // eslint-disable-next-line no-unused-vars
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,

  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
