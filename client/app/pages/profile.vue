<script setup>
definePageMeta({ middleware: "auth-client" })
useSeoMeta({
    title: "حساب کاربری - قبض هاب"
})
const { userLogout, state, editUser } = useUser(),
    userData = reactive({
        name: state.user.name,
        family: state.user.family
    })

async function updateUserInformation() {
    // console.log(userData);
    
    await editUser(userData.name, userData.family)
}
</script>
<template>
    <div class="lg:w-10/12 mx-auto">
        <SplitLayout class="lg:p-3" grid-class="grid-cols-1">
            <template #right-top>
                <div class="px-7 py-6 flex justify-between items-center">
                    <h4 class="text-3xl flex items-center gap-3 font-[iransans-black] text-custom-white ">
                        <AppIcon name="profile" size="30" />
                        حساب کاربری
                    </h4>
                    <button @click="userLogout"
                        class="px-6 py-3 text-center hover:bg-custom-blue/40 bg-custom-blue/20 border border-slate-100/30 text-xs text-custom-white rounded-xl ">
                        <AppIcon name="logout" size="18" class="inline" />
                        خروج
                    </button>
                </div>
            </template>

            <!-- left -->
            <template #right-bottom>
                <div class="bg-white px-7 py-14 rounded-3xl relative">
                    <div class="grid lg:grid-cols-2 gap-6">
                        <div class=" space-y-1 select-none pointer-events-none">
                            <p class="font-bold text-sm px-2">شماره موبایل</p>
                            <p class="text-sm py-3 px-4 rounded-2xl bg-custom-whitesmoke blur-[.5px]">
                                {{ state.user.phone }}
                            </p>
                        </div>
                        <div class=" space-y-1 select-none pointer-events-none">
                            <p class="font-bold text-sm px-2">وضعیت فعلی شما</p>
                            <p class="text-sm py-3 px-4 rounded-2xl bg-custom-whitesmoke blur-[.5px] text-custom-green"
                                :class="{ '!text-red-500': !state.user.isActive }">
                                {{
                                    state.user.isActive
                                        ? 'شما در وضعیت فعال هستید'
                                        : 'حساب شما غیر فعال است از پشتبانی پیگیری شود'
                                }}
                            </p>
                        </div>
                        <div class="space-y-1">
                            <label for="user-name" class="block font-bold text-sm px-2">نام مستعار</label>
                            <input id="user-name" placeholder="نام خود را وارد کنید" v-model="userData.name" type="text"
                                class="w-full text-sm py-3 px-4 rounded-2xl bg-custom-whitesmoke text-neutral-800" />
                        </div>
                        <div class=" space-y-1 ">
                            <label for="user-family" class="block font-bold text-sm px-2">نام خانوادگی</label>
                            <input id="user-family" placeholder="نام خانوادگی را وارد کنید" v-model="userData.family"
                                type="text"
                                class="w-full text-sm py-3 px-4 rounded-2xl bg-custom-whitesmoke text-neutral-800" />
                        </div>
                    </div><br>
                    <AppButton @click="updateUserInformation" color="green"
                        class="min-w-32 justify-center py-4 text-sm flex justify-self-end" label="اعمال تغییرات" />
                </div>
            </template>
        </SplitLayout>
    </div>
</template>