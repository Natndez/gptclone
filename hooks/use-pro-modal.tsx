// Custom hook for managing pro modal state

// Pro modal design
import { create } from "zustand";

// Interface for props pro modal needs
interface useProModalStore {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
};

// Gives us global state controls for the pro modal
export const useProModal = create<useProModalStore>((set) => ({
    isOpen: false, // Not open by default
    onOpen: () => set({ isOpen: true }), // On open set isOpen to true (pretty self explanatory)
    onClose: () => set({ isOpen: false }), // The converse of onOpen
}));