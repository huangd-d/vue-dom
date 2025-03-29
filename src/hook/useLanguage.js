import { onUnmounted, ref } from 'vue';

let languageListenerAdded = false; // 全局标记是否已添加监听

export default function useLanguage() {
    const lang = ref('zh-CN');

    const setLang = (l = 'zh-CN') => {
        lang.value = l;
    };

    if (!languageListenerAdded) {
        const handleLanguageChange = (e) => {
            console.log('languagechange', e, navigator.language);
            setLang(navigator.language);
        };

        window.addEventListener('languagechange', handleLanguageChange);
        languageListenerAdded = true;

        // 组件卸载时移除监听（虽然hook通常不会卸载）
        onUnmounted(() => {
            window.removeEventListener('languagechange', handleLanguageChange);
            languageListenerAdded = false;
        });
    }

    return {
        lang,
        setLang,
    };
}