<template>
  <main>
    <h2>환영합니다, {{ authStore.currentUser?.name }}님!</h2>
    <p>이제 그룹을 생성하고 회의를 시작할 수 있습니다.</p>

    <button>+ 새 그룹 생성하기</button>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
</script>
