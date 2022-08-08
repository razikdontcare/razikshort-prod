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
  Icon,
  useColorModeValue,
  Divider,
  FormControl,
  Input,
  FormLabel,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import app from '../firebase'
import {getFirestore, collection, doc, setDoc, getDoc, getDocs} from 'firebase/firestore'

const db = getFirestore(app)

const Home: NextPage = () => {
  const [isShort, setIsShort] = React.useState(false)
  const [hostname, setHostname] = React.useState('')
  
  const [snapshot, setSnapshot] = React.useState()

  const [isAlert, setIsAlert] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)
  
  const [longUrl, setLongUrl] = React.useState('')
  const [prefix, setPrefix] = React.useState('')
  
  const [shortUrl, setShortUrl] = React.useState('')
  
  const [isLoading, setIsLoading] = React.useState(false)
  const isDisabled = longUrl == ''

  const randomPrefix = () => {
    let res = ''
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charLength = char.length
    for (let i = 0; i < 6; i++) {
      res += char.charAt(Math.floor(Math.random() * charLength))
    }
    return res
  }


  const shorten = async() => {
    setIsLoading(true)
    const result = randomPrefix()
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
      <meta name="title" content="RazikShort - URL Shortener" />
      <meta name="icon" content="/favicon.ico" />
      <meta name="description" content="A Free and Open-Source URL Shortener to make your Long Link/URL to Short Link/URL." />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    </Head>
    <Container maxW="3xl">
      <Stack as={Box} textAlign="center" spacing={{base: 8, md: 14}} pt={{base: 20, md: 36}} pb={5}>
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
              Short URL kamu berhasil dibuat!
            </Alert>
          </>)}
          {!isAlert && (<>
            <Alert status="error">
            Terjadi kesalahan saat membuat Short URL.
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
                Prefix
              </FormLabel>
              <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} type="text" />
            </FormControl>
          </Stack>
          <Button isDisabled={isDisabled} isLoading={isLoading} onClick={() => shorten()} mt={3} width="full" colorScheme="blue">Shorten!</Button>
        </form>
        {isShort && (<>
          <Text textAlign="center">
            Your Short Link:{" "}
            <Link color="blue.400" href={"/" + shortUrl}>{hostname}/{shortUrl}</Link> <br />
            {/* <Button mt={1} variant="ghost">Copy Short Link</Button> */}
          </Text>
        </>)}
      </Stack>
    </Container>
  </>)
}

export default Home
