import { globalStyles } from '../shared/styles/global'

import { AppProps } from 'next/app';
import Layout from '@/components/Layout'
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
 
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
    <>
        {globalStyles}
        <Layout>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Layout>
    </>
  )
}

export default App;