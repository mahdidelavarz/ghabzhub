<script setup>
const nuxtApp = useNuxtApp(),
  luncherAppIsActice = ref(true)

nuxtApp.hooks.hook("app:mounted", () => {
  luncherAppIsActice.value = false
})
</script>
<template>
  <div>
    <AppLuncherActivity v-if="luncherAppIsActice" />
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator colro="#0078d7" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
