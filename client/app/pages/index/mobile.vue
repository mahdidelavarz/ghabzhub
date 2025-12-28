<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { useMobileService } from '~/stores/services/mobile.store';

useSeoMeta({
    title: "استعلام و پرداخت تلفن همراه"
})

const {state, inquiry, preventLetters, operatorName, selectTransportation} = useMobileService(),
    {state: inquiryState} = useInquiryResuslt()
const mobileNumber = ref('')

function phoneValueWacher () {
    mobileNumber.value = preventLetters(mobileNumber.value)
    operatorName(mobileNumber.value)
    
}

async function inquiryMobile () {
    if (/^09\d{9}$/.test(mobileNumber.value) === false) {
        return state.status = false
    }
    
    await inquiry(mobileNumber.value, 'mci')
    state.status = true
}
</script>
<template>
    <SplitLayout class="md:my-3 md:w-9/12" grid-class="grid-col-1" left-style="!relative"
        right-bottom-style="!bg-transparent shadow-none">
        <template #right-top>
            <div>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex gap-1 items-center">
                            <AppIcon name="mobile" size="50" class="text-custom-white" />
                            <div>
                                <p>استعلام و پرداخت قبض تلفن همراه</p>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
        </template>
        <template #right-bottom>
            <div class="p-2 grid lg:grid-cols-[432px,1fr]">
                <div class="bg-white p-7 rounded-3xl">
                    <p class="mt-7 mb-2 text-sm">برای مشاهده نتیجه، شماره موبایل را وارد کنید.</p>
                    <input maxlength="11" :class="{'border border-red-500 focus:border-red-500': !state.status}"  @input="phoneValueWacher" v-model="mobileNumber" type="text" placeholder="شماره موبایل"
                        class="text-center placeholder:text-lg focus:border-custom-blue outline-none transition tracking-[7px] text-xl bg-custom-whitesmoke w-full h-14 rounded-xl border" />
                    <p class="mt-3 text-sm">در صورت ترابرد, اپراتور فعلی خود را انتخاب کنید</p>
                    <div class="flex gap-2 relative mt-3">
                        <NuxtImg src="/logo/mci.png" @click="selectTransportation('mci')" :class="{ 'filter-none scale-90': state.operator === 'mci' }" class="cursor-pointer transition  w-14 h-14 bg-[#0095da] rounded-xl grayscale select-none"
                            :claas="{ '! border-4 p-2': true }" width="100" height="100" />
                        <NuxtImg src="/logo/irancell.jpg" @click="selectTransportation('mtn')" :class="{'filter-none scale-90': state.operator === 'mtn'}" class="cursor-pointer transition  w-14 h-14 rounded-xl grayscale select-none" width="100"
                        height="100" />
                    </div>
                    <br>
                    <AppButton @click="inquiryMobile" label="استعلام جزئیات قبض موبایل" :loading="state.loading" size="md" class="w-full font-light"/>
                </div>
                <div class="px-5 py-2">
                    <NuxtImg src="/logo/sim-removebg-preview.png" class="h-52 mx-auto"/>
                    <p class="font-bold text-neutral-600">چگونه قبض تلفن همراه را پرداخت کنیم؟</p>
                    <p class="text-neutral-600 text-sm mt-3 text-justify">
                        اگر شما هم به‌دنبال روشی سریع و ساده هستید تا قبض موبایلتان را استعلام بگیرید و پرداخت کنید،
                        دیگر نیازی به شناسه قبض و شناسه پرداخت ندارید؛ کافیست، از خدمت قبض موبایل قبضینو استفاده کنید تا
                        با وارد کردن شماره موبایلتان، قبض همراه اول، ایرانسل و رایتل را با جزئیات استعلام بگیرید و
                        به‌صورت آنی پرداخت کنید.
                    </p>
                </div>
            </div>
        </template>
        <!-- <template #left>
            <div class="px-5 py-7 bg-white rounded-[25px]">
                <div v-if="true" class="grid place-items-center">
                    <div class="p-6 bg-custom-whitesmoke rounded-xl space-y-3 place-items-center font-bold">
                        <NuxtImg class="w-24 h-24" format="png" loading="lazy" width="100" height="100"
                            src="/3d/bill-history.png" />
                        <p class="text-sm text-center">استعلامی انجام نشده</p>
                        <p class="text-xs text-center">نتیجه استعلام در این قسمت نمایش داده میشود</p>
                    </div>
                </div>
            </div>
        </template> -->
    </SplitLayout>
</template>
<style scoped></style>