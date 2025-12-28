export const useInquiryResuslt = defineStore('inquiry-result' , () => {
    const state = reactive({
        // mobile and shared
        totalDebt: 0,
        payable: 0,
        details: {},
        mobile: null
    })

    return {state}
})