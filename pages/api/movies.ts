import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, genres } = req.query
  console.log(genres)
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}&with_genres=${genres}`
  )
  const response = await data.json()
  res.json(response)
}