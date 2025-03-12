// vue-localforage.js
import localForage from 'localforage'

const VueLocalForage = {
    install(app, options = {}) {
        // 配置 localforage（可选）
        if (options.config) {
            localForage.config(options.config)
        }

        // 添加全局属性
        const prototypeMethods = {
            $getItem: (key) => localForage.getItem(key),
            $setItem: (key, value) => localForage.setItem(key, value),
            $removeItem: (key) => localForage.removeItem(key),
            $clearStorage: () => localForage.clear(),
            $lengthOfStorage: () => localForage.length(),
            $keyInStorage: (keyIndex) => localForage.key(keyIndex),
            $keysInStorage: () => localForage.keys(),
            $iterateStorage: (iteratorCallback) => localForage.iterate(iteratorCallback),
            $setStorageDriver: (driverName) => localForage.setDriver(driverName),
            $storageConfig: (options) => localForage.config(options)
        }

        // 挂载到 app 全局属性
        Object.entries(prototypeMethods).forEach(([name, method]) => {
            app.config.globalProperties[name] = method
        })

        // 创建独立 API 对象
        const localForageAPI = {
            getItem: prototypeMethods.$getItem,
            setItem: prototypeMethods.$setItem,
            removeItem: prototypeMethods.$removeItem,
            clear: prototypeMethods.$clearStorage,
            length: prototypeMethods.$lengthOfStorage,
            key: prototypeMethods.$keyInStorage,
            keys: prototypeMethods.$keysInStorage,
            iterate: prototypeMethods.$iterateStorage,
            setDriver: prototypeMethods.$setStorageDriver,
            config: prototypeMethods.$storageConfig
        }

        // 挂载到 app 实例
        app.provide('localForage', localForageAPI) // 提供注入方式
        app.config.globalProperties.$localForage = localForageAPI // 挂载全局属性
    },
    version: '1.0.0' // 更新版本号
}

export default VueLocalForage
