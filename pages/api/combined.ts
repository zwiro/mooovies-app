import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, genre } = req.query
  const [moviesRes, showsRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&page=${page}&with_genres=${genre}`
    ),
  ])
  const [movies, shows] = await Promise.all([moviesRes.json(), showsRes.json()])
  res.json([...movies.results, ...shows.results])
}
