import React from 'react'
import app from '../firebase'
import {getFirestore, getDoc, doc} from 'firebase/firestore'

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
}

const Short = () => {
    return (<>
        
    </>)
}

export default Short
