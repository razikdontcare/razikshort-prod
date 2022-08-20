import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Divider,
  FormControl,
  Input,
  FormLabel,
  Link,
  Alert,
  AlertIcon,
  useClipboard,
  IconButton,
  useColorMode
} from '@chakra-ui/react'

import { FaGithub } from 'react-icons/fa'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

// import config
import app from '../firebase'

// initialize firebase cloud firestore
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'
const db = getFirestore(app)

const Home: NextPage = () => {
  const [isShort, setIsShort] = React.useState(false) // State to check if the Short URL is being created.
  const [hostname, setHostname] = React.useState('') // Check if there's an error.

  const [isAlert, setIsAlert] = React.useState(false) // Check if there's an error.  
  const [showAlert, setShowAlert] = React.useState(false) // Show alert if Short URL is created or there is an error.
  
  const [longUrl, setLongUrl] = React.useState('') // Get the long url from input
  const [prefix, setPrefix] = React.useState('') // Get the alias from input
  
  const [shortUrl, setShortUrl] = React.useState('') // Return created short url id / alias
  
  const [isLoading, setIsLoading] = React.useState(false) // Set button to loading state on click
  const isDisabled = longUrl == '' // Set button to disabled if long url is not provided

  const { hasCopied, onCopy } = useClipboard("https://" + hostname + "/" + shortUrl) // @chakra-ui hooks to copy text
  const { colorMode, toggleColorMode } = useColorMode() // @chakra-ui hooks to get and toggle dark / light theme

  // Create random id if alias is not provided
  const randomPrefix = () => {
    let res = ''
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charLength = char.length
    for (let i = 0; i < 6; i++) {
      res += char.charAt(Math.floor(Math.random() * charLength))
    }
    return res
  }

  // Shorten the url and send to firebase
  const shorten = async() => {
    setIsLoading(true) // set button to loading state
    const result = randomPrefix() // initialize random id
    if (prefix == '') {
      await setShortUrl(result)
      await setDoc(doc(db, "shortlink", result), {
        longurl: longUrl,
        short: "/" + result,
        id: result,
        click: 0
      }).then(() => {
        setIsShort(true)
        setIsAlert(true)
        setShowAlert(true)
        setIsLoading(false)
      }).catch((error) => {
        console.error(error)
        setIsAlert(false)
        setShowAlert(true)
        setIsLoading(false)
      })
    } else {
      const querySnapshot = await getDoc(doc(db, "shortlink", prefix))
      if (querySnapshot.exists()) {
        await setShortUrl(result)
        await setDoc(doc(db, "shortlink", result), {
          longurl: longUrl,
          short: "/" + result,
          id: result,
          click: 0
        }).then(() => {
          setIsShort(true)
          setIsAlert(true)
          setShowAlert(true)
          setIsLoading(false)
        }).catch((error) => {
          console.error(error)
          setIsAlert(false)
          setShowAlert(true)
          setIsLoading(false)
        })
      } else {
        await setShortUrl(prefix)
        await setDoc(doc(db, "shortlink", prefix), {
          longurl: longUrl,
          short: "/" + prefix,
          id: prefix,
          click: 0
        }).then(() => {
          setIsShort(true)
          setIsAlert(true)
          setShowAlert(true)
          setIsLoading(false)
        }).catch((error) => {
          console.error(error)
          setIsAlert(false)
          setShowAlert(true)
          setIsLoading(false)
        })
      }
    }  
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.hostname)
    }
  }, [])

  return (<>
    <Head>
      <title>RazikShort - URL Shortener</title>
      <meta name="icon" content="/favicon.ico" />

      {/* Primary */}
      <meta name="title" content="RazikShort - URL Shortener" />
      <meta name="description" content="A Free and Open-Source URL Shortener to make your Long Link/URL to Short Link/URL." />
      <meta name="keywords" content="razikshort, url shortener, short url" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="RazikShort - URL Shortener" />
      <meta property="og:description" content="A Free and Open-Source URL Shortener to make your Long Link/URL to Short Link/URL." />
      <meta property="og:url" content="https://razik.studio/" /> {/* Change to your domain */}
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta property="twitter:title" content="RazikShort - URL Shortener" />
      <meta property="twitter:description" content="A Free and Open-Source URL Shortener to make your Long Link/URL to Short Link/URL." />
      <meta property="twitter:url" content="https://razik.studio/" /> {/* Change to your domain */}

      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
    </Head>

    <IconButton aria-label="theme switch" position="fixed" right={5} bottom={5} rounded="full" icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />} w="60px" h="60px" onClick={() => toggleColorMode()} />

    <Container maxW="3xl">
      <Stack as={Box} textAlign="center" spacing={{base: 8, md: 14}} pt={{base: 20, md: 36}} pb={5}>
        <IconButton as={Link} href="https://github.com/razikdontcare/razikshort-prod/" aria-label="Github" variant="link" icon={<FaGithub />} />
        <Heading as="h1" fontWeight={600} fontSize={{base: '2xl', sm: '4xl', md: '6xl'}} lineHeight="110%">
          RazikShort
        </Heading>
        <Text color="gray.500">
          A Free and Open-Source URL Shortener to make your Long URL into Short URL.
        </Text>
        <Divider />        
      </Stack>
      <Stack as={Box} spacing={{base: 4, md: 8}} py={3}>
        {showAlert && <>
          {isAlert && (<>
            <Alert status="success">
              <AlertIcon />
                Your Short URL was successfully created!
            </Alert>
          </>)}
          {!isAlert && (<>
            <Alert status="error">
              An error occurred while creating your Short URL.
            </Alert>
          </>)}        
        </>}
        <form>
          <Stack direction="row">
            <FormControl isRequired width="65%">
              <FormLabel>
                Long URL
              </FormLabel>
              <Input value={longUrl} onChange={(e) => setLongUrl(e.target.value)} type="url" />
            </FormControl>
            <FormControl width="35%">
              <FormLabel>
                Alias
              </FormLabel>
              <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} type="text" />
            </FormControl>
          </Stack>
          <Button isDisabled={isDisabled} isLoading={isLoading} onClick={() => shorten()} mt={3} width="full" colorScheme="blue">Shorten!</Button>
        </form>
        {isShort && (<>
          <Text textAlign="center">
            Your Short Link:{" "}
            <Link color="blue.400" href={"/" + shortUrl}>https://{hostname}/{shortUrl}</Link> <br />
            <Button onClick={() => onCopy()} mt={1} variant="ghost">
              {hasCopied ? "Copied!" : "Copy"}
            </Button>
          </Text>
        </>)}
      </Stack>
    </Container>
  </>)
}

export default Home
