<script setup lang="ts">
import NavbarLogged from '@/components/NavbarLogged.vue'
import { trpc } from '@/trpc'
import { FwbCard } from 'flowbite-vue'
const coins = await trpc.transactions.getCoins.query()
</script>

<template>
  <NavbarLogged />
  <main>
    <fwb-card class="!max-w-full mt-10">
      <div class="p-10">
        <h5 class="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">Coins</h5>
        <p v-for="coin in coins" class="text-2xl font-normal text-gray-700 dark:text-gray-400">
          {{ coin.symbol }} - {{ coin.name }} - {{ Math.round(coin.quotes.USD.price * 100) / 100 }}$
        </p>
      </div>
    </fwb-card>
  </main>
</template>
