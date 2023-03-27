import Layout from "@/components/layout"
import { usePageLoading } from "@/hooks/usePageLoading"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"
import { QueryClient, QueryClientProvider } from "react-query"
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid"

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
          <main className="overflow-x-hidden px-2 py-4 pb-14">
            {isPageLoading ? (
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <EllipsisHorizontalCircleIcon className="h-12 w-12 animate-spin" />
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
