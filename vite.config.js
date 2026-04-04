import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const now = new Date()
  const ref = 'DGT-' + now.toISOString().slice(0,10).replace(/-/g,'') + '.' +
              now.toISOString().slice(11,16).replace(':','')

  // Lokal: .env'den | CI: process.env'den (GitHub Secrets)
  const FB = {
    apiKey:    env.VITE_FIREBASE_API_KEY            || process.env.VITE_FIREBASE_API_KEY            || '',
    authDomain:env.VITE_FIREBASE_AUTH_DOMAIN        || process.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
    projectId: env.VITE_FIREBASE_PROJECT_ID         || process.env.VITE_FIREBASE_PROJECT_ID         || '',
    storageBucket:env.VITE_FIREBASE_STORAGE_BUCKET  || process.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
    senderId:  env.VITE_FIREBASE_MESSAGING_SENDER_ID|| process.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| '',
    appId:     env.VITE_FIREBASE_APP_ID             || process.env.VITE_FIREBASE_APP_ID             || '',
  }

  return {
    plugins: [react()],
    base: '/Gayrimenkul/',
    define: {
      __BUILD_TIME__: JSON.stringify(now.toISOString()),
      __BUILD_REF__: JSON.stringify(ref),
      'import.meta.env.VITE_FIREBASE_API_KEY':             JSON.stringify(FB.apiKey),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN':         JSON.stringify(FB.authDomain),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID':          JSON.stringify(FB.projectId),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET':      JSON.stringify(FB.storageBucket),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(FB.senderId),
      'import.meta.env.VITE_FIREBASE_APP_ID':              JSON.stringify(FB.appId),
    }
  }
})
