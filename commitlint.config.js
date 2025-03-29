
export default {
    // 继承基础的提交规范配置
    extends: ['@commitlint/config-conventional'],
    rules: {
        // 提交类型枚举，2表示必须，always表示始终验证，数组列出允许的类型
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert']],
        // 作用域枚举，限定只能使用指定的scope值
        'scope-enum': [2, 'always', ['home', 'user', 'about']],
        // 禁止在subject结尾使用句点
        'subject-full-stop': [2, 'never', '.'],
        // 不限制subject的大小写（0表示禁用此规则）
        'subject-case': [0],
        // 不限制header的最大长度（0表示禁用此规则）
        'header-max-length': [0, 'always', 72]
    }
};
