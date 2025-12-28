import { defineStore } from "pinia";
import type {NavbarList} from "~/types/types"
import ServicesData from "~/content/services.json"

export const useNavbar = defineStore('navbar', () => {
    const list: NavbarList[] = [
        {
            label: "خدمات پرداخت",
            to: "",
            icon: "list",
            disabled: true,
            children: true,
            onClick: (event: Event) => {
                event.preventDefault()
                state.serviceModal = !state.serviceModal
                console.clear()
            }
        },
        {
            label: "نسخه شرکت ها",
            to: "#",
            icon: "arrowDown",
            disabled: true,
            onClick: () => {}
        },
        {
            label: "پشتیبانی",
            to: "/support",
            disabled: false,
            onClick: () => {}
        },
        {
            label: "بلاگ",
            to: "/blog",
            disabled: true,
            onClick: () => {}
        }
    ],
    services = ServicesData,
    state = reactive({
        serviceModal: false
    })

    return {
        list,
        state,services
    }
})