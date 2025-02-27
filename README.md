# Monetag Telegram SDK

You can use this package to display ads in your Telegram Mini-App. Rewarded Interstitial, Rewarded Pop, In-App Interstitial formats are supported. To use it, all you need is a Rewarded Interstitial zone ID.

In the examples the code is for React applications, however, this package can be used for applications using other libraries and frameworks as well.

### Rewarded Interstitial

To show Rewarded Interstitial, you need to call `adHandler`, which is returned from the `createAdHandler` function. `adHandler` will return Promise, which will execute after the user watches the ad.

```jsx
import React from 'react'
import createAdHandler from 'monetag-tg-sdk'

const adHandler = createAdHandler(REWARDED_INTERSTITIAL_ZONE_ID)

function RewardComponent () {
    const [balance, setBalance] = React.useState(0)

    const showAd = () => {
        adHandler().then(() => {
            setBalance(balance + 1)
        })
    }

    return (
        <div>
            <p>Balance: {balance}</p>
            <button onClick={showAd}>Get reward for watching ad</button>
        </div>
    )
}
```

### Rewarded Pop

To show Rewarded Pop, you need to call `adHandler` with the `'pop'` parameter, which is returned from the `createAdHandler` function. `adHandler` will return Promise, which will execute after the user watches the ad.

```jsx
import React from 'react'
import createAdHandler from 'monetag-tg-sdk'

const adHandler = createAdHandler(REWARDED_INTERSTITIAL_ZONE_ID)

function RewardComponent () {
    const [balance, setBalance] = React.useState(0)

    const showAd = () => {
        adHandler('pop').then(() => {
            setBalance(balance + 1)
        })
    }

    return (
        <div>
            <p>Balance: {balance}</p>
            <button onClick={showAd}>Get reward for watching ad</button>
        </div>
    )
}
```

### In-App Interstitial

To enable the In-App Interstitial mechanism you need to call `adHandler` with settings for In-App Interstitial. `adHandler` is returned when the `createAdHandler` function is called. Ads will be displayed automatically according to the settings: `frequency` of displays during `capping` hours with `interval` seconds between them and `timeout` seconds delay before the first display.

```jsx
import createAdHandler from 'monetag-tg-sdk'

const adHandler = createAdHandler(REWARDED_INTERSTITIAL_ZONE_ID)

adHandler({
    type: 'inApp',
    inAppSettings: {
      frequency: 3,
      capping: 0.5,
      interval: 30,
      timeout: 10,
    },
})
```
