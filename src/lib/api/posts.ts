import { supabase } from './supabase';
import type { Post } from '../types/post';

// 포스트 목록 가져오기
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('포스트 목록 가져오기 에러:', error);
    throw error;
  }
  
  return data || [];
}

// 포스트 검색하기
export async function searchPosts(query: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('포스트 검색 에러:', error);
    throw error;
  }
  
  return data || [];
}

// 단일 포스트 가져오기
export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('포스트 가져오기 에러:', error);
    throw error;
  }
  
  return data;
}

// 포스트 생성하기
export async function createPost(post: Omit<Post, 'id' | 'created_at'>): Promise<Post> {
  const { data, error } = await supabase
    .from('post')
    .insert([post])
    .select();
  
  if (error) {
    console.error('포스트 생성 에러:', error);
    throw error;
  }
  
  return data![0];
}

// 포스트 수정하기
export async function updatePost(id: string, updates: Partial<Omit<Post, 'id' | 'created_at'>>): Promise<Post> {
  const { data, error } = await supabase
    .from('post')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('포스트 수정 에러:', error);
    throw error;
  }
  
  return data![0];
}

// 포스트 삭제하기
export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('post')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('포스트 삭제 에러:', error);
    throw error;
  }
  
  return true;
} 