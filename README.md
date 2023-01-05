# SQLiteViewer

## Supported platforms status:
1. iOS: ✔️
2. android: ✔️

## Setup
1. Setup environment for React Native development: https://reactnative.dev/docs/environment-setup
2. Install Node.js v16
3. Clone this repo
4. Put your SQLite file in `./server` folder. Server requires for name `main.db`, but you can change path and file name in `./server/index.mjs`
5. Install npm dependencies: `npm i`
6. Install web dependencies: `cd web && npm i && cd ..`
7. Install pods dependencies: `cd ios && pod install && cd ..`
8. Build iOS app: `npm run ios`
9. Build Android app: `npm run android`

## How to use
1. Run server: `npm run server`
2. Open app in iPhone simulator / Android Emulator (if react-native didn't open it for you)
3. When app will start first time, it will render only one button to load DB file. Loading progress you'll see in terminal. After loading ending, you'll probably be need to restart app in simualtor/emulator(`r` in terminal with metro process)
4. You can switch between webview and native view using checkbox on the top of the app
5. In webview you can request tables list or send to React Native custom SQL. The result of the query should be immedeately appeared in WebView as a list of data
6. In native view you can navigate between different tables and open any of them to theirs content