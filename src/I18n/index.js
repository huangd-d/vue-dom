import { createI18n } from 'vue-i18n';

// 动态加载 src/下面所有文件 匹配以 .en.js .zh.js 结尾的文件
const modules = import.meta.glob('/src/**/*.(en|zh).js', { eager: true });
// 读取 文件 default 导出的对象
const messagesObj = {
    en: {},
    zh: {}
};

Object.keys(modules).forEach((key) => {
    const fileName = key.split('/').pop().replace(/.(en|zh)\.js/, ''); // 获取文件名部分，例如：en.js
    if (key.endsWith('.en.js')) {
        Object.keys(modules[key].default).forEach((k) => {
            messagesObj['en'][`${fileName}.${k}`] = modules[key].default[k]; // 合并对象
        });
    } else if (key.endsWith('.zh.js')) {
        Object.keys(modules[key].default).forEach((k) => {
            messagesObj['zh'][`${fileName}.${k}`] = modules[key].default[k]; // 合并对象
        });
    }

});
console.log(messagesObj, modules);


// 注册 `formatter` 选项
const i18n = createI18n({
    locale: 'en-US',
    legacy: false,
    // formatter: new CustomFormatter(/* 这里是构造函数选项 */),
    messages: {
        'en-US': messagesObj.en,
        'zh-CN': messagesObj.zh
    }
});


export default i18n;