# Quasar App


## Dependencies
App needs: [Node.js](https://nodejs.org/en/), [Quasar Framework](https://v1.quasar-framework.org/), [Cordova](https://cordova.apache.org/), [Android SDK](https://developer.android.com/studio).


## Configurating
[config.json](config.json) - to change backend url


### Run development mode 

```bash
npm install
quasar dev # run in browser
# or
quasar dev -m cordova -T android # run like mobile app
```


### Run production mode

```bash
npm install
quasar build # build for production
# or
quasar build -m cordova -T android # build mobile app
```
