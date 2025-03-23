import { supabase } from '$lib/api/supabase';
import type { User } from '@supabase/supabase-js';

// 현재 로그인한 사용자 정보 가져오기
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// 사용자 표시 이름 가져오기
export function getUserDisplayName(user: User | null): string {
  if (!user) return '익명';
  
  // GitHub 사용자 이름이 있는지 확인
  const userName = user.user_metadata?.user_name || 
                  user.user_metadata?.name ||
                  user.user_metadata?.preferred_username;
  
  if (userName) return userName;
  
  // 이메일이 있으면 @ 앞 부분 사용
  if (user.email) {
    const emailParts = user.email.split('@');
    return emailParts[0];
  }
  
  return '익명';
}

// 깃허브로 로그인
export async function signInWithGithub(redirectTo?: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectTo || window.location.origin
    }
  });
  
  if (error) {
    console.error('깃허브 로그인 에러:', error);
    throw error;
  }
}

// 로그아웃
export async function signOut(): Promise<boolean> {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('로그아웃 에러:', error);
    throw error;
  }
  
  return true;
} 