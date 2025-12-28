<script setup>
import { toast } from 'vue3-toastify';
import { useMobileService } from '~/stores/services/mobile.store';

useSeoMeta({ title: "استعلام قبض موبایل" })
const inquiryResult = useInquiryResuslt()
const { operatorName } = useMobileService()
const props = defineProps({
    result: {
        type: Object,
        required: true
    }
})
const selectedTerm = ref(null),
    result = props.result.result;

checkInquiryAndReturn(inquiryResult, '/mobile')
function selectTerm() {
    inquiryResult.state.payable = result[selectedTerm.value].amount
    // set details
    inquiryResult.state.details = {
        paymentId: result[selectedTerm.value].paymentID,
        billId: result[selectedTerm.value].billID,
        mobile: props.result?.phone,
        service: "mobile",
        label: "قبض موبایل",
        amount: result[selectedTerm.value].amount,
        operator: operatorName(props.result.phone)
    }
}
inquiryResult.state.totalDebt = result.finalTerm.amount > 0 ? result.finalTerm.amount : result.midTerm.amount

</script>
<template>
    <div class="grid gap-3 p-5">
        <div class="p-3 bg-custom-whitesmoke rounded-lg text-sm">
            این استعلام متعلق به شماره <NuxtLink to="/mobile" class="text-custom-blue hover:font-bold">{{
                props.result.phone }}</NuxtLink> میباشد جهت استعلام جدید یا تغییر شماره روی این شماره کلیک کنید
        </div>
        <p class="font-bold my-3 bg-custom-blue/5 flex gap-2 items-center py-3 px-2 rounded-lg text-custom-blue">
            <AppIcon name="mobile" size="36" />
            <span>
                برای پرداخت حداقل یک قبض را انتخاب کنید
            </span>
        </p>
        <div class="p-3 border-dashed border rounded-lg">
            <div class="flex items-center gap-3">
                <input inputmode="numeric" type="radio" @change="selectTerm" v-model="selectedTerm"
                    :disabled="result?.finalTerm.amount <= 0"
                    :class="{ 'disabled:opacity-30 !cursor-not-allowed': result?.finalTerm.amount <= 0 }" name="m"
                    value="finalTerm" class="w-7 h-7 accent-slate-600 cursor-pointer" />
                <span class="text-sm font-bold">پایان دوره</span>
            </div>
            <div :class="{ '!border-green-500 !bg-green-500/10 *:text-green-500': result?.finalTerm.amount <= 0 }"
                class="p-2 bg-slate-50/50 text-slate-600 text-[16px] border border-dashed border-slate-200 my-3 rounded-md ">
                <div class=" flex items-center justify-between gap">
                    <span>مبلغ:</span>
                    <span class="font-bold py-2 px-3 border border-dashed border-slate-200 rounded-md">{{
                        seperateNumbers(result?.finalTerm.amount) }} ريال</span>
                </div>
            </div>
        </div>
        <div class="p-3 border-dashed border rounded-lg">
            <div class="flex items-center gap-3">
                <input type="radio" @change="selectTerm" v-model="selectedTerm" name="m" value="midTerm"
                    class="w-7 h-7 accent-slate-600 cursor-pointer" />
                <span class="text-sm font-bold">میان دوره</span>
            </div>
            <div
                class="p-2 bg-slate-50/50 text-slate-600 text-[16px] border border-dashed border-slate-200 my-3 rounded-md ">
                <div class=" flex items-center justify-between gap">
                    <span>مبلغ:</span>
                    <span class="font-bold py-2 px-3 bg-slate-100 rounded-md">{{
                        seperateNumbers(result?.midTerm.amount) }} ريال</span>
                </div>
            </div>
        </div>
    </div>
</template>