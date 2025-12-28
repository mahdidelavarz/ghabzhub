export const seperateNumbers = (value: number): string => {
    return value.toString().replace(/(?<=\d)(?=(\d{3})+(?!\d))/g, ',')
}

export const parseSeperatedNumber = (spNumber: string): number => {
    return Number(spNumber.toString().replace(/[,]/g, ''))
}

export const checkInquiryAndReturn = (inc: any, path: string): void => {
    onBeforeMount(() => {
        if (!inc.state.totalDebt || inc.state.totalDebt === 'null') {
            useCookie("inquiry").value = null
            navigateTo("/mobile")
        }
    })
}