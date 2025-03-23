<script>
    import { goto } from '$app/navigation';
    
    let username = '';
    let password = '';

    function handleSubmit() {
        // 로그인 로직을 체크하지 않고 바로 대시보드 페이지로 이동
        console.log('로그인 시도:', { username, password });
        goto('/dashboard');
    }
</script>

<div class="flex justify-center items-center min-h-screen bg-black">
    <div class="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md border border-gray-800">
        <h1 class="text-2xl font-bold mb-6 text-center text-white">로그인</h1>
        
        <div class="space-y-4">
            <div>
                <label for="username" class="block text-sm font-medium text-gray-300 mb-1">아이디</label>
                <input 
                    id="username" 
                    type="text" 
                    bind:value={username} 
                    class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                />
            </div>
            
            <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-1">비밀번호</label>
                <input 
                    id="password" 
                    type="password" 
                    bind:value={password} 
                    class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                />
            </div>
            
            <button 
                on:click={handleSubmit}
                class="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
                로그인
            </button>
        </div>
        
        <div class="mt-4 text-center">
            <a href="#" class="text-sm text-gray-400 hover:text-white hover:underline">비밀번호를 잊으셨나요?</a>
        </div>
    </div>
</div>

<style>
    /* 필요한 추가 스타일 */
</style>
