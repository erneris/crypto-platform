<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
</script>

<template>
  <WelcomeItem>
    <template #heading>Getting started</template>

    Either<RouterLink
      to="/signup"
      class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >sign up</RouterLink
    >and receive starting 1000$ or<RouterLink
      to="/login"
      class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >log in</RouterLink
    >to existing account.
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>Browsing</template>

    Browse extensive list of available cryptocurrencies.
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>Purchase</template>

    Purchase an available cryptocurrency from the list.
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>Sell</template>
    Sell your owned cryptocurrencies.
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>Transactions</template>

    Make further transactions and try to earn profit.
  </WelcomeItem>
</template>

<style scoped></style>
