import axios from 'axios';

class AxiosRequest {
    constructor(config) {
        this.instance = axios.create(config);
        this.abortControllerMap = new Map();
        this.interceptorsObj = config.interceptors;

        this.instance.interceptors.request.use(
            (res) => {
                const controller = new AbortController();
                let url = `${res.method}_${res.url}`;
                res.signal = controller.signal;

                if (res.params) {
                    for (const key in res.params) {
                        url += `&${key}=${res.params[key]}`;
                    }
                }

                if (res.data && res.data[0] === '{' && res.data[res.data.length - 1] === '}') {
                    const obj = JSON.parse(res.data);
                    for (const key in obj) {
                        url += `#${key}=${obj[key]}`;
                    }
                }

                if (this.abortControllerMap.get(url)) {
                    console.warn('取消重复请求：', url);
                    this.cancelRequest(url);
                } else {
                    this.abortControllerMap.set(url, controller);
                }

                return res;
            },
            (err) => err,
        );

        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch,
        );
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch,
        );
        this.instance.interceptors.response.use(
            (res) => {
                const url = `${res.config.method}_${res.config.url}`;
                this.abortControllerMap.delete(url);
                return res.data;
            },
            (err) => err,
        );
    }

    cancelAllRequest() {
        for (const [, controller] of this.abortControllerMap) {
            controller.abort();
        }
        this.abortControllerMap.clear();
    }

    cancelRequest(url) {
        const urlList = Array.isArray(url) ? url : [url];
        for (const _url of urlList) {
            this.abortControllerMap.get(_url)?.abort();
            this.abortControllerMap.delete(_url);
        }
    }

    get(url, options = {}) {
        return this.instance.get(url, options);
    }

    post(url, options = {}, config) {
        return this.instance.post(url, options, config);
    }

    put(url, options = {}, config) {
        return this.instance.put(url, options, config);
    }

    delete(url, options = {}) {
        return this.instance.delete(url, options);
    }
}

export default AxiosRequest;