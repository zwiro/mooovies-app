interface FetchedData {
  page: number
  total_pages: number
  total_results: number
}

export interface FetchedDataMovies extends FetchedData {
  results: Movie[]
}

export interface FetchedDataShows extends FetchedData {
  results: Show[]
}

export interface FetchedDataPeople extends FetchedData {
  results: Person[]
}

interface Data {
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface Movie extends Data {
  adult: boolean
  original_title: string
  release_date: string
  title: string
  video: boolean
}

export interface Show extends Data {
  first_air_date: string
  name: string
  origin_country: string[]
}

export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for: Movie[] | Show[]
  known_for_deparment: string
  name: string
  popularity: number
  profile_path: string
}