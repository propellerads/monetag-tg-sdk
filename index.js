const ERR_NO_DOCUMENT = 'monetag-tg-sdk only supports the browser environment'
const ERR_SCRIPT_LOAD = 'Error communicating with the ad server'

const SCRIPT_URL = '//ushoaglosee.com/sdk.js'
const MOUNT = typeof document !== 'undefined' ? document.body || document.documentElement : null

export default function createAdHandler (zoneid) {
    if (!MOUNT) {
        throw new Error(ERR_NO_DOCUMENT)
    }

    const script = document.createElement('script')
    const handlerName = `show_${zoneid}`
    const cache = []
    let loaded = false

    const onLoad = () => {
        loaded = true

        cache.forEach((item) => {
            if (typeof window[handlerName] !== 'function') {
                item[2](new Error(ERR_SCRIPT_LOAD))
            } else {
                window[handlerName](item[0]).then(item[1]).catch(item[2])
            }
        })
    }

    script.src = SCRIPT_URL
    script.dataset.zone = zoneid
    script.dataset.sdk = handlerName

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onLoad)
    MOUNT.appendChild(script)

    return (options) => {
        if (typeof window[handlerName] !== 'function') {
            return new Promise((resolve, reject) => {
                if (loaded) {
                    return reject(new Error(ERR_SCRIPT_LOAD))
                }

                cache.push(options, resolve, reject)
            })
        }

        return window[handlerName](options)
    }
}
