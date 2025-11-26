// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    // (기존 /about 경로는 삭제)
  ],
})

//
// ⭐️ 라우터 네비게이션 가드 (가장 중요)
//
router.beforeEach(async (to, from) => {
  // Pinia 스토어를 여기서 초기화합니다.
  const authStore = useAuthStore()

  const isLoggedIn = authStore.isLoggedIn

  // 1. 로그인하지 않았는데, 로그인 페이지가 아닌 곳으로 가려 할 때
  if (!isLoggedIn && to.name !== 'login') {
    // 로그인 페이지로 강제 이동
    return { name: 'login' }
  }

  // 2. 이미 로그인했는데, 로그인 페이지로 가려 할 때
  if (isLoggedIn && to.name === 'login') {
    // 메인 페이지로 강제 이동
    return { name: 'home' }
  }

  // (추가 로직)
  // 새로고침 시 Pinia 상태는 복원되지만, user 정보가 없을 수 있습니다.
  // 토큰은 있는데 유저 정보가 없다면, fetchUser를 다시 호출합니다.
  if (isLoggedIn && !authStore.user) {
    await authStore.fetchUser()
  }
})

export default router
