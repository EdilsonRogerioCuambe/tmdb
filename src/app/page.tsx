'use client'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import Data from '@/components/data'

interface DataProps {
  title: string
  vote_average: number
  release_date: string
  poster_path: string
}

export default function Home() {
  const [data, setData] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('popular') // Default active category

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${activeCategory}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      )
      setData(response.data.results)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }, [activeCategory])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setLoading(true)
  }

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Pesquise Filmes</h1>
      <input
        type="text"
        placeholder="Pesquisar"
        className="border border-gray-400 p-2 w-full"
        onChange={handleSearch}
      />

      <div className="mt-4">
        <div className="md:flex md:space-x-4 my-4 gap-x-1">
          <button
            title="popular"
            type="button"
            className={`mr-2 mb-2 ${
              activeCategory === 'popular'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } px-4 py-2 rounded-md`}
            onClick={() => handleCategoryChange('popular')}
          >
            Populares
          </button>
          <button
            type="button"
            title="now_playing"
            className={`mr-2 mb-2 ${
              activeCategory === 'now_playing'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } px-4 py-2 rounded-md`}
            onClick={() => handleCategoryChange('now_playing')}
          >
            Em Cartaz
          </button>
          <button
            title="top_rated"
            type="button"
            className={`mr-2 mb-2 ${
              activeCategory === 'top_rated'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } px-4 py-2 rounded-md`}
            onClick={() => handleCategoryChange('top_rated')}
          >
            Mais Votados
          </button>
          <button
            title="upcoming"
            type="button"
            className={`${
              activeCategory === 'upcoming'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } px-4 py-2 rounded-md`}
            onClick={() => handleCategoryChange('upcoming')}
          >
            Próximos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-400 p-4 rounded-lg animate-pulse"
                >
                  <div className="h-4 bg-gray-400 rounded-lg mt-2"></div>
                  <div className="h-4 bg-gray-400 rounded-lg my-2"></div>
                  <div className="h-96 bg-gray-400 rounded-lg"></div>
                </div>
              ))}
            </>
          ) : (
            filteredData.map((item, index) => (
              <Data
                key={index}
                title={item.title}
                vote_average={item.vote_average}
                release_date={item.release_date}
                poster_path={item.poster_path}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
