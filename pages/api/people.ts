import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query
  const data = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
  )
  const response = await data.json()
  res.json(response)
}
