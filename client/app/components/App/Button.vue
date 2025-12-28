<script setup>
const props = defineProps({
    size: String,
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "button"
    },
    color: {
        type: String,
        default: 'blue'
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <button v-if="!props.link" :type="props.type"
    :disabled="props.disabled"
        :class="`${props.color} ${props.size} relative disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden rounded-2xl transition-all font-bold`">
        <span v-if="!props.loading">{{ props.label }}</span>
        <div class="grid place-items-center">
            <svg v-if="props.loading" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from EOS Icons by SUSE UX/UI team - https://gitlab.com/SUSE-UIUX/eos-icons/-/blob/master/LICENSE --><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
        </div>
    </button>
</template>

<style lang="css" scoped>
.blue {
    @apply bg-custom-blue text-custom-white hover:bg-custom-blue/85;
}

.cyan {
    @apply bg-custom-cyan text-custom-white hover:bg-custom-cyan/85;
}

.orange {
    @apply bg-custom-orange text-custom-white hover:bg-custom-orange/85;
}

.white {
    @apply bg-custom-white text-custom-neutral hover:bg-custom-white/85;
}

.whitesmoke {
    @apply bg-custom-whitesmoke text-custom-neutral hover:bg-custom-whitesmoke/85;
}

.green {
    @apply bg-custom-green text-custom-white hover:bg-custom-green/85;
}

.neutral {
    @apply bg-custom-neutral text-custom-whitesmoke hover:bg-custom-neutral/85;
}

.sm {
    @apply px-3 py-2;
}

.md {
    @apply px-2 py-3;
}

.lg {
    @apply px-3 py-4;
}
</style>