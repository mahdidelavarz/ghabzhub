<script setup>
import { toast } from 'vue3-toastify'

const result = useCookie('inquiry').value
const inquiryResult = useInquiryResuslt(),
    {createBillCart} = useBillCart(),
    loading = ref(false);
onBeforeMount(() => {
    if (!result) {
        return useRouter().back()
    }
})


async function addBillToCart () {
    loading.value = true
    if (inquiryResult.state.payable <= 0) {
        loading.value = false
        return toast.error("برای ادامه قبضی انتخاب شود.", {position: 'bottom-left'})
    }

    await createBillCart(inquiryResult.state.payable, inquiryResult.state.details) 
    loading.value = false
}
</script>
<template>
    <SplitLayout class="lg:p-3"  right-bottom-style="bg-none">
        <template #right-top>
            <div>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex gap-1 items-center">
                            <AppIcon name="bill" size="50" class="text-custom-white" />
                            <div>
                                <p>نتیجه استعلام</p>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
        </template>
        <template #right-bottom>
            <InquiryMobile :result="result" v-if="result?.type === 'mobile'" />
        </template>
        <template #left>
            <div class="p-5 font-bold text-slate-700 text-[16px] bg-white rounded-3xl space-y-5">
                <div class="flex justify-between items-center">
                    <span>کل بدهی</span>
                    <span>{{ seperateNumbers(inquiryResult.state.totalDebt) }} ريال</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>مبلغ قابل پرداخت</span>
                    <span>{{ seperateNumbers(inquiryResult.state.payable) }} ريال</span>
                </div>
                <AppButton :loading="loading" label="تایید و ادامه" size="md" class="w-full" @click="addBillToCart" color="cyan" />
            </div>
        </template>
    </SplitLayout>
</template>