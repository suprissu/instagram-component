import Document, { Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <meta name="description" content="Instagram App Component for Next Js" />
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}

export default AppDocument;
