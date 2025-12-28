<script setup>

definePageMeta({ layout: "blank" })
const success = useRoute().query.success

const timeAutoReturn = ref(5)

function returnToWallet() {
    setInterval(async () => {
        timeAutoReturn.value--
        if (timeAutoReturn.value == 0) {
            window.location.href = "http://localhost:3001/wallet"
            return
        }
    }, 1000)
}
onMounted(() => {
    if (!success) {
        return navigateTo('/404')
    }

    return returnToWallet()
})

</script>

<template>
    <div class="w-full min-h-screen grid place-content-center place-items-center">
        <div class="bg-white border rounded-2xl py-11 px-7 md:w-[430px] text-center grid place-items-center">
            <AppIcon name="success" v-if="success == '1'" size="134" class="text-green-500" />
            <AppIcon name="error" v-if="success == '0'" size="134" class="text-red-500" />
            <AppIcon name="warning" v-if="success == '2'" size="134" class="text-cyan-500" />
            <h3 class="text-2xl font-[iransans-black] my-4">
                {{
                    success === '1'
                    ? 'با موفقیت پرداخت شد'
                    : success === '2'
                    ? 'قبلا این تراکنش انجام شده'
                    : 'پرداخت انجام نشد'
                }}
            </h3>

            <NuxtLink to="/wallet" class="border-b-2 border-sky-500 text-sky-500 font-bold mt-11 text-xl">
                بازگشت به کیف پول
            </NuxtLink>
        </div>
    </div>
</template>