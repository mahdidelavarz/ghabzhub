<script setup lang="ts">
interface PaymentMethod {
    id: string,
    label: string
}
const props = withDefaults(defineProps<{
    methods: PaymentMethod[],
    parentClass?: string,
    childClass?: string,
    multiple: boolean
}>(), {
    multiple: false
})

</script>
<template>
    <div :class="`${props.parentClass} grid gap-2 relative z-0`">
        <lebel :class="`${props.childClass} min-h-12 relative p-2`" v-for="(method, index) of props.methods">
            <input ref="paymentMethods" :checked="index == 0"
                class="peer rounded-2xl top-0 z-50 left-0 w-full h-full cursor-pointer opacity-0 absolute"
                :type="multiple ? 'checkbox' : 'radio'" :name="props.multiple ? method.id : 'payment-method'" />
            <div
                class="text-xs absolute z-40 top-0 left-0 peer-checked:scale-90 peer-checked:border-custom-blue peer-checked:text-custom-blue transition peer-checked:bg-custom-blue/10 peer-checked:font-bold w-full h-full border-2 rounded-lg grid place-items-center">
                {{ method.label }}</div>
        </lebel>
    </div>
</template>

<style></style>