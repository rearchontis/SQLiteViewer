import React, {useState, useCallback, useRef} from 'react';
import './App.css';
import {IncomingMessage, query} from './query';

function App() {
    const [state, setState] = useState<IncomingMessage>([]);
    const ref = useRef<HTMLInputElement>(null);

    const queryTables = useCallback(async () => {
        const message = {
            sql: 'SELECT tbl_name FROM sqlite_schema WHERE type ="table";',
        };

        setState(await query(JSON.stringify(message)));
    }, []);

    const runCustomQuery = useCallback(async () => {
        const message = {
            sql: ref.current?.value || '',
        };

        setState(await query(JSON.stringify(message)));
    }, []);

    return (
        <div className="App">
            <button onClick={queryTables}>Query Tables</button>
            <input placeholder="select * from ..." ref={ref} />
            <button onClick={runCustomQuery}>Run Query</button>
            <ul>
                {/* @ts-ignore */}
                {state.map(row => (
                    <li key={JSON.stringify(row)}>{JSON.stringify(row)}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
