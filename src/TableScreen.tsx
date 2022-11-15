import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView, StyleSheet} from 'react-native';
import {queryDataFromTable} from './db';

interface TableScreenProps {
  tbl_name: string;
}

export const TableScreen = ({tbl_name}: TableScreenProps) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setData(await queryDataFromTable(tbl_name));
    })();
  }, [tbl_name]);

  console.log(data);

  if (data.length > 0) {
    const headers = Object.keys(data[0]);

    return (
      <ScrollView horizontal>
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              {headers.map((header, index) => (
                <DataTable.Title
                  style={styles.cell}
                  key={String(header) + index}>
                  {header}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {data.map((row: object, index: number) => {
              const values = Object.values(row);

              return (
                <DataTable.Row key={index}>
                  {values.map((value, idx: number) => (
                    <DataTable.Cell
                      style={styles.cell}
                      key={String(value) + index + idx}>
                      {String(value).slice(0, 10)}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              );
            })}
          </DataTable>
        </ScrollView>
      </ScrollView>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  cell: {
    padding: 5,
    width: 150,
    heigth: 50,
  },
});
