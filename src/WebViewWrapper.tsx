import React from 'react';
import {WebView} from 'react-native-webview';
import {queryTables} from './db';

export class WebViewWrapper extends React.Component {
  webViewRef: React.RefObject<{current: {postMessage: (str: string) => void}}>;
  state = {};

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.webViewRef = React.createRef();
  }

  render() {
    return (
      <WebView
        source={{
          uri: 'http://localhost:8001/',
        }}
        ref={this.webViewRef}
        onMessage={async event => {
          if (event.nativeEvent.data === 'queryTables') {
            this.webViewRef.current?.postMessage(
              JSON.stringify(await queryTables()),
            );
            // console.log(await db.executeSql('SELECT * FROM Clients'));
          }
        }}
      />
    );
  }
}
