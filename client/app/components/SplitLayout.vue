<script lang="ts" setup>
const props = defineProps({
    gridClass: {
        type: String,
        default: 'lg:grid-cols-[auto,350px]'
    },
    reverse: {
        type: Boolean,
        default: false
    },
    leftStyle: String,
    rightBottomStyle: String
})
</script>
<template>
    <div class="container mx-auto md:w-10/12 w-full">
        <!-- Grid -->
        <div :class="`grid gap-3 ${props.gridClass}`">
            <!-- Right -->
            <div class="h-full gap-y-3">
                <div class="bg-pattern lg:rounded-3xl rounded-b-3xl sticky lg:top-5 top-0 left-0">
                    <slot name="right-top" />
                </div>
                <div :class="`bg-white mt-3 shadow-2xl shadow-black/5 rounded-3xl ${props.rightBottomStyle}`">
                    <div class="hidden w-full" :class="{'max-lg:inline-block': props.reverse}">
                        <slot name="left" />
                    </div>
                    <slot name="right-bottom" />
                </div>
            </div>
            <!-- Left -->
            <div :class="`${props.leftStyle} ${props.reverse ? 'max-lg:hidden' : ''}`">
                <slot name="left" />
            </div>
        </div>
    </div>
</template>