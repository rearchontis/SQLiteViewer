import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {queryTables} from './db';
import {TablesListScreen} from './TablesListScreen';
import {TableScreen} from './TableScreen';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const [tables, setTables] = useState<Array<{tbl_name: string}>>([]);

  useEffect(() => {
    (async () => {
      setTables(await queryTables());
    })();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen key="Tables List" name="Tables List">
        {(props: any) => <TablesListScreen tables={tables} {...props} />}
      </Stack.Screen>
      {tables.map(({tbl_name}) => {
        return (
          <Stack.Screen key={tbl_name} name={tbl_name}>
            {() => <TableScreen tbl_name={tbl_name} />}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};
