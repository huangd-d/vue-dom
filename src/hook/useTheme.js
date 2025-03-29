import { onUnmounted, ref } from 'vue';

let themeListenerAdded = false; // 全局标记是否已添加监听

export default function useTheme() {
    const theme = ref('light');

    const toggleTheme = (t = 'light') => {
        document.documentElement.setAttribute('data-theme', t);
        theme.value = t;
    };

    if (!themeListenerAdded) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = (e) => {
            console.log('themechange', e, e.matches);
            const newTheme = e.matches ? 'dark' : 'light';
            toggleTheme(newTheme);
        };

        mediaQuery.addEventListener('change', handleThemeChange);
        themeListenerAdded = true;

        // 初始化设置当前系统主题
        toggleTheme(mediaQuery.matches ? 'dark' : 'light');

        // 组件卸载时移除监听
        onUnmounted(() => {
            mediaQuery.removeEventListener('change', handleThemeChange);
            themeListenerAdded = false;
        });
    }

    return {
        theme,
        toggleTheme,
    };
}