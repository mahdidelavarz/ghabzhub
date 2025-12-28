<script lang="ts" setup>
import Services from "~/content/services.json"
const props = withDefaults(defineProps<{
    title: string[],
    list: any[],
    icon?: string[],
    color?: string[],
    cssStyles?: string
}>(), {})
</script>

<template>
    <div :id="String(Services.categories.at(index)?.id)" class="bg-custom-white rounded-[33px] p-6 container mx-auto my-5 " v-for="(item, index) of list"
        :key="index">
        <div class="flex items-center gap-3">
            <AppIcon :name="String(props.icon?.at(index))" size="25" :color="props.color?.at(index)" />
            <span class="font-bold text-custom-neutural text-sm">{{ props.title.at(index) }}</span>
        </div>
        <!-- List -->
        <div>
            <div :class="props.cssStyles">
                <div v-for="service of props.list[index]" class="grid place-items-center gap-3 text-center">
                    <NuxtLink :to="!service.disabled ? service.to : ''" :class="{'opacity-40': service.disabled}" class="transition hover:scale-110 hover:opacity-60">
                        <AppIcon :name="service.icon" size="55"
                        class="w-[70px] h-[70px] p-3 bg-custom-whitesmoke rounded-2xl"
                        :style="{ color: props.color?.at(index) }" />
                    <p class="text-xs mt-2">{{ service.label }}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>