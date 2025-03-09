<script lang="ts" setup>
import { ref } from 'vue'
import { trpc } from '@/trpc'
import PageForm from '@/composables/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { useErrorMessage } from '@/composables/index.ts'
import Navbar from '@/components/NavbarLogged.vue'

const router = useRouter()

const buyForm = ref({
  symbol: '',
  ammount: 0,
})

const [buyCoin, errorMessage] = useErrorMessage(async () => {
  await trpc.transactions.buyCoin.mutate(buyForm.value)
  router.push('/profile')
})
</script>

<template>
  <Navbar />
  <main>
    <PageForm heading="Buy Coin" formLabel="Buy" @submit="buyCoin">
      <template #default>
        <FwbInput
          label="Cryptocurrency symbol"
          type="text"
          v-model="buyForm.symbol"
          :required="true"
        />

        <FwbInput
          label="Ammount"
          id="ammount"
          name="ammount"
          type="number"
          step="0.0001"
          v-model="buyForm.ammount"
          :required="true"
        />

        <FwbAlert v-if="errorMessage" data-testid="errorMessage" type="danger">
          {{ errorMessage }}
        </FwbAlert>

        <div class="grid">
          <FwbButton color="default" type="submit" size="xl">Buy</FwbButton>
        </div>
      </template>
    </PageForm>
  </main>
</template>
