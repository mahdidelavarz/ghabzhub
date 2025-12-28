<script setup lang="ts">
definePageMeta({ middleware: "auth-client" })
useSeoMeta({
    title: "کیف پول",
})
import num2persian from 'num2persian';

const amount = useRoute().query.amount as String,
    state = reactive({
        amount: seperateNumbers(Number(amount) || 10_000),
        minAmount: 10_000
    }),
    { getBalance, startPayment: requestPayment } = useWallet(),
    loading = ref(false),

    // get wallet balance
    { data: wallet } = await useAsyncData('wallet-balance', async () => {
        return await getBalance()
    })

// validate amount value
function validateAmount() {
    if (!parseSeperatedNumber(state.amount).toString().replace(/[^\d,.]/g, '')) {
        if (isNaN(Number(state.amount))) {
            state.amount = seperateNumbers(state.minAmount)
            return;
        }
    }
    let amount = parseSeperatedNumber(state.amount)
    if (amount < state.minAmount) {
        state.amount = seperateNumbers(state.minAmount)
    }
    state.amount = seperateNumbers(amount)
}

// add to amount
function operationAmount(type: 'plus' | 'minus') {
    let amount = ref(parseSeperatedNumber(state.amount))
    if (type === 'plus') {
        amount.value += state.minAmount
    } else if (type === 'minus') {
        amount.value -= state.minAmount
    }
    // check min amount
    if (amount.value < state.minAmount) {
        return state.amount = seperateNumbers(state.minAmount)
    }
    state.amount = seperateNumbers(amount.value)
}

function taxCalculation(amount: number) {
    return (amount) + (amount * 0.1)
}

// payment

async function startPayment() {
    loading.value = true
    await requestPayment(parseSeperatedNumber(state.amount))
    loading.value = false
}

</script>
<template>
    <div class="lg:p-3">
        <SplitLayout :reverse="true" right-bottom-style="!m-0 !bg-none !shadow-none">
            <template #right-bottom>
                <div class="py-16 px-10">
                    <div class="text-sm">
                        <p class="text-neutral-700">مقدار مبلغی که میخواهید به کیف پول اضافه کنید را تعیین یا وارد کنید.
                        </p>
                        <div class="mt-3 flex gap-2">
                            <button @click="operationAmount('plus')"
                                class="h-14 w-14 bg-custom-whitesmoke grid place-items-center rounded-lg border text-custom-blue">
                                <AppIcon name="plus" />
                            </button>
                            <input dir="ltr" @blur="validateAmount" @input="validateAmount" type="text"
                                v-model="state.amount"
                                class="h-14 rounded-lg flex flex-1 bg-custom-whitesmoke border font-bold text-center" />
                            <button @click="operationAmount('minus')"
                                class="h-14 w-14 bg-custom-whitesmoke grid place-items-center rounded-lg border text-custom-blue">
                                <AppIcon name="minus" />
                            </button>
                        </div>
                        <br><br>
                        <p class="text-neutral-700">درگاه پرداخت خود را انتخاب کنید </p>
                        <br>
                        <div class="grid grid-cols-2">
                            <div class="px-3 py-5 bg-custom-blue/5 rounded-xl border-custom-blue border grid gap-3">
                                <div class="flex gap-2 text-custom-blue">
                                    <AppIcon name="bank" size="30" />
                                    <div class="space-y-2">
                                        <span class="font-bold">پرداخت اینترنتی</span>
                                        <p class="text-xs">پرداخت از درگاه اینترنتی</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="report space-y-0 my-7">
                            <div class="flex justify-between text-lg ">
                                <p>مبلغ قابل پرداخت:</p>
                                <p class="text-xl">{{ seperateNumbers(
                                    taxCalculation(
                                        parseSeperatedNumber(state.amount)
                                    )
                                ) }} ريال</p>
                            </div>
                        </div>
                        <AppButton :label="`پرداخت ${seperateNumbers(
                            taxCalculation(
                                parseSeperatedNumber(state.amount)
                            )
                        )} ريال`" :loading="loading" size="lg" class="w-full" @click="startPayment" />
                    </div>
                </div>
            </template>
            <template #left>
                <div
                    class="bg-[url(/bg/bg-1.png)] shadow-2xl bg-cover lg:rounded-xl rounded-b-3xl relative overflow-hidden">
                    <div class="p-4 text-white text-sm backdrop-blue-sm relative">
                        <div class="flex items-center gap-2 mb-2">
                            <NuxtLink to="/wallet/history" title="مشاهده سوابق کیف پول">
                                <AppIcon name="wallet" size="30" />
                            </NuxtLink>
                        </div>
                        <p class="text-xs">موجودی کیف پول</p>
                        <p class="font-[iransans-black] text-3xl mt-3">
                            {{
                                // @ts-ignore
                                seperateNumbers(String(wallet?.balance || 0))
                            }} ريال</p>
                        <p class="text-xs mt-2 text-slate-300">
                            {{
                                // @ts-ignore
                                num2persian(wallet?.balance / 10)
                            }}
                            (تومان)
                        </p>
                        <br><br>
                        <div
                            class="p-3 mt-2 backdrop-blur-sm border border-slate-100/20 bg-black/10 list-disc rounded-2xl shadow-2xl shadow-white/40">
                            <ul class="text-xs list-decimal list-inside space-y-3">
                                <li>مبلغی که پرداخت میکنید نباید کمتر100,000 تومان باشد </li>
                                <li>کارمزد کیف پول برابر با 18,300 میباشد</li>
                                <li>پرداخت و شارژ کیف پول از طریق درگاه پرداخت امن صورت میگیرد </li>
                                <li>شارژ کیف پول به منزله استفاده برای پرداخت قبض میباشد و قابل برداشت نخواهد بود</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
        </SplitLayout>
    </div>
</template>