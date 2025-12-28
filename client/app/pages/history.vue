<script setup lang="ts">
import moment from "jalali-moment"
definePageMeta({
    middleware: 'auth-client'
})
useSeoMeta({
    title: "گزارش های پرداخت"
})

const { getPaymentLogs, state } = useWallet()
await getPaymentLogs()

// total all payments
const totalPayments = computed(() => {
    // @ts-ignore
    const history: [] = state.paymentLogs?.logs;
    let total = 0
    // @ts-ignore
    history.forEach(item => total += +item.amount)
    return total
})

</script>
<template>

    <div class="lg:w-10/12 mx-auto">
        <SplitLayout class="lg:p-3" grid-class="grid-cols-1">
            <template #right-top>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex gap-3">
                            <AppIcon name="bank" size="50" class="text-custom-white" />
                            <div>
                                <p>سوابق پرداختی</p>
                                <p class="text-sm !font-light">مشاهده تمام عملیات بانکی رخ داده تا امروز</p>
                            </div>
                        </h1>
                        <p
                            class="px-3 py-2 text-center bg-custom-blue/20 border border-slate-100/30 text-sm text-custom-white rounded-xl">
                            مجموع: {{ seperateNumbers(totalPayments) }} ريال
                        </p>
                    </div>
                </div>
            </template>
            <template #right-bottom>
                <div class="bill-cart_list p-5 space-y-3 ">
                    <div class="flex items-center flex-col gap-3 py-12" v-if="state.paymentLogs?.logs?.length <= 0">
                        <NuxtImg class="w-44 h-44" quality="69" format="png" loading="lazy" width="200" height="200"
                            src="/3d/bill-history.png" />
                            <p class="text-center text-xl font-bold text-neutral-700">
                                تراکنشی انجام نشده
                            </p>
                    </div>
                    <div class="grid border border-slate-100 rounded-2xl p-6" v-for="log of state.paymentLogs?.logs">
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                مبلغ:
                            </span>
                            <strong class="text-sm">
                                {{ seperateNumbers(log.amount) }} ریال
                            </strong>
                        </div>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                شماره پذیرنده:
                            </span>
                            <span class=" text-sm text-custom-blue">
                                {{ log.reference_id }}
                            </span>
                        </div>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                توضیحات:
                            </span>
                            <span class=" text-sm">
                                {{ log.details || '-----' }}
                            </span>
                        </div>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                زمان و تاریخ:
                            </span>
                            <span class=" text-sm">
                                {{ moment(log.updated_at).format('jYYYY/MM/DD') }} {{
                                    moment(log.updated_at).format('HH:mm:ss') }}
                            </span>
                        </div>
                        <div class="flex justify-between items-center mt-1 ">
                            <span class="text-sm">
                                وضعیت پرداخت:
                            </span>
                            <span
                                class="text-xs py-2 px-3 bg-custom-green/10 text-custom-green border border-custom-green/40 rounded-md"
                                v-if="log.status == 'success'">پرداخت شده </span>
                            <!-- <span class="text-xs py-2 px-3 bg-cyan-500/10 text-cyan-500 border border-cyan-500/40 rounded-md " v-if="log.status == 'pending'">در انتظار </span> -->
                            <span
                                class="text-xs py-2 px-3 bg-cyan-500/10 text-cyan-500 border border-cyan-500/40 rounded-md"
                                v-if="log.status == 'pending'">در انتظار </span>
                            <span
                                class="text-xs py-2 px-3 bg-red-500/10 text-red-500 border border-red-500/40 rounded-md"
                                v-if="log.status == 'failed'">ناموفق </span>
                        </div>
                    </div>
                </div>
            </template>
            <template #left></template>
        </SplitLayout>
    </div>
</template>