import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Platform} from 'react-native';
import RNFS, {type DownloadFileOptions} from 'react-native-fs';
import {queryTables} from './db';
import {Root} from './Root';
import {WebViewWrapper} from './WebViewWrapper';

export const NativeView = () => {
    const [tables, setTables] = useState<Array<object>>([]);
    const [isWebView, setIsWebView] = useState(false);

    const loadSQLiteFile = () => {
        const localhost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

        const options: DownloadFileOptions = {
            // ipconfig getifaddr en0
            fromUrl: `http://${localhost}:3000/main.db`,
            toFile: RNFS.DocumentDirectoryPath + '/main.db',
            begin: res => {
                console.log(`Starting to load ${res.jobId}`);
            },
            progress: async res => {
                const currentProgress = (res.bytesWritten * 100) / res.contentLength;
                console.log(`loaded => ${currentProgress.toFixed(2)}%`);

                if (currentProgress === 100) {
                    console.log(`saved file to ${RNFS.DocumentDirectoryPath + '/main.db'}`);

                    setTables(await queryTables());
                }
            },
        };

        return RNFS.downloadFile(options);
    };

    useEffect(() => {
        (async () => {
            console.log('await queryTables()', await queryTables());
            setTables(await queryTables());
        })();
    }, []);

    return tables.length > 0 ? (
        <>
            <View style={styles.panel}>
                <CheckBox value={isWebView} onValueChange={newValue => setIsWebView(newValue)} />
                <Text style={styles.panelLabel}>use webview</Text>
            </View>
            {isWebView ? <WebViewWrapper /> : <Root />}
        </>
    ) : (
        <Button title="Load SQLite File" onPress={loadSQLiteFile} />
    );
};

const styles = StyleSheet.create({
    panel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    panelLabel: {
        fontSize: 20,
        marginLeft: 20,
    },
});
