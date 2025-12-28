<script setup lang="ts">
import { useAuth } from "~/stores/auth.store"
// otp token required
onBeforeMount(() => {
    const otpToken = useCookie('otp-token').value
    if (!otpToken) {
        navigateTo('/login')
    }
})
onBeforeUnmount(() => {
    useCookie('otp-token').value = null
})
const state = reactive({
    pin: '',
    valid: 2
}),
    { verifyOtp, state: authState } = useAuth();
// verify otp code 
const verifyOtpCode = async () => {
    await verifyOtp(state.pin)
    state.valid = authState.validPin
}

const seconds = ref(90);

onMounted(() => {
    let interval = setInterval(() => {
        seconds.value--
        if (seconds.value === 0) clearInterval(interval)
    }, 1000)
})
function toMinute(s: number) {
    let minute: number | string = Math.floor(s / 60),
        second: number | string = Math.floor(s % 60)

    if (minute < 10) minute = "0" + minute
    if (second < 10) second = "0" + second
    return `${second} : ${minute}`
}

</script>

<template>
    <div class="min-h-screen grid place-items-center">
        <div class="container w-full">
            <div class="text-center">
                <AppLogo class="text-4xl border-b-4 border-custom-blue" />
            </div>
            <br><br>
            <div
                class="md:w-5/12 w-11/12 relative bg-white border border-slate-100 rounded-[25px] mx-auto px-7 md:py-11 py-20">
                <!-- loading -->
                <AppLoading size="70" :loading="authState.loading"
                    class="absolute grid place-items-center top-0 left-0 bg-white/80 w-full h-full rounded-[25px] " />
                <h1 class="text-2xl  text-neutral-700 font-[iransans-black] ">تایید کد <span
                        class="animate-ping text-5xl">_</span></h1>
                <p class="text-xs text-neutral-500">لطفا کد پیامک شده را وارد کنید</p>
                <!-- Pin inputs -->
                <div class="grid place-items-center">
                    <pin-input :blur-on-complete="true" @completed="verifyOtpCode" dir="ltr" inputmode="numeric"
                        class="wrapper grid grid-cols-6" v-model="state.pin" :length="6" autofocus
                        :input-class="`PinInput ${state.valid == 1 ? 'success' : state.valid == 0 ? 'error' : ''}`" />
                </div>
                <br>
                <div class="flex justify-between px-4">
                    <button class="text-custom-blue font-bold text-sm bg-custom-blue/5  py-1 hover:bg-custom-blue/20 px-4 rounded-md relative" v-if="seconds <= 0" >کدی را دریافت نکردم!</button>
                    <span v-if="seconds > 0" class="bg-custom-blue/5 rounded-full px-2 tracking-[3px] font-bold text-custom-blue py-1">{{
                        toMinute(seconds) }}</span>
                </div>
                <br>
                <!-- <AppButton type="button" color="blue" class="w-full" size="lg" label="ورود به حساب کاربری" /> -->
            </div>

        </div>
    </div>
</template>

<style>
.PinInput {
    text-align: center;
    height: 60px;
    width: 60px;
    @apply border-b-4 border-custom-whitesmoke outline-none focus:border-custom-neutral mx-1 font-bold text-custom-neutral;
}

.PinInput.error {
    @apply !border-red-500;
}

.PinInput.success {
    @apply !border-custom-green;
}
</style>