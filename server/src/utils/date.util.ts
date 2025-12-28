export const dateToLocale = (date: Date | number, locale: string | ('fa-ir' | 'en-us')) => {
    const parse = Intl.DateTimeFormat(locale)
    return parse.format(date)
}