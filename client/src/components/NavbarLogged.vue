<script setup lang="ts">
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo } from 'flowbite-vue'
import { logout } from '@/stores/user'
</script>

<template>
  <fwb-navbar>
    <template #logo>
      <fwb-navbar-logo alt="Logo" image-url="/logo.png" link="/"
        >&nbspCryptocurrency exchange
      </fwb-navbar-logo>
    </template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link link="/profile"> Profile </fwb-navbar-link>
        <fwb-navbar-link link="/browse"> Browse </fwb-navbar-link>
        <fwb-navbar-link link="/buy"> Buy </fwb-navbar-link>
        <fwb-navbar-link link="/sell"> Sell </fwb-navbar-link>
        <fwb-navbar-link link="/transactions"> Transactions </fwb-navbar-link>
        <fwb-navbar-link @click="logout()" link="/"> Log out </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>
