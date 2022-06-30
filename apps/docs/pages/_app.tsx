import * as React from 'react';
import type {AppProps} from 'next/app';
import	'../style.css';

function App({Component, pageProps}: AppProps): React.ReactElement {
	const getLayout =
		(Component as any).getLayout || ((page: React.ReactElement): React.ReactElement => page);

	return (
		getLayout(<Component {...pageProps} />)
	);
}

export default App;
