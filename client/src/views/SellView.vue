<script lang="ts" setup>
import { ref } from 'vue'
import { trpc } from '@/trpc'
import PageForm from '@/composables/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { useErrorMessage } from '@/composables/index.ts'
import Navbar from '@/components/NavbarLogged.vue'

const router = useRouter()

const sellForm = ref({
  symbol: '',
  ammount: 0,
})

const [sellCoin, errorMessage] = useErrorMessage(async () => {
  await trpc.transactions.sellCoin.mutate(sellForm.value)
  router.push('/profile')
})
</script>

<template>
  <Navbar />
  <main>
    <PageForm heading="Sell Coin" formLabel="Buy" @submit="sellCoin">
      <template #default>
        <FwbInput
          label="Cryptocurrency symbol"
          type="text"
          v-model="sellForm.symbol"
          :required="true"
        />

        <FwbInput
          label="Ammount"
          id="ammount"
          name="ammount"
          type="number"
          step="0.0001"
          v-model="sellForm.ammount"
          :required="true"
        />

        <FwbAlert v-if="errorMessage" data-testid="errorMessage" type="danger">
          {{ errorMessage }}
        </FwbAlert>

        <div class="grid">
          <FwbButton color="default" type="submit" size="xl">Sell</FwbButton>
        </div>
      </template>
    </PageForm>
  </main>
</template>
