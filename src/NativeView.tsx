import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import RNFS, {type DownloadFileOptions} from 'react-native-fs';
import {Root} from './RootNavigator';
import {queryTables} from './db';
import {WebViewWrapper} from './WebViewWrapper';

const loadSQLiteFile = async () => {
  const options: DownloadFileOptions = {
    // ipconfig getifaddr en0
    fromUrl: 'http://localhost:3000/main.db',
    toFile: RNFS.DocumentDirectoryPath + '/main.db',
    begin: res => {
      console.log(`Starting to load ${res.jobId}`);
    },
    progress: res => {
      const currentProgress = (res.bytesWritten * 100) / res.contentLength;
      console.log(`loaded => ${currentProgress.toFixed(2)}%`);
    },
  };

  return await RNFS.downloadFile(options);
};

export const NativeView = () => {
  const [tables, setTables] = useState<object[]>([]);

  useEffect(() => {
    (async () => {
      setTables(await queryTables());
    })();
  }, []);

  return tables.length > 0 ? (
    <WebViewWrapper />
  ) : (
    <Button title="Load SQLite File" onPress={loadSQLiteFile} />
  );
};
