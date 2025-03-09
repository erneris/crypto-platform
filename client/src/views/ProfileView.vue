<script setup lang="ts">
import NavbarLogged from '@/components/NavbarLogged.vue'
import { trpc } from '@/trpc'
import { FwbCard } from 'flowbite-vue'
const user = await trpc.user.getData.query()
const assets = await trpc.user.getAssets.query()
</script>

<template>
  <NavbarLogged />
  <main>
    <fwb-card class="!max-w-full">
      <div class="p-10">
        <h5 class="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ user.firstName + ' ' + user.lastName }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {{ user.email }}
        </p>
        <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Balance: {{ user.money }}$
        </h5>
      </div>
    </fwb-card>
    <fwb-card class="!max-w-full mt-10">
      <div class="p-10">
        <h5 class="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">Assets</h5>
        <p
          v-for="asset in assets.assets"
          class="text-2xl font-normal text-gray-700 dark:text-gray-400"
        >
          {{ asset.assetId }} - {{ asset.ammount }}
        </p>
      </div>
    </fwb-card>
  </main>
</template>
