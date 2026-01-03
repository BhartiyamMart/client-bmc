import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthStep = 'phone' | 'otp' | 'profile';

interface UserProfile {
  phoneNumber: string;
  email?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  profilePicture?: string | null;
  gender?: string | null;
  rewardCoins?: number;
  totalOrders?: number;
  totalSpent?: string;
  preferredPaymentMethod?: string;
}

interface IAuthStore {
  token: string | null;
  userProfile: UserProfile | null;
  isAuthModalOpen: boolean;
  currentStep: AuthStep;
  protectedRoute: string | null;
  setToken: (token: string | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  setCurrentStep: (step: AuthStep) => void;
  setProtectedRoute: (route: string | null) => void;
  resetAuthFlow: () => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: null,
      userProfile: null,
      isAuthModalOpen: false,
      currentStep: 'phone',
      protectedRoute: null,
      setToken: (token: string | null) => set({ token }),
      setUserProfile: (profile: UserProfile | null) => set({ userProfile: profile }),
      setAuthModalOpen: (open: boolean) => set({ isAuthModalOpen: open }),
      setCurrentStep: (step: AuthStep) => set({ currentStep: step }),
      setProtectedRoute: (route: string | null) => set({ protectedRoute: route }),
      resetAuthFlow: () => set({ currentStep: 'phone', isAuthModalOpen: false }),
      logout: () =>
        set({
          token: null,
          userProfile: null,
          currentStep: 'phone',
          isAuthModalOpen: false,
          protectedRoute: null,
        }),
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        token: state.token,
        userProfile: state.userProfile,
      }),
    }
  )
);
