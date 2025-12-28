<script setup>
import { toast } from "vue3-toastify";
import Services from "~/content/services.json"
definePageMeta({
    middleware: 'auth-client'
})
useSeoMeta({
    title: "سبد قبض"
})
const paymentMethods = [
    // { id: 'directly', label: 'پرداخت مستقیم' },
    { id: 'wallet', label: 'کیف پول' }
],
    { getBillCarts, state, deleteBill } = useBillCart(),
    {pay} = useWallet(),
    iconColor = (name) => {
        const categories = Services.categories;
        let color = ''
        categories.forEach((cat) => {
            Services[cat.id].forEach((val) => {
                if (val.icon === name) {
                    color = Services.categories.filter(item => item.id == cat.id)
                }
            })
        })

        return color[0].color
    };

await getBillCarts()
async function removeBill(id) {
    toast.loading("در حال حذف قبض ...")
    await deleteBill(id)
    useRouter().go(0)
}

const loading = ref(false)
async function payBills() {
    loading.value = true
    const wallet = await $fetch("/api/wallet/get-balance"),
        balance = wallet?.data.wallet.balance,
        checkBlanace = balance >= state.carts[0].total_estimated_amount;
        console.log("state" , state.carts[0].total_estimated_amount);
        console.log("balance" , balance);
        
    // balance < total
    if (!checkBlanace) {
        let amount = state.carts[0].total_estimated_amount - balance
        toast.info('موجودی کیف پول کافی نیست')
        toast.loading("در حال انتقال به کیف پول")
        setTimeout(() => navigateTo(`/wallet?amount=${amount}`), 2_500)
    } else {
        await pay()
    }
    loading.value = false
}
</script>

<template>
    <div>
        <SplitLayout class="lg:my-8">
            <!-- Right Top -->
            <template #right-top>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex items-center gap-3">
                            <AppIcon name="shopping" size="50" class="text-custom-white" />
                            سبد قبض
                        </h1>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-custom-white font-bold text-sm flex items-center gap-3">
                            تعداد قبض ها: <span> {{ state.carts[0]?.items.length }} </span>
                        </p>
                        <AppButton @click="navigateTo('/')" label="افزودن قبض"
                            class="!font-extralight !bg-custom-blue/30 border border-custom-blue/70 text-sm"
                            size="sm" />
                    </div>
                </div>
            </template>
            <!-- Right Bottom -->
            <template #right-bottom>
                <div class="bill-cart_list p-5 space-y-2">
                    <div v-if="state.carts[0].items.length <= 0" class="grid place-items-center py-11 space-y-5">
                        <AppIcon name="bill" size="84" class="text-custom-blue bg-custom-blue/10 p-3 rounded-xl" />
                        <p class="text-center font-bold text-neutral-800">قبضی یافت نشد</p>
                    </div>
                    <div class="grid gap-2 border border-slate-100 rounded-2xl p-6"
                        v-for="bill of state.carts[0]?.items">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-4 w-full">
                                <AppIcon :name="bill.details.service" size="40"
                                    class="p-2 text-custom-white rounded-2xl shadow-2xl shadow-black/10"
                                    :style="{ 'background': iconColor(String(bill.details.service)) }" />
                                <span class="text-sm">{{ bill.details.label }}</span>
                            </div>
                            <button @click="removeBill(bill?.cart_id)">
                                <AppIcon name="trash" size="25" class="text-red-500" />
                            </button>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-sm">
                                مبلغ:
                            </span>
                            <span class="font-bold text-sm">
                                {{ seperateNumbers(bill.amount || 0) }} ريال
                            </span>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-sm">
                                جزئیات:
                            </span>
                            <span class="font-bold text-sm">
                                {{ Services.dictionary[bill.details.service] }} __ {{ bill.details?.mobile ||
                                    bill.details.billId }} </span>
                        </div>
                    </div>
                </div>
            </template>
            <!-- Left -->
            <template #left>
                <div>
                    <div class="p-5 bg-white rounded-3xl">
                        <div class="flex items-center justify-between text-sm">
                            <span>مبلغ قابل پرداخت</span>
                            <span class="font-bold text-2xl">{{ seperateNumbers(state.carts[0]?.total_estimated_amount
                                || 0)
                            }} ريال</span>
                        </div>
                        <br>
                        <div class="grid gap-2 text-sm">
                            <span>روش های پرداخت</span>
                            <PaymentMethod child-class="h-16 w-1/2" :methods="paymentMethods" />
                        </div>
                        <AppButton :loading="loading" @click="payBills" label="تکمیل فرایند پرداخت" color="blue"
                            size="md" class="mt-2 w-full !font-light text-sm" />
                    </div>
                </div>
            </template>
        </SplitLayout>
    </div>
</template>