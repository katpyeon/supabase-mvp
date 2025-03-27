import type { Post } from '../types/post';
import * as edgeFunctions from './edge-functions';

// 포스트 목록 가져오기
export async function getPosts(): Promise<Post[]> {
  try {
    return await edgeFunctions.getPostsFromEdge();
  } catch (error) {
    console.error('포스트 목록 가져오기 에러:', error);
    throw error;
  }
}

// 포스트 검색하기
export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const posts = await edgeFunctions.getPostsFromEdge();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('포스트 검색 에러:', error);
    throw error;
  }
}

// 단일 포스트 가져오기
export async function getPost(id: string): Promise<Post | null> {
  try {
    return await edgeFunctions.getPostFromEdge(id);
  } catch (error) {
    console.error('포스트 가져오기 에러:', error);
    throw error;
  }
}

// 포스트 생성하기
export async function createPost(post: Omit<Post, 'id' | 'created_at'>): Promise<Post> {
  try {
    return await edgeFunctions.createPostFromEdge(post);
  } catch (error) {
    console.error('포스트 생성 에러:', error);
    throw error;
  }
}

// 포스트 수정하기
export async function updatePost(id: string, updates: Partial<Omit<Post, 'id' | 'created_at'>>): Promise<Post> {
  try {
    return await edgeFunctions.updatePostFromEdge(id, updates);
  } catch (error) {
    console.error('포스트 수정 에러:', error);
    throw error;
  }
}

// 포스트 삭제하기
export async function deletePost(id: string): Promise<boolean> {
  try {
    return await edgeFunctions.deletePostFromEdge(id);
  } catch (error) {
    console.error('포스트 삭제 에러:', error);
    throw error;
  }
} 