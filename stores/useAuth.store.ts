import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ==================== TYPES ====================

export type AuthStep = 'phone' | 'otp' | 'profile';

export interface UserProfile {
  // From Auth API
  phoneNumber: string;
  email?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  profilePicture?: string | null;
  gender?: string | null;

  // From User Profile API
  imageUrl?: string | null;
  dob?: string | null;

  // Additional fields
  rewardCoins?: number;
  totalOrders?: number;
  totalSpent?: string;
  preferredPaymentMethod?: string;
}

export interface AuthState {
  // Auth data
  token: string | null;
  userProfile: UserProfile | null;
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
  setUserProfile: (profile: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

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
    (set, get) => ({
      // Initial state
      ...initialState,

      // ========== Auth Actions ==========
      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
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
          // Keep only non-sensitive states if needed
        }),

      clearProfile: () =>
        set({
          userProfile: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist critical data
      partialize: (state) => ({
        token: state.token,
        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ==================== SELECTORS ====================

// Atomic selectors for better performance
export const useToken = () => useAuthStore((state) => state.token);
export const useUserProfile = () => useAuthStore((state) => state.userProfile);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthModalState = () =>
  useAuthStore((state) => ({
    isOpen: state.isAuthModalOpen,
    currentStep: state.currentStep,
  }));

// Computed selectors
export const useUserName = () =>
  useAuthStore((state) => {
    const profile = state.userProfile;
    if (!profile) return 'Guest';

    const firstName = profile.firstName || '';
    const lastName = profile.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'User';
  });

export const useUserImage = () =>
  useAuthStore((state) => {
    const profile = state.userProfile;
    return profile?.imageUrl || profile?.profilePicture || '/images/avatar.webp';
  });
