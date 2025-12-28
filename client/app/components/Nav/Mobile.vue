<script setup lang="js">
const route = useRoute(),
    router = useRouter(),
    menuIsOpen = ref(false),
    { services } = useNavbar(),
    { state, userLogout } = useUser();

watchEffect(() => {
    if ('o' in route.query)
        menuIsOpen.value = true
    else
        menuIsOpen.value = false
})

const returnAndCloseMenu = () => {
    if (menuIsOpen) {
        router.back()
    }
}
</script>

<template>
    <nav
        class="lg:hidden block z-30 fixed bottom-0 bg-custom-white rounded-t-3xl shadow-2xl shadow-black/70 border border-slate-100 left-1/2 -translate-x-1/2 w-full">
        <ul class="grid grid-cols-4 p-2 cursor-pointer">
            <li>
                <NuxtLink to="/" class="link flex items-center max-sm:flex-col justify-center gap-x-3 py-2">
                    <AppIcon name="home" class="text-neutral-700" size="40" />
                    <span class="text-sm">خانه</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/history" class="link flex items-center max-sm:flex-col justify-center gap-x-3 py-2">
                    <AppIcon name="wallet" class="text-neutral-700" size="40" />
                    <span class="text-sm">سوابق</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/shopping" class="link flex items-center max-sm:flex-col justify-center gap-x-3 py-2">
                    <AppIcon name="shopping" class="text-neutral-700" size="40" />
                    <span class="text-sm">سبد قبض</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="?o=1" class="flex items-center max-sm:flex-col justify-center gap-x-3 py-2">
                    <AppIcon name="app" class="text-neutral-700" size="40" />
                    <span class="text-sm">منو</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>

    <!-- Menu DropDown -->
    <div class="fixed lg:hidden pb-28 z-20 top-0 left-0 w-full opacity-0 transition h-screen overflow-y-auto bg-custom-white translate-x-full"
        :class="{ 'opacity-100 !translate-x-0': menuIsOpen }">
        <div class="menu-header">
            <div class="flex justify-end">
                <button @click="returnAndCloseMenu">
                    <AppIcon name="close" class="text-custom-white" size="40" />
                </button>
            </div>
            <div class="grid place-items-center gap-4">
                <AppIcon name="profile" size="120"
                    class="text-custom-white bg-custom-blue/40 rounded-full p-2 shadow-2xl shadow-custom-blue" />
                <div class="flex items-center w-full justify-between px-2 py-1">
                    <p class="text-custom-white text-xl font-bold">
                        {{ state?.user ? state.user.phone : 'کاربر مهمان' }}
                        <sub>{{ state.user ? `${state.user.name} ${state.user.family}`: '' }}</sub>
                    </p>
                    <NuxtLink v-if="!state.user" to="/login"
                        class=" text-lg rounded-2xl bg-custom-white/10 hover:bg-custom-white/30 transition border border-slate-100 px-3 py-2 text-custom-white">
                        ورود/ثبت نام</NuxtLink>
                    <NuxtLink v-if="state.user" to="/profile"
                        class=" text-lg rounded-2xl bg-custom-white/10 hover:bg-custom-white/30 transition border border-slate-100 px-3 py-2 text-custom-white">
                        حساب کاربری</NuxtLink>
                </div>
            </div>
        </div>

        <!-- Services -->
        <ul class="mt-3">
            <li v-for="service of services.categories" class="p-3 transition group hover:scale-95">
                <div class="flex items-center gap-3">
                    <AppIcon :name="service.icon" size="40" class="p-2 text-slate-50 rounded-2xl"
                        :style="{ 'background-color': service.color }" />
                    <p class="text-lg">{{ service.label }}</p>
                </div>

                <ul class="group-hover:grid grid-cols-6 gap-2 hidden mt-4">
                    <li v-for="item of services[service.id]"
                        class="p-2 bg-custom-whitesmoke rounded-2xl grid place-items-center text-center">
                        <AppIcon :name="item.icon" size="30" :style="{ color: service.color }" />
                        <p class="text-xs">{{ item.label }}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <br>
        <hr><br>
        <ul class="mt-3">
            <li class="p-3 transition group hover:scale-95" v-if="state.user">
                <NuxtLink to="/wallet" class="flex items-center gap-3">
                    <AppIcon name="wallet" size="40" class="p-2 rounded-2xl" />
                    <p class="text-lg">کیف پول من</p>
                </NuxtLink>
            </li>
            <li class="p-3 transition group hover:scale-95" v-if="state.user">
                <NuxtLink to="/wallet" class="flex items-center gap-3">
                    <AppIcon name="bank" size="40" class="p-2 rounded-2xl" />
                    <p class="text-lg">تراکنش های کیف پول</p>
                </NuxtLink>
            </li>
            <li class="p-3 transition group hover:scale-95" v-if="state.user">
                <NuxtLink to="/bills" class="flex items-center gap-3">
                    <AppIcon name="bill" size="40" class="p-2 rounded-2xl" />
                    <p class="text-lg">قبض های پرداخت شده</p>
                </NuxtLink>
            </li>
            <li class="p-3 transition group hover:scale-95">
                <NuxtLink to="/support" class="flex items-center gap-3">
                    <AppIcon name="support" size="40" class="p-2 rounded-2xl" />
                    <p class="text-lg">پشتیبانی</p>
                </NuxtLink>
            </li>
            <li class="p-3 transition group hover:scale-95">
                <NuxtLink to="/blog" class="flex items-center gap-3">
                    <AppIcon name="blog" size="40" class="p-2 rounded-2xl" />
                    <p class="text-lg">بلاگ</p>
                </NuxtLink>
            </li>
            <li class="p-3 transition group hover:scale-95">
                <NuxtLink to="/org" class="flex items-center gap-3">
                    <AppIcon name="accessTime" size="40" class="p-2 rounded-2xl" />
                    <p class="text-lg">نسخه سازمانی</p>
                </NuxtLink>
            </li>
            <li class="p-3 transition group hover:scale-95" v-if="state.user">
                <NuxtLink @click="userLogout" class="flex items-center gap-3 text-red-500 font-bold">
                    <AppIcon name="logout" size="40" class="p-2 rounded-2xl text-red-500" />
                    <p class="text-lg">خروج از حساب کاربری</p>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.link.active-link.exact-active-link {
    @apply bg-custom-blue/10 rounded-3xl text-custom-blue font-bold;
}

.link.active-link.exact-active-link svg {
    @apply text-custom-blue;
}

.menu-header {
    background: linear-gradient(27.5deg, #0f93ff, #1596ff 25%, #219bff 0, #1a98ff 40%, #0f93ff 0, #219bff 52%, #0f93ff 0, #0f93ff);
    @apply p-3 rounded-b-3xl;
}
</style>