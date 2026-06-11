import { useState } from 'react'

export function SearchBar({ onSearch, loading = false }) {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(value)
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Rechercher un livre…"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                disabled={loading || !value.trim()}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Recherche…' : 'Rechercher'}
            </button>
        </form>
    )
}