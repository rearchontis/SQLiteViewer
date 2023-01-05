export type IncomingMessage = Array<unknown> | Record<string, unknown>;

export const query = (message: string) => {
    return new Promise((resolve: (data: IncomingMessage) => void, reject) => {
        // @ts-ignore
        window.ReactNativeWebView.postMessage(message);

        const listener = (event: {data: string}) => {
            try {
                const result = JSON.parse(event.data);

                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                window.removeEventListener('message', listener);
            }
        };

        window.addEventListener('message', listener);
    });
};
