import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { supabase } from './supabase';

const EDGE_FUNCTION_URL = `${PUBLIC_SUPABASE_URL}/functions/v1`;

// 인증 헤더 가져오기
async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  return headers;
}

// 포스트 목록 가져오기
export async function getPostsFromEdge(): Promise<any[]> {
  const headers = await getAuthHeaders();
  console.log('Request headers:', headers);
  
  const response = await fetch(`${EDGE_FUNCTION_URL}/posts`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Error response:', errorData);
    throw new Error(`포스트 목록을 가져오는데 실패했습니다. (${response.status})`);
  }

  return response.json();
}

// 단일 포스트 가져오기
export async function getPostFromEdge(id: string): Promise<any> {
  const headers = await getAuthHeaders();
  console.log('Request headers:', headers);
  
  const response = await fetch(`${EDGE_FUNCTION_URL}/posts/${id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Error response:', errorData);
    throw new Error(`포스트를 가져오는데 실패했습니다. (${response.status})`);
  }

  return response.json();
}

// 포스트 생성하기
export async function createPostFromEdge(post: any): Promise<any> {
  const headers = await getAuthHeaders();
  console.log('Request headers:', headers);
  console.log('Request body:', post);
  
  const response = await fetch(`${EDGE_FUNCTION_URL}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Error response:', errorData);
    throw new Error(`포스트 생성에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

// 포스트 수정하기
export async function updatePostFromEdge(id: string, updates: any): Promise<any> {
  const headers = await getAuthHeaders();
  console.log('Request headers:', headers);
  console.log('Request body:', updates);
  
  const response = await fetch(`${EDGE_FUNCTION_URL}/posts/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Error response:', errorData);
    throw new Error(`포스트 수정에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

// 포스트 삭제하기
export async function deletePostFromEdge(id: string): Promise<boolean> {
  const headers = await getAuthHeaders();
  console.log('Request headers:', headers);
  
  const response = await fetch(`${EDGE_FUNCTION_URL}/posts/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Error response:', errorData);
    throw new Error(`포스트 삭제에 실패했습니다. (${response.status})`);
  }

  return true;
} 