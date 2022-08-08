import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    "apiKey": "AIzaSyDriS1994TEyVwHV4ViDcR1BGvBnncGrII",
    "authDomain": "fnestch.firebaseapp.com",
    "databaseURL": "https://fnestch.firebaseio.com",
    "messagingSenderId": "7678039539",
    "projectId": "fnestch",
    "storageBucket": "fnestch.appspot.com"
}

const app = initializeApp(firebaseConfig)

export default app