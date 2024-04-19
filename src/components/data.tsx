/* eslint-disable camelcase */
import Image from 'next/image'

interface DataProps {
  title: string
  vote_average: number
  release_date: string
  poster_path: string
}

export default function Data({
  title,
  vote_average,
  release_date,
  poster_path,
}: DataProps) {
  return (
    <div className="border border-gray-400 p-4 rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>Nota: {vote_average}</p>
      <p>Lançamento: {new Date(release_date).toLocaleDateString()}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        width={500}
        height={750}
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  )
}
