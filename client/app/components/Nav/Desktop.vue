<script lang="ts" setup>
const { list, state, services } = useNavbar()
import Services from "~/content/services.json"

</script>
<template>
    <ul class="flex items-center gap-8">
        <li v-for="item of list" @click="item.onClick($event)"
            class="text-sm flex cursor-pointer items-center gap-3 transition hover:scale-95 group hover:text-custom-blue">
            <NuxtLink :to="item.to"> {{ item.label }}</NuxtLink>
            <AppIcon :name="String(item.icon)" class="text-neutral-600 group-hover:text-custom-blue" size="25"
                v-if="'children' in item" />
        </li>
    </ul>

    <!-- Services Modal -->
    <AppModal :state="state.serviceModal">
        <template #content>
            <div class="p-4">
                <div class="flex items-center justify-between">
                    <p class="text-sm font-bold ">خدمات پرداخت</p>
                    <button @click="state.serviceModal = false">
                        <AppIcon name="close" size="20" />
                    </button>
                </div>
                <!-- Services -->
                <BillingList css-styles="grid grid-cols-4 gap-y-7 max-md:grid-cols-4 mt-9" :title="['خدمات قبض و موبایل', 'خدمات خودرو و موتور', 'خدمات بانکی', 'خدمات سفر']"
                    :list="[Services.billAndMobile, Services.carAndCycle, Services.bank, Services.travel]"
                    :color="['#0078d7', '#35c759', '#ffa94d', '#00bfa6']" :icon="['bill', 'car', 'bank', 'travel']" />
            </div>
        </template>
    </AppModal>
</template>