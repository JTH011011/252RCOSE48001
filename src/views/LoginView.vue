<template>
  <div>
    <h2>SpreaDo 로그인</h2>
    <p>회의를 요약하고 팀의 생산성을 높여보세요.</p>

    <button @click="handleGoogleLogin">Google 계정으로 로그인</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function handleGoogleLogin() {
  try {
    // (여기에 실제 Google OAuth 라이브러리에서 토큰을 받아오는 로직이 들어갑니다)
    // 지금은 임시로 'fake-google-token'을 사용합니다.
    const googleApiToken = 'fake-google-token-from-gsi'

    // Pinia 스토어의 login 액션 호출
    await authStore.login(googleApiToken)

    // 로그인이 성공하면 메인 페이지('/')로 이동
    router.push('/')
  } catch (error) {
    console.error('로그인 실패:', error)
    alert('로그인에 실패했습니다.')
  }
}
</script>
