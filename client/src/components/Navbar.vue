<script setup lang="ts">
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo } from 'flowbite-vue'
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
        <fwb-navbar-link link="/"> Home </fwb-navbar-link>
        <fwb-navbar-link link="/login"> Log in </fwb-navbar-link>
        <fwb-navbar-link link="/signup"> Sign up </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>
