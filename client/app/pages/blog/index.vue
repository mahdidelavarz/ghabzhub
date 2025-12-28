<script setup lang="ts">
useSeoMeta({
    title: "بلاگ"
})
</script>
<template >
    <div class="lg:w-full/12 mx-auto">
        <SplitLayout class="lg:p-3" grid-class="grid-cols-1">
            <template #right-top>
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-custom-white font-bold text-2xl flex gap-3">
                            <AppIcon name="blog" size="50" class="text-custom-white" />
                            <div>
                                <p> بلاگ هابـــــ </p>
                                <p class="text-lg !font-light">ما اینجا به شما یاد میدهیم که بهترین شوید </p>
                            </div>
                        </h1>
                        <NuxtLink to="/" class="px-3 py-2 flex items-center gap-1 text-center bg-custom-blue/20 border border-slate-100/30 text-sm text-custom-white rounded-xl">
                            بازگشت
                            <AppIcon name="arrowDown" size="20" class="rotate-90" />
                        </NuxtLink>
                    </div>
                </div>
            </template>
            <template #right-bottom>

            </template>
        </SplitLayout>
    </div>
</template>