<script lang="ts" setup>
import Services from "~/content/services.json"
useSeoMeta({
    title: "پشتیبانی"
})
</script>

<template>
    <div>
        <SplitLayout class="lg:p-3" :reverse="true">
            <template #right-top>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex gap-3">
                            <AppIcon name="support" size="50" class="text-custom-white" />
                            <div>
                                <p>پشتیبانی و سوالات متداول</p>
                                <p class="text-sm !font-light">میتوانید سوالات خود را اینجا پیدا کنید</p>
                                <p class="text-sm !font-light">اگر نیاز به برقراری ارتباط با پشتیبانی دارید از طریق
                                    شماره 09160934169 تماس بگیرید</p>
                            </div>
                        </h1>
                    </div>
                </div>
            </template>
            <!-- Botton Right -->
            <template #right-bottom>
                <div class="p-5">
                    <div class="faq-category mb-5">
                        <h5 class="text-[18px] px-2 text-neutral-800 font-bold mb-4">قبض و موبایل</h5>
                        <Collapsable v-for="item of 6" class="mb-4">
                            <template #header>چرا بعد از پرداخت قبض سریعا قبض پرداخت نمیشود؟</template>
                            <template #content>
                                fdakfmskfak
                            </template>
                        </Collapsable>
                    </div>
                </div>
            </template>
            <!-- Left -->
            <template #left>
                <div>
                    <div class="p-5 bg-white rounded-3xl">
                        <strong>دسته بندی بر اساس خدمات</strong>
                        <div class="min-h-16 p-3 mt-3 shadow-2xl shadow-custom-nuetral/5 rounded-2xl grid gap-2">
                            <a :href="`#${service.id}`" v-for="service of Services.categories"
                                class="flex items-center justify-between p-3 text-sm rounded-xl bg-custom-whitesmoke">
                                <div class="flex items-center gap-3 ">
                                    <span class="w-3 h-1 inline-block rounded-sm outline outline-offset-2"
                                        :style="{ backgroundColor: service.color, outlineColor: service.color }"></span>
                                    <span>{{ service.label }}</span>
                                </div>
                                <AppIcon :name="service.icon" size="18.8" :style="{ color: service.color }" />
                            </a>
                        </div>
                    </div>
                </div>
            </template>
        </SplitLayout>
    </div>
</template>