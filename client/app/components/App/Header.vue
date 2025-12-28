<script lang="ts" setup>
import Services from "~/content/services.json"

const { y } = useWindowScroll({behavior: 'smooth'}),
    scrollOnTarget = ref(false)
watch(y ,(value) => {
    if (value > 150)
        scrollOnTarget.value = true
    else
        scrollOnTarget.value = false
})

</script>

<template>
    <div class="container mx-auto z-10 mb-14 sticky top-0 left-0 transition duration-500" :class="{'-translate-y-[60%] scale-y-70': scrollOnTarget}">
        <div class="px-6 pt-7 header rounded-b-[50px] text-center ">
            <AppLogo class="md:text-4xl text-4xl mb-3 md:hidden *:text-custom-white inline-block " />
            <h1 class="text-custom-white md:text-2xl font-bold">
                <AppLogo class="md:text-4xl text-4xl mb-3 md:inline-block *:text-custom-white hidden " />
                &ThinSpace; سامانه پرداخت قبض <span class="text-2xl">هوشمند</span>
            </h1>
            <h2 class="text-custom-white md:text-2xl text-lg font-bold transition duration-700" :class="{'opacity-0': scrollOnTarget}">تجمیع و تسهیل در پرداخت قبوض</h2>
            <!-- Categories -->
            <div
                class="md:w-7/12 w-10/12 mx-auto  rounded-[25px] translate-y-1/2 grid grid-cols-4 md:gap-6 gap-2" >
                <NuxtLink :to="'#'+category.id" class="hover:scale-110 transition py-2 px-1 grid place-items-center md:w-24 md:h-24 w-full cursor-pointer rounded-[25px] bg-custom-white shadow-2xl shadow-custom-neutral/20" v-for="category of Services.categories">
                    <AppIcon :name="category.icon" size="45" :style="{'color': category.color}" />
                    <span class="text-xs">{{ category.label }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    background: linear-gradient(27.5deg, #0f93ff, #1596ff 25%, #219bff 0, #1a98ff 40%, #0f93ff 0, #219bff 52%, #0f93ff 0, #0f93ff);
}
</style>