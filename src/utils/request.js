// import { message } from '@south/message';
import { getToken, removeToken } from '@/utils/auth';
// import { message } from 'antd';
import axios from 'axios';
import AxiosRequest from './Axios';

/**
 * 创建请求
 * @param url - 链接地址
 */
function creteRequest(url) {
    return new AxiosRequest({
        baseURL: url,
        timeout: 180 * 1000,
        interceptors: {
            requestInterceptors(res) {
                const tokenLocal = getToken() || '';
                if (res?.headers && tokenLocal) {
                    res.headers.Authorization = tokenLocal;
                }
                return res;
            },
            requestInterceptorsCatch(err) {
                // message.error('请求超时！');
                return err;
            },
            responseInterceptors(res) {
                const { data } = res;
                if (data?.code === 401) {
                    const lang = localStorage.getItem('lang');
                    const enMsg = 'Insufficient permissions, please log in again!';
                    const zhMsg = '权限不足，请重新登录！';
                    const msg = lang === 'en' ? enMsg : zhMsg;
                    removeToken();
                    // message.error({
                    //     content: msg,
                    //     key: 'error'
                    // });
                    console.error('错误信息:', data?.message || msg);

                    const url = window.location.href;
                    if (url.includes('#')) {
                        window.location.hash = '/login';
                    } else {
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1000);
                    }
                    return res;
                }

                if (data?.code !== 200) {
                    handleError(data?.message);
                    return res;
                }

                return res;
            },
            responseInterceptorsCatch(err) {
                if (axios.isCancel(err)) {
                    err.data = err.data || {};
                    return err;
                }

                handleError('服务器错误！');
                return err;
            }
        }
    });
}

const request = creteRequest(import.meta.env.VITE_API_BASE_URL);
const GET = (url, params) => request.get(url, { params });
const POST = (url, data) => request.post(url, data);
const PUT = (url, data) => request.put(url, data);
const DELETE = (url, data) => request.delete(url, { data });
const POST_UPLOAD = (url, data) => request.post(url, data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
const GET_DOWNLOAD = (url, params) => request.get(url, { params, responseType: 'blob' });

export { DELETE, GET, GET_DOWNLOAD, POST, POST_UPLOAD, PUT };

/**
 * 异常处理
 * @param error - 错误信息
 * @param content - 自定义内容
 */
const handleError = (error) => {
    console.error('错误信息:', error);
    // message.error({
    //     content: content || error || '服务器错误',
    //     key: 'error'
    // });
};


