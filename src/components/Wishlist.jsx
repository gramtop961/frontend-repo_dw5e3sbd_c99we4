import { useEffect, useState } from 'react'

export default function Wishlist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/wishlist`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Wishlist</h2>
      {loading && <p className="text-gray-500">Loading...</p>}
      {items.length === 0 && !loading && (
        <p className="text-gray-500">No wishlist items yet.</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.id} className="bg-white rounded shadow p-3">
            {it.image_url && (
              <img src={it.image_url} alt={it.name} className="w-full rounded mb-2" />
            )}
            <div className="font-medium text-sm">{it.name}</div>
            <div className="text-xs text-gray-500">{it.set_name} • #{it.number}</div>
            {it.desired_price != null && (
              <div className="text-xs mt-1">Target: ${it.desired_price}</div>
            )}
            <div className="text-[11px] mt-1 px-2 py-0.5 inline-block rounded bg-emerald-50 text-emerald-700">
              {it.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
