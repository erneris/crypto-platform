<script lang="ts" setup>
import { login } from '@/stores/user'
import { ref } from 'vue'
import PageForm from '@/composables/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { useErrorMessage } from '@/composables/index.ts'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()

const userForm = ref({
  email: '',
  password: '',
})

const [submitLogin, errorMessage] = useErrorMessage(async () => {
  await login(userForm.value)
  router.push('/')
})
</script>

<template>
  <Navbar />
  <main>
    <PageForm heading="Log in to your account" formLabel="Login" @submit="submitLogin">
      <template #default>
        <FwbInput
          label="Email"
          type="email"
          autocomplete="username"
          v-model="userForm.email"
          :required="true"
        />

        <FwbInput
          label="Password"
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          v-model="userForm.password"
          :required="true"
        />

        <FwbAlert v-if="errorMessage" data-testid="errorMessage" type="danger">
          {{ errorMessage }}
        </FwbAlert>

        <div class="grid">
          <FwbButton color="default" type="submit" size="xl">Log in</FwbButton>
        </div>
      </template>

      <template #footer>
        <FwbAlert class="bg-transparent text-center">
          Not a member?
          <RouterLink
            to="/signup"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </RouterLink>
          <br />
          or go
          <RouterLink to="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            back home
          </RouterLink>
        </FwbAlert>
      </template>
    </PageForm>
  </main>
</template>
