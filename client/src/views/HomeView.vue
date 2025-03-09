<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo } from 'flowbite-vue'
import { isLoggedIn } from '@/stores/user'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()

if (isLoggedIn.value) {
  router.push('/profile/')
}
</script>

<template>
  <Navbar />

  <main>
    <TheWelcome />
  </main>
</template>
