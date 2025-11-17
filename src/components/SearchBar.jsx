import { useState } from 'react'

export default function SearchBar({ onSearch, loading, defaultQuery = '' }) {
  const [q, setQ] = useState(defaultQuery)

  const submit = (e) => {
    e.preventDefault()
    onSearch(q)
  }

  return (
    <form onSubmit={submit} className="w-full flex flex-col sm:flex-row gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search cards (e.g., name:Charizard set.id:sv3 type:Fire rarity:Rare)"
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
