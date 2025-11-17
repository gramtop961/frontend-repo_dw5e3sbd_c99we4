import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import CardGrid from './components/CardGrid'
import Wishlist from './components/Wishlist'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')

  const doSearch = async (q) => {
    setQuery(q)
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      params.set('pageSize', 24)
      const res = await fetch(`${baseUrl}/api/cards?${params.toString()}`)
      const data = await res.json()
      setResults(data?.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (card) => {
    try {
      const body = {
        card_id: card.id,
        name: card.name,
        set_name: card.set?.name,
        set_id: card.set?.id,
        number: card.number,
        image_url: card.images?.small,
      }
      await fetch(`${baseUrl}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      // no toast; wishlist component will fetch on load
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    doSearch('')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-violet-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Pokemon TCG Checker</h1>
          <SearchBar onSearch={doSearch} loading={loading} defaultQuery={query} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading && <div className="text-gray-500 mb-4">Loading results...</div>}
        <CardGrid items={results} onAddWishlist={addToWishlist} />
        <Wishlist />
      </main>

      <footer className="py-8 text-center text-xs text-gray-500">Data via Pokemon TCG API. Cardmarket prices require API credentials.</footer>
    </div>
  )
}

export default App
