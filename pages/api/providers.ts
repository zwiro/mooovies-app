import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, type } = req.query
  const dataRes = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
  )
  const response = await dataRes.data
  res.json(response)
}
