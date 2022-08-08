import React from 'react'
import {NextApiRequest, NextApiResponse, NextPage} from 'next'
import {useRouter} from 'next/router'
import app from '../firebase'
import {getFirestore, getDoc, updateDoc, doc} from 'firebase/firestore'

const db = getFirestore(app)

type Params = {
    params: {
        short: string
    }
}

export async function getServerSideProps({params}: Params) {
    const hash = params.short
    const docSnap = await getDoc(doc(db, "shortlink", `${hash}`))
    const docData = docSnap.data() as any

    if (docSnap.exists()) {
        return {
            redirect: {
                destination: docData.longurl,
            }
        }
    } else {
        return {
            redirect: {
                destination: '/',
            }
        }
    }

    return {
        props: {}
    }

}

const Short: NextPage = (props) => {
    const router = useRouter()
    const {short} = router.query
    const [isExists, setIsExists] = React.useState(false)
    const [result, setResult] = React.useState('')

    
    

    
    return <>
        
    </>
}

export default Short