<script setup>
import Services from "~/content/services.json"
definePageMeta({
    middleware: 'auth-client'
})
useSeoMeta({
    title: "قبض های پرداخت شده"
})
const { getBillCarts, state, deleteBill } = useBillCart(),
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

const { data: wallet, pending } = await useAsyncData(
    'init-shopping-data',
    async () => {
        await getBillCarts()
    }
)

</script>

<template>
    <div>
        <SplitLayout class="lg:my-3 lg:w-8/12" grid-class="grid-cols-1">
            <!-- Right Top -->
            <template #right-top>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex items-center gap-3">
                            <AppIcon name="shopping" size="50" class="text-custom-white" />
                            تاریخچه قبض های پرداخت شده
                        </h1>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-custom-white font-bold text-sm flex items-center gap-3">
                            تعداد قبض های پرداخت شده: <span> {{ [].length }} </span>
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
                    <div v-if="[].length <= 0" class="grid place-items-center py-11 space-y-5">
                        <AppIcon name="bill" size="84" class="text-custom-blue bg-custom-blue/10 p-3 rounded-xl" />
                        <p class="text-center font-bold text-neutral-800">قبضی پرداخت نشده</p>
                    </div>
                    <div class="grid gap-2 border border-slate-100 rounded-2xl p-6"
                        v-for="bill of [].items">
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
                                {{ seperateNumbers(bill.amount) }} ريال
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
        </SplitLayout>
    </div>
</template>