<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: '20'
    }
})
const getComponentName = (iconName: string) => {
    const PascalCaseName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    return resolveComponent('i' + PascalCaseName);
};
</script>

<template>
    <component :width="props.size" :height="props.size" :is="getComponentName(props.name)" :fontControlled="false" />
</template>