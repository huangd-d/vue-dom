// 引入 defineStore
import { GET } from '@/utils/request';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserStore = defineStore('user', () => {
    // 定义状态
    const user = ref({});
    const menus = ref([]);

    // 定义方法
    const getUserInfo = async () => {
        // 获取用户信息
        const { data } = await GET(`/getUser`);
        user.value = data.user;
        menus.value = data.menus;
    }


    return { user, menus, getUserInfo };
})