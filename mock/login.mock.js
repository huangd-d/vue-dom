import path from 'node:path';
import { createDefineMock } from 'vite-plugin-mock-dev-server';

const defineBaseUrlMock = createDefineMock((mock) => {
    mock.url = path.join('/devApi', mock.url);
});

export default defineBaseUrlMock([
    {
        url: `/login`, // 动态拼接基础路径
        method: 'POST',
        delay: 2000,
        body: {
            code: 200,
            message: '登录成功',
            data: {
                token: '123456789',
            },
        },
    },
    {
        url: `/getUser`,
        method: 'GET',
        delay: 2000,
        body: {
            code: 200,
            message: '用户信息获取成功',
            data: {
                user: {
                    id: 'xxxxx',
                    name: `Admin`,
                },
                permissions: [],
            },
        },
    },
    {
        url: `/getMenu`,
        method: 'GET',
        delay: 2000,
        body: {
            code: 200,
            message: '菜单获取成功',
            data: [
                {
                    id: '1',
                    name: '首页',
                    path: '/home',
                    icon: 'HomeOutlined',
                },
                {
                    id: '2',
                    name: '系统管理',
                    path: '/system',
                    icon: 'SettingOutlined',
                    children: [
                        {
                            id: '2-1',
                            name: '用户管理',
                            path: '/system/user',
                            icon: 'UserOutlined',
                        },
                    ]
                }
            ],
        },
    },
]);