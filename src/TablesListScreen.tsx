import React from 'react';
import {FlatList} from 'react-native';
import {List, Divider} from 'react-native-paper';
import type {StackNavigationProp} from '@react-navigation/stack';

interface TablesListScreenProps {
    navigation?: StackNavigationProp<{[key: string]: undefined}>;
    tables: Array<{tbl_name: string}>;
}

export const TablesListScreen = ({
    tables,
    navigation,
}: TablesListScreenProps) => (
    <FlatList
        data={tables}
        keyExtractor={item => item.tbl_name}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => (
            <List.Item
                title={item.tbl_name}
                onPress={() => navigation!.navigate(item.tbl_name)}
            />
        )}
    />
);
