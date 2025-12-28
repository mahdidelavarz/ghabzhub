<script setup lang="ts">

</script>
<template>
    <NavMobile />
    <nav class="bg-custom-white shadow-sm hidden lg:block relative z-50">
        <div class="container w-11/12 mx-auto">
            <div class="py-5">
                <div class="flex justify-between items-center">
                    <!-- Logo -->
                    <AppLogo class="text-lg" />
                    <!-- Desktop or Mobile -->
                    <NavDesktop />
                    <!-- Utils -->
                    <NavUtils />
                </div>
            </div>
        </div>
    </nav>
</template>