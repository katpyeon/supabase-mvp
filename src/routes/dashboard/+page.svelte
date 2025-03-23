<script>
    import { goto } from '$app/navigation';
    
    function handleLogout() {
        // 로그아웃 시 로그인 페이지로 이동
        goto('/');
    }
</script>

<div class="min-h-screen bg-black text-white">
    <!-- 헤더 -->
    <header class="bg-gray-900 border-b border-gray-800 shadow-lg">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <span class="text-xl font-bold">대시보드</span>
            </div>
            
            <nav class="hidden md:flex space-x-6">
                <a href="/dashboard" class="text-white hover:text-gray-300">홈</a>
                <a href="#" class="text-gray-400 hover:text-white">프로필</a>
                <a href="#" class="text-gray-400 hover:text-white">설정</a>
            </nav>
            
            <div class="flex items-center">
                <button 
                    on:click={handleLogout}
                    class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md border border-gray-700 transition-colors"
                >
                    로그아웃
                </button>
            </div>
        </div>
    </header>
    
    <!-- 메인 콘텐츠 -->
    <main class="container mx-auto px-4 py-8">
        <div class="bg-gray-900 rounded-lg border border-gray-800 p-6 shadow-md">
            <h1 class="text-2xl font-bold mb-4">환영합니다!</h1>
            <p class="text-gray-300">대시보드 페이지입니다. 여기에 실제 콘텐츠가 추가될 예정입니다.</p>
        </div>
    </main>
</div>

<style>
    /* 필요한 스타일 */
</style> 