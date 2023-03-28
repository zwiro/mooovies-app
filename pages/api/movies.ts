import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, genres, sort } = req.query
  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_genres=${genres}`
  )
  const response = await data.json()
  res.json(response)
}
