<script setup>
import { useUser } from '~/stores/user.store';
const { state, userLogout } = useUser()
const utils = [
    {
        to: state.user === null ? '/login' : "",
        icon: "profile",
        label: state.user ? state.user.phone : "ورود به حساب",
        showChilrenWhileLogin: state.user !== null,
        children: [
            {
                to: "/profile",
                icon: "profile",
                label: 'حساب کاربری'
            },
            {
                to: "/wallet",
                icon: "wallet",
                label: 'کیف پول'
            },
            {
                to: "/wallet/history",
                icon: "bank",
                label: 'تراکنش های کیف پول'
            },
            {
                to: "/bills",
                icon: "bill",
                label: 'قبض های پرداخت شده  '
            }
        ]
    },
    {
        to: "/shopping",
        icon: "shopping",
        showChilrenWhileLogin: false,
        label: "سبد قبض"
    },
    {
        to: "/history",
        icon: "cardToCard",
        showChilrenWhileLogin: false,
        label: "سوابق پرداخت"
    }
]
</script>
<template>
    <div class="flex items-center gap-5">
        <NuxtLink v-for="util of utils" :to="util.to"
            class="flex items-center gap-3 transition group duration-300 hover:scale-110 relative">
            <AppIcon :name="util.icon" size="30" class="rounded-lg text-custom-blue bg-custom-blue/20 p-[5px]" />
            <span class="text-xs">{{ util.label }}</span>
            <ul class="absolute top-full left-0 w-[230px]  bg-custom-white/70 border transition -translate-y-5 duration-400 group-hover:-translate-y-0 border-slate-100 backdrop-blur-sm rounded-2xl p-2 invisible group-hover:visible opacity-0 group-hover:opacity-100"
                v-if="util.showChilrenWhileLogin">
                <li v-for="child of util.children">
                    <NuxtLink class="flex items-center gap-2 text-xs hover:bg-custom-whitesmoke/70 rounded-xl px-3 py-2"
                        :to="child.to">
                        <AppIcon :name="child.icon" class="text-slate-500" />
                        <span>{{ child.label }}</span>
                    </NuxtLink>
                </li>
                <hr class="my-2 border-custom-blue/20">
                <li @click="userLogout" class="cursor-pointer">
                    <NuxtLink
                        class="flex items-center gap-2 text-xs hover:bg-custom-whitesmoke/70 rounded-xl px-3 py-2">
                        <AppIcon name="logout" />
                        <span>خروج</span>
                    </NuxtLink>
                </li>
            </ul>
        </NuxtLink>
    </div>
</template>