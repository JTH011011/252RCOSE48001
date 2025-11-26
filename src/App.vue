<template>
  <header v-if="authStore.isLoggedIn">
    <div class="wrapper">
      <h1>SpreaDo</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
      <div class="user-profile">
        <span>{{ authStore.currentUser?.name }}님</span>
        <button @click="handleLogout">로그아웃</button>
      </div>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  // 로그아웃 시 로그인 페이지로 이동
  router.push('/login')
}
</script>

<style scoped>
/* (기존 예제 CSS는 지우고 간단하게만 남깁니다) */
header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav {
  display: flex;
  gap: 1rem;
}
main {
  padding: 2rem;
}
</style>
