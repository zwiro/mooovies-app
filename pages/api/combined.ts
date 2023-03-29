import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, genre, sort } = req.query
  const [moviesRes, showsRes] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_genres=${genre}`
    ),
    axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&sort_by=${sort}&page=${page}&with_genres=${genre}`
    ),
  ])
  const [movies, shows] = await Promise.all([moviesRes.data, showsRes.data])
  res.json([...movies.results, ...shows.results])
}
