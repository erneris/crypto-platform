<script setup lang="ts">
import NavbarLogged from '@/components/NavbarLogged.vue'
import { trpc } from '@/trpc'
import { FwbCard } from 'flowbite-vue'
const transactions = await trpc.user.getTransactions.query()
console.log(transactions.transactions)
</script>

<template>
  <NavbarLogged />
  <main>
    <fwb-card class="!max-w-full mt-10">
      <div class="p-10">
        <h5 class="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Transactions
        </h5>
        <p class="font-bold text-2xl mb-5 text-gray-700 dark:text-gray-400">
          Type - Symbol - Ammount - Price - Date
        </p>
        <p
          v-for="transaction in transactions.transactions"
          class="mb-2 text-2xl font-normal text-gray-700 dark:text-gray-400"
        >
          {{ String(transaction.type).charAt(0).toUpperCase() + String(transaction.type).slice(1) }}
          — {{ transaction.assetId }} — {{ transaction.ammount }} — {{ transaction.price }}$ —
          {{
            `${new Date(transaction.madeAt).getFullYear()} - ${new Date(transaction.madeAt).getUTCMonth() + 1} - ${new Date(transaction.madeAt).getDate()} ${new Date(transaction.madeAt).getHours()}:${new Date(transaction.madeAt).getMinutes()}:${new Date(transaction.madeAt).getSeconds()}`
          }}
        </p>
      </div>
    </fwb-card>
  </main>
</template>
