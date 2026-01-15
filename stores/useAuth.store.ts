import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ==================== TYPES ====================

export type AuthStep = 'phone' | 'otp' | 'profile';

export interface IUserProfile {
  name: string;
  photo?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  referralCode?: string | null;
}

export interface AuthState {
  // Auth data
  token: string | null;
  phone: string | null;
  userProfile: IUserProfile | null;
  isAuthenticated: boolean;

  // Auth modal state
  isAuthModalOpen: boolean;
  currentStep: AuthStep;
  protectedRoute: string | null;

  // Loading & Error states
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  // Auth actions
  setToken: (token: string | null) => void;
  setPhone: (phone: string | null) => void;
  setUserProfile: (profile: IUserProfile | null) => void;
  updateUserProfile: (updates: Partial<IUserProfile>) => void;
  

  // Modal actions
  setAuthModalOpen: (open: boolean) => void;
  setCurrentStep: (step: AuthStep) => void;

  // Protected route
  setProtectedRoute: (route: string | null) => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Reset actions
  resetAuthFlow: () => void;
  logout: () => void;
  clearProfile: () => void;
}

export type AuthStore = AuthState & AuthActions;

// ==================== INITIAL STATE ====================

const initialState: AuthState = {
  token: null,
  phone: null,
  userProfile: null,
  isAuthenticated: false,
  isAuthModalOpen: false,
  currentStep: 'phone',
  protectedRoute: null,
  isLoading: false,
  error: null,
};

// ==================== STORE ====================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // ========== Auth Actions ==========
      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),
      setPhone: (phone) =>
        set({
          phone,
        }),

      setUserProfile: (profile) =>
        set({
          userProfile: profile,
        }),

      updateUserProfile: (updates) =>
        set((state) => ({
          userProfile: state.userProfile ? { ...state.userProfile, ...updates } : null,
        })),

      // ========== Modal Actions ==========
      setAuthModalOpen: (open) =>
        set({
          isAuthModalOpen: open,
        }),

      setCurrentStep: (step) =>
        set({
          currentStep: step,
        }),

      // ========== Protected Route ==========
      setProtectedRoute: (route) =>
        set({
          protectedRoute: route,
        }),

      // ========== State Management ==========
      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      setError: (error) =>
        set({
          error,
        }),

      // ========== Reset Actions ==========
      resetAuthFlow: () =>
        set({
          currentStep: 'phone',
          isAuthModalOpen: false,
          error: null,
        }),

      logout: () =>
        set({
          ...initialState,
        }),

      clearProfile: () =>
        set({
          userProfile: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        phone: state.phone,

        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
        isAuthModalOpen: state.isAuthModalOpen,
        currentStep: state.currentStep,
      }),
    }
  )
);

// ==================== SELECTORS ====================

export const useToken = () => useAuthStore((state) => state.token);
export const usePhone = () => useAuthStore((state) => state.phone);
export const useUserProfile = () => useAuthStore((state) => state.userProfile);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthModalState = () =>
  useAuthStore((state) => ({
    isOpen: state.isAuthModalOpen,
    currentStep: state.currentStep,
  }));

export const useUserName = () =>
  useAuthStore((state) => {
    const profile = state.userProfile;
    return profile?.name || 'Guest';
  });

export const useUserImage = () =>
  useAuthStore((state) => {
    const profile = state.userProfile;
    return profile?.photo || '/images/avatar.webp';
  });
