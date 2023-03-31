import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import { auth, db } from "@/firebase/firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"
import Results from "@/components/Results"
import useCard from "@/hooks/useCard"

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
      const collectionRef = collection(db, "users")
      const q = query(collectionRef, where("userId", "==", user.uid))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUserData(snapshot.docs[0]?.data())
      })
      return unsubscribe
    }
    getData()
  }, [router, user, loading])

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
          <Results data={userData.seen} isProfile />
        ) : (
          <p className="text-center">No movies or shows marked as seen</p>
        )}
      </div>
      <div>
        <p className="py-12 text-center font-bold text-red-700">
          Movies and shows you want to see:
        </p>
        {userData.wantsToSee.length ? (
          <Results data={userData.wantsToSee} isProfile />
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
