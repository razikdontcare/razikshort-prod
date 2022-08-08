import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {ChakraProvider} from '@chakra-ui/react'
import Navbar from '../components/navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <ChakraProvider>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </ChakraProvider>
  </>)
}

export default MyApp
