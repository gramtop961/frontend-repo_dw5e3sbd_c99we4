export default function CardGrid({ items = [], onAddWishlist }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500">No results yet. Try a search!</div>
    )
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((c) => (
        <div key={c.id} className="bg-white rounded-lg shadow hover:shadow-md transition p-3 flex flex-col">
          <div className="relative aspect-[3/4] overflow-hidden rounded">
            {c.images?.small ? (
              <img src={c.images.small} alt={c.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          <div className="mt-3">
            <div className="font-semibold text-sm line-clamp-2">{c.name}</div>
            <div className="text-xs text-gray-500">{c.set?.name} • #{c.number}</div>
          </div>
          <button
            onClick={() => onAddWishlist && onAddWishlist(c)}
            className="mt-3 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded px-3 py-1"
          >
            Add to wishlist
          </button>
        </div>
      ))}
    </div>
  )
}
