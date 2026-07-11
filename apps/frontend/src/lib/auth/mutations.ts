import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  loginUser,
  registerUser,
  logoutUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  googleLogin,
} from '@/lib/api/auth';
import { queryKeys } from '@/lib/query/keys';
import { toast } from 'sonner';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, data.user);
      toast.success('Successfully logged in!');
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Registration successful. Please check your email for verification.');
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.me, null);
      queryClient.clear();
      toast.info('You have been logged out.');
      window.location.href = '/login';
    },
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.auth.me, updatedUser);
      toast.success('Profile updated successfully.');
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully.');
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Password reset email sent (if the account exists).');
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password has been successfully reset. You can now log in.');
    },
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success('Email verified successfully! You can now log in.');
    },
  });
}

export function useResendVerificationMutation() {
  return useMutation({
    mutationFn: resendVerification,
    onSuccess: () => {
      toast.success('Verification email resent successfully.');
    },
  });
}

export function useGoogleLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, data.user);
      toast.success('Successfully logged in with Google!');
    },
  });
}
