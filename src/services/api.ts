// src/services/api.ts

import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

// Spring Boot 백엔드 주소 (포트 8080으로 가정)
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // (백엔드 주소에 맞게 수정)
  headers: {
    'Content-Type': 'application/json',
  },
})

//
// ⭐️ 요청(Request) 인터셉터
//
apiClient.interceptors.request.use(
  (config) => {
    // Pinia 스토어에서 토큰을 가져옵니다.
    // (컴포넌트 밖에서 Pinia를 사용해야 함)
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) {
      // 명세서대로 'Authorization: Bearer <JWT>' 헤더를 추가합니다.
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
