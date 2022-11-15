# SQLiteViewer

## Supported platforms status:
1. iOS: ✔️
2. android: not ready yet (requires https for serving db file)

## Setup
1. Setup environment for React Native development: https://reactnative.dev/docs/environment-setup
2. Install Node.js v16
3. Clone this repo
4. Put your SQLite file in `./server` folder. Server requires for name `main.db`, but you can change path and file name in `./server/index.mjs`
5. Install npm dependencies: `npm i`
6. Install pods dependencies: `cd ios && pod install && cd ..`
7. Build iOS app: `npm run ios`

## How to use
1. Run server: `npm run server`
2. Open app in iPhone simulator (if react-native didn't open it for you)
3. When app will start first time, it will render only one button to load DB file. Loading progress you'll see in terminal. After loading ending, you'll need to restart app in simualtor(double r)
