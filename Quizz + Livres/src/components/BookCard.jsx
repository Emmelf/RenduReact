export function BookCard({ book, onClick }) {
    return (
        <button
            onClick={() => onClick(book)}
            className="text-left bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            <div className="w-full aspect-[2/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={`Couverture de ${book.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-3xl text-gray-300">📖</span>
                )}
            </div>

            <div className="p-2">
                <p className="text-xs font-medium text-gray-900 leading-snug line-clamp-2">
                    {book.title}
                </p>
                {book.authors[0] && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">{book.authors[0]}</p>
                )}
                {book.year && (
                    <p className="text-xs text-gray-400 mt-0.5">{book.year}</p>
                )}
            </div>
        </button>
    )
}