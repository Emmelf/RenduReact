import { BookCard } from './BookCard'

export function BookList({ books, total, query, onSelect }) {
    if (!books.length) return null

    return (
        <div className="w-full">
            <p className="text-sm text-gray-500 mb-3">
                {total.toLocaleString('fr-FR')} résultat{total > 1 ? 's' : ''} pour{' '}
                <span className="font-medium text-gray-700">« {query} »</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {books.map((book) => (
                    <BookCard key={book.key} book={book} onClick={onSelect} />
                ))}
            </div>
        </div>
    )
}