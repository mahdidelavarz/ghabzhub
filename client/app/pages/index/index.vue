<script setup lang="ts">
import Services from "~/content/services.json"
useSeoMeta({
    title: "سامانه استعلام و پرداخت قبض - قبض هاب",
    description: 'سامانه استعلام و پرداخت انواع قبض و خدمات بین المللی , خرید شارژ, ,خرید بسته اینترنت, پرداخت قبوض برق و گاز '
})
</script>

<template>
    <div class="max-sm:mb-28 lg:w-9/12 mx-auto">
        <AppHeader />
        <BillingList css-styles="grid grid-cols-8 gap-y-7 max-md:grid-cols-4 mt-9" :title="['خدمات قبض و موبایل', 'خدمات خودرو و موتور', 'خدمات بانکی' ,'خدمات سفر']"
            :list="[Services.billAndMobile, Services.carAndCycle, Services.bank, Services.travel]" 
            :color="['#0078d7', '#35c759', '#ffa94d', '#00bfa6']"
            :icon="['bill', 'car', 'bank', 'travel']" />
    </div>
</template>