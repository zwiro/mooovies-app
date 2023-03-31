import Results from "@/components/Results"
import { auth, db } from "@/firebase/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useQuery } from "react-query"

function ProfilePage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [userData, setUserData] = useState<DocumentData>({
    userId: "",
    seen: [],
    wantsToSee: [],
  })
  const userName = user?.email?.split("@")[0]

  useEffect(() => {
    if (!loading && !user) router.push("/")
    const getData = async () => {
      if (!user) return
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setUserData(docSnap.data())
      }
    }
    getData()
  }, [router, user])

  return (
    <>
      <Head>
        <title>Mooovies | {userName}</title>
      </Head>
      <p className="pb-4 text-center tracking-widest lg:text-2xl">
        <span className="font-bold uppercase text-red-700">
          {userName}&apos;s{" "}
        </span>
        <span>PROFILE</span>
      </p>
      <div>
        <p className="py-12 text-center font-bold text-red-700">
          Seen movies and shows:
        </p>
        {userData.seen.length ? (
          <Results data={userData.seen} />
        ) : (
          <p className="text-center">No movies or shows marked as seen</p>
        )}
      </div>
      <div>
        <p className="py-12 text-center font-bold text-red-700">
          Movies and shows you want to see:
        </p>
        {userData.wantsToSee.length ? (
          <Results data={userData.wantsToSee} />
        ) : (
          <p className="text-center">
            No movies or shows marked as wanted to see
          </p>
        )}
      </div>
    </>
  )
}

export default ProfilePage
