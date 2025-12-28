import PinInput from 'v-pin-input'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default defineNuxtPlugin(nuxtApp => {    
    const app = nuxtApp.vueApp
    app.use(PinInput)
    app.use(Vue3Toastify, {
        autoClose: 5000,
        closeOnClick: true,
        closeButton: false,
        position: 'top-center',
        progressStyle: {
            backgroundColor: '#0078d7',
            height: '4px'
        },
        transition:'bounce',
        rtl: true,
        theme: 'light',
        pauseOnHover: true  
    } as ToastContainerOptions)
})