import React, {useRef} from 'react';
import {Platform} from 'react-native';
import {WebView, type WebViewMessageEvent} from 'react-native-webview';

import {SQLiteConnection} from './db';

export const WebViewWrapper = () => {
    const ref = useRef<WebView>(null);

    const handler = async (event: WebViewMessageEvent) => {
        const message = JSON.parse(event.nativeEvent.data);
        console.log('Recived message from WebView:', message);

        const db = await SQLiteConnection();
        const result = await db.executeSql(message.sql);

        db.close();

        ref.current?.postMessage(JSON.stringify(result[0].rows.raw()));
    };

    const localhost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

    return <WebView ref={ref} onMessage={handler} source={{uri: `http://${localhost}:8020/`}} />;
};
