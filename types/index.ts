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

export interface SearchedData extends FetchedData {
  results: Show[] | Movie[] | Person[]
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
  known_for_department: string
  name: string
  popularity: number
  profile_path: string
}

export interface DataTypes {
  movies: FetchedDataMovies
  shows: FetchedDataShows
  people: FetchedDataPeople
}

export interface Genre {
  id: number
  name: string
}

export interface GenresTypes {
  genres: Genre[]
}

export interface ProvidersType {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export enum SortOptions {
  popularityDesc = "popularity.desc",
  popularityAsc = "popularity.asc",
  releaseDateDesc = "release_date.desc",
  releaseDateAsc = "release_date.asc",
  revenueDesc = "revenue.desc",
  revenueAsc = "revenue.asc",
}

export enum PageTypes {
  popular = "popular",
  latest = "latest",
  topRated = "top_rated",
  upcoming = "upcoming",
  nowPlaying = "now_playing",
}

export function isPeople(data: Person | Movie | Show): data is Person {
  return typeof data === "object" && "profile_path" in data
}

export function isMovies(data: Person | Movie | Show): data is Movie {
  return typeof data === "object" && "title" in data
}
