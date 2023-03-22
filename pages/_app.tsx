import Layout from "@/components/layout"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </div>
  )
}
