import { toast } from "vue3-toastify"

export const useMobileService = defineStore('service-mobile', () => {
    const state = reactive({
        status: true,
        loading: false,
        serviceNames: ['mci', 'irancell'],
        transportation: null,
        operator: '',
        mobilePrefix: {
            "mci": [
                "0910",
                "0990",
                "0991",
                "0992",
                "0993",
                "0994",
                "0996",
                "0911",
                "0912",
                "0913",
                "0914",
                "0915",
                "0916",
                "0917",
                "0918",
                "0919"
            ],
            "mtn": [
                "0900",
                "0901",
                "0902",
                "0903",
                "0904",
                "0905",
                "0930",
                "0933",
                "0935",
                "0936",
                "0937",
                "0938",
                "0939",
                "0941"
            ]
        }
    })

    const preventLetters = (value: string) => {
        return value.replace(/[^\d]/g, '')
    }

    const operatorName = (phone: string) => {
        const entries = Object.entries(state.mobilePrefix)
        let operator = ''

        for (let prefix of entries) {
            prefix[1].forEach((p,index) => {
                if (phone.startsWith(p)) {
                    operator = prefix[0]
                }
            })

            if (operator) {
                state.operator = operator
            } 
            else {
                state.operator = '0'
            }
        }
    }

    const selectTransportation = (t: 'mci' | 'mtn') => {
        state.operator = t
    } 

    const inquiry = async (mobileNumber: string, operator: 'mci' | 'mtn') => {
        if (!mobileNumber || !operator) {
            return toast.error("لطفا موارد خواسته شده برای استعلام را وارد کنید")
        }
        try {
            state.loading = true
            const data = await $fetch(`/api/services/bill-and-mobile/operators?operator=${operator}`, {
                method: "post",
                body: {
                    mobileNumber,
                }
            })
            // @ts-ignore
            if (data.isSuccess === true) {
                // @ts-ignore
                useCookie('inquiry').value = JSON.stringify({ result: data?.data.result, type: 'mobile', phone: mobileNumber })
                navigateTo("/bill/inquiry")
            } else {
                toast.error("استعلام با خطا مواجه شد دوباره امتحان کنید")
            }
            
        } catch (err) {
            // @ts-ignore
            handleHubApiErrors(err.statusCode)
        } finally {
            state.loading = false
        }
    }

    return {
        state,
        inquiry,
        preventLetters,
        operatorName,selectTransportation
    }
})