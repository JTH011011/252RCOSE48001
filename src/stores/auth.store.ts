// src/stores/auth.store.ts

import { defineStore } from 'pinia'
import apiClient from '@/services/api.ts'

// (백엔드 API 명세서 기반) User 프로필 타입 정의
interface User {
  id: string
  email: string
  name: string
  // profile_image_url: string; (ERD 피드백 반영 시 추가)
}

export const useAuthStore = defineStore('auth', {
  // 1. 상태 (State): 토큰과 유저 정보를 localStorage에 저장하여 새로고침해도 유지
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),

  // 2. 게터 (Getters): 상태를 계산 (isLoggedIn 등)
  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  // 3. 액션 (Actions): API 호출, 상태 변경
  actions: {
    // AUTH-01: 구글/카카오 로그인
    async login(apiToken: string) {
      // 1. 백엔드 /auth/google 또는 /auth/kakao 호출 (API 명세에 맞게 수정)
      //    이 예제에서는 idToken을 보낸다고 가정합니다.
      const response = await apiClient.post('/auth/google', { idToken: apiToken })

      // 2. 백엔드로부터 JWT 토큰(accessToken)을 받음
      const { accessToken, refreshToken } = response.data
      this.token = accessToken
      localStorage.setItem('token', accessToken)
      // (refreshToken은 httpOnly 쿠키로 받는게 더 안전하지만, 스펙에 따름)
      localStorage.setItem('refreshToken', refreshToken)
      // 3. /users/me API로 사용자 정보 요청
      await this.fetchUser()
    },

    // GET /users/me
    async fetchUser() {
      if (this.token) {
        try {
          const response = await apiClient.get<User>('/users/me')
          this.user = response.data
          localStorage.setItem('user', JSON.stringify(this.user))
        } catch (error) {
          console.error('Failed to fetch user:', error)
          this.logout() // 유저 정보 가져오기 실패 시 로그아웃 처리
        }
      }
    },

    // 로그아웃
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // (페이지 이동은 router에서 처리)
    },
  },
})
