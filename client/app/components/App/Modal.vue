<script setup lang="ts">
const props = withDefaults(defineProps<{ state: boolean }>(), {})
</script>
<template>
    <div class="modal fixed top-0 left-0 w-full h-screen overflow-y-auto py-4 z-10 bg-custom-neutral/20" v-show="props.state">
        <div class="modal-dialog w-full h-full grid place-items-center">
            <div class="modal-content bg-custom-white border max-h-[95vh] overflow-y-auto border-slate-100 rounded-[25px] w-5/12">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-content::-webkit-scrollbar {
        @apply bg-transparent w-[7px];
    }
    .modal-content::-webkit-scrollbar-thumb {
        @apply bg-custom-blue rounded-full;
    }
</style>