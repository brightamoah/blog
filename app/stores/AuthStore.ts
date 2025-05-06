import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('AuthStore', () => {
    const email = ref<string>('')


    
    return {
        email,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
