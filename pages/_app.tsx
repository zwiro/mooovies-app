import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"
import { QueryClient, QueryClientProvider } from "react-query"
import { usePageLoading } from "@/hooks/usePageLoading"
import Layout from "@/components/layout"
import LoadingSpinner from "@/components/LoadingSpinner"
import "@/styles/globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const { isPageLoading } = usePageLoading()

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${roboto.className} relative min-h-screen`}>
        <Layout>
          <main className="overflow-x-hidden px-2 py-4 pb-14 md:px-12 lg:px-24 xl:px-48">
            {isPageLoading ? (
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <LoadingSpinner />
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </main>
        </Layout>
      </div>
    </QueryClientProvider>
  )
}
