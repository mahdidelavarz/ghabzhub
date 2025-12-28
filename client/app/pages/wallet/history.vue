<script setup lang="ts">
import Services from "../../content/services.json"
import moment from "jalali-moment"
definePageMeta({
    middleware: 'auth-client'
})
useSeoMeta({
    title: "تراکنش های کیف پول"
})

const { getWalletHistory, state } = useWallet()
await getWalletHistory()
</script>
<template>
    <div class="lg:w-10/12 mx-auto">
        <SplitLayout class="lg:p-3" grid-class="grid-cols-1">
            <template #right-top>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex gap-3">
                            <AppIcon name="wallet" size="50" class="text-custom-white" />
                            <div>
                                <p>تراکنش های کیف پول</p>
                                <p class="text-sm !font-light">لیست واریز ها و برداشت های کیف پول</p>
                            </div>
                        </h1>
                    </div>
                </div>
            </template>
            <template #right-bottom>
                <div class="bill-cart_list p-5 space-y-3 ">
                    <div class="flex items-center flex-col gap-3 py-12" v-if="state.walletHistory?.length <= 0">
                        <NuxtImg class="w-44 h-44" quality="69" format="png" loading="lazy" width="200" height="200"
                            src="/3d/bill-history.png" />
                            <p class="text-center text-xl font-bold text-neutral-700">
                                تراکنشی انجام نشده
                            </p>
                    </div>
                    <div class="grid border border-slate-100 rounded-2xl p-6" v-for="history of state.walletHistory">
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                مبلغ:
                            </span>
                            <strong class="text-sm">
                                {{ seperateNumbers(history.amount) }} ریال
                            </strong>
                        </div>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                شماره پذیرنده / شماره پرداخت
                            </span>
                            <span class=" text-sm text-custom-blue">
                                {{ history.reference_id || history.details[0].details.paymentId }}
                            </span>
                        </div>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                توضیحات:
                            </span>
                            <span class=" text-sm">
                                <!-- {{ Services.dictionary }} -->
                                {{ Services.dictionary[history?.details[0]?.details.service] }}
                            </span>
                        </div>
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-sm">
                                زمان و تاریخ:
                            </span>
                            <span class=" text-sm">
                                {{ moment(history.updated_at).format('jYYYY/MM/DD') }} {{
                                    moment(history.updated_at).format('HH:mm:ss') }}
                            </span>
                        </div>
                        <div class="flex justify-between items-center mt-1 ">
                            <span class="text-sm">
                               نوع عملیات:
                            </span>
                            <span
                                class="text-xs py-2 px-3 bg-custom-green/10 text-custom-green border border-custom-green/40 rounded-md"
                                v-if="history.type == 'deposit'">واریز </span>
                            <!-- <span class="text-xs py-2 px-3 bg-cyan-500/10 text-cyan-500 border border-cyan-500/40 rounded-md " v-if="log.status == 'pending'">در انتظار </span> -->
                            <span
                                class="text-xs py-2 px-3 bg-cyan-500/10 text-cyan-500 border border-cyan-500/40 rounded-md"
                                v-if="history.type == 'withdraw'">برداشت </span>
                        </div>
                    </div>
                </div>
            </template>
            <template #left></template>
        </SplitLayout>
    </div>
</template>