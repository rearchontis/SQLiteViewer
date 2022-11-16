import React, {useRef} from 'react';
import {WebView, type WebViewMessageEvent} from 'react-native-webview';
import {queryDataFromTable, queryTables} from './db';

export const WebViewWrapper = () => {
  const ref = useRef<WebView>(null);

  const handler = async (event: WebViewMessageEvent) => {
    switch (event.nativeEvent.data) {
      case 'queryTables':
        const response = await queryTables();

        ref.current?.postMessage(JSON.stringify(response));
        break;
      case 'queryClients':
        const result = await queryDataFromTable('clients');

        ref.current?.postMessage(JSON.stringify(result));
        break;
    }
  };

  return (
    <WebView
      ref={ref}
      onMessage={handler}
      source={{uri: 'http://localhost:8000/'}}
    />
  );
};
