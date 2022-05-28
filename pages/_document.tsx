import React, {ReactElement} from 'react';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';

type TInitialProps = {
    html: string;
    head?: (JSX.Element | null)[] | undefined;
    styles?: React.ReactElement[] | React.ReactFragment | undefined;
}

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<TInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);
		return {...initialProps};
	}

	render(): ReactElement {
		return (
			<Html lang={'en'}>
				<Head>
					<link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
					<link rel={'preconnect'} href={'https://fonts.gstatic.com'} crossOrigin={'true'} />
					<link href={'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@400;700&family=Source+Code+Pro&&display=swap'} rel={'stylesheet'} />
				</Head>
				<body className={'transition-colors duration-150 bg-background'} data-theme={'light'}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;