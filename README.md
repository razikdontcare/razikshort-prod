## First Step

Change your `firebaseConfig` on `firebase.tsx`
```javascript
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    // your firebase config
}

const app = initializeApp(firebaseConfig)

export default app
```

[Open This Link](https://firebase.google.com/docs/web/setup#register-app) to see how you can get your firebase config.

## To Do List
No. | To Do
--- | ---
1. | Authentication
2. | Dashboard
3. | Link Management
4. | ...

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
