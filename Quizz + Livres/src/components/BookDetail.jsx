import { useEffect } from 'react'

export function BookDetail({ book, onClose }) {
    useEffect(() => {
        if (!book) return
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [book, onClose])

    if (!book) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-lg w-full p-5 flex gap-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Fermer"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl leading-none"
                >
                    ✕
                </button>

                <div className="flex-shrink-0 w-24 h-36 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {book.coverUrl ? (
                        <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl text-gray-300">📖</span>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-gray-900 leading-snug mb-1">
                        {book.title}
                    </h2>

                    {book.authors.length > 0 && (
                        <p className="text-sm text-gray-500 mb-3">
                            {book.authors.join(', ')}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {book.year && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {book.year}
                            </span>
                        )}
                        {book.pages && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {book.pages} pages
                            </span>
                        )}
                        {book.subjects.map((s) => (
                            <span key={s} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                                {s}
                            </span>
                        ))}
                    </div>


                    <a
                        href={'https://openlibrary.org' + book.key}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                    >
                    {'Voir sur Open Library \u2192'}
                    </a>
            </div>
        </div>
    </div>

)
}