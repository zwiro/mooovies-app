import Layout from "@/components/layout"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"
import { QueryClient, QueryClientProvider } from "react-query"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={roboto.className}>
        <Layout>
          <main className="overflow-x-hidden px-2 py-4">
            <Component {...pageProps} />
          </main>
        </Layout>
      </div>
    </QueryClientProvider>
  )
}
