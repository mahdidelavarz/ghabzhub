<script lang="ts" setup>
import {animate, motion} from "motion-v"
const isOpen = ref(false)
</script>

<template>
    <div class="border border-slate-100 rounded-2xl">
        <button class="w-full text-right flex justify-between items-center py-4 px-3" @click="isOpen = !isOpen">
            <span class="text-sm text-custom-neutral">
                <slot name="header" ></slot>
            </span>
            <AppIcon name="arrowDown" />
        </button>
        <!-- content -->
         <motion.div class="overflow-hidden" :initial="{height: 0}" :animate="isOpen ? {height: 'auto'} : {height: 0}">
            <div class="px-4 py-3 text-sm">
                <slot name="header" ></slot>
            </div>
         </motion.div>
    </div>
</template>