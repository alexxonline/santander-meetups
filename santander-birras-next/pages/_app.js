import '../styles/globals.scss'
import Head from 'next/head';
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {

  return (
    <Auth0Provider
    domain="alexsaez.us.auth0.com"
    clientId="NG9FyyrnO7Mn0GycOHw5TULiw2VRmA5z"
    redirectUri="https://meetups.alexsaez.net/dashboard"
    audience="https://alex-meetups.vercel.app/api"
    scope="read:all write:all"
  >
    <div>
      <Head>
        <title>Meetups</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
      </Head> 
      <Component {...pageProps} />
    </div>
    </Auth0Provider>
  )
}

export default MyApp
