<script setup lang="ts">
import { useAuth } from "~/stores/auth.store"
const state = reactive({
    phone: '',
    pin: '',
    validateStatus: true
})
onBeforeMount(() => {
    const token = useCookie("token").value
    if (token) {
        navigateTo("/")
    }
})
// auth from store
const {getOtpCode, state: authState} = useAuth()
const validationMobile = () => {
    if (!state.phone) {
        state.validateStatus = false
        return false;
    }
    // regex'
    state.phone = state.phone.replace(/[^\d]/g, '')
    // check iranian mobile numbers
    if (/^09\d{9}$/.test(state.phone) === false) {
        state.validateStatus = false
        return false;
    }
    state.validateStatus = true
}
async function getOTP () {
    if (validationMobile() === false) return;
    await getOtpCode(state.phone)
}
</script>

<template>
    <div class="min-h-screen grid place-items-center">
        <div class="container w-full">
            <div class="text-center">
                <AppLogo class="text-4xl border-b-4 border-custom-blue" />
            </div>
            <br><br>
            <div class="md:w-5/12 w-11/12 bg-white border border-slate-100 rounded-[25px] mx-auto px-7 md:py-11 py-20">
                <h1 class="text-2xl  text-neutral-700 font-[iransans-black] ">ورود یا ثبت نام <span
                        class="animate-ping text-5xl">_</span></h1>
                <p class="text-xs text-neutral-500">برای ورود یا ثبت نام شماره خود را وارد کنید</p>
                <div class="form">
                    <form class="mt-5" @submit.prevent="getOTP">
                        <div class="relative">
                            <input inputmode="numeric" v-model="state.phone" @input="validationMobile" type="text" maxlength="11" dir="ltr"
                                class="spacex-5 tracking-[6px]  h-14 text-lg px-4 bg-custom-whitesmoke/30 rounded-2xl border border-slate-400 w-full outline-none text-neutral-700 focus:border-custom-blue"
                                :class="{ '!border-red-500 !text-red-500 placeholder:text-red-100': !state.validateStatus }"
                                placeholder="0912 ___ __21" />
                        </div>
                        <AppButton :loading="authState.loading" type="button" @click="getOTP" color="blue" class="w-full mt-2" size="lg" label="ارسال کد تایید" />
                        <p class="text-center text-sm mt-4">ورود شما به معنی پذیرش  <NuxtLink to="/" class="text-custom-green font-bold">قوانین قبض هابـ</NuxtLink> میباشد</p>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>