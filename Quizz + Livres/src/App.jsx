import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.tsx'
import Quiz from './components/Quiz.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import { BookList } from './components/BookList.jsx'
import { BookDetail } from './components/BookDetail.jsx'
import { useBooks } from './hooks/useBooks.js'

const TABS = [
    { id: 'quiz',  label: 'Quiz' },
    { id: 'books', label: 'Livres' },
]

function BooksPage() {
    const { books, total, status, error, query, search } = useBooks()
    const [selected, setSelected] = useState(null)

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto py-8 px-4">
            <SearchBar onSearch={search} loading={status === 'loading'} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {status === 'loading' && <p className="text-gray-400 text-sm">Chargement…</p>}
            <BookList books={books} total={total} query={query} onSelect={setSelected} />
            <BookDetail book={selected} onClose={() => setSelected(null)} />
        </div>
    )
}

function App() {
    const [activeTab, setActiveTab] = useState('quiz')

    const items = ['Lorem', 'Ipsum', 'Dolores']
    const logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Vite_Logo_2026.svg/3840px-Vite_Logo_2026.svg.png'

    return (
        <div className="flex min-h-svh flex-col">
            <Header listItems={items} logo={logo} />

            <main className="flex flex-1 flex-col items-center bg-gray-50">

                {/* Onglets */}
                <div className="w-full border-b border-gray-200 bg-white">
                    <div className="flex max-w-4xl mx-auto px-4">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={[
                                    'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700',
                                ].join(' ')}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contenu */}
                <div className="flex flex-1 flex-col items-center justify-center w-full p-6">
                    {activeTab === 'quiz'  && <Quiz />}
                    {activeTab === 'books' && <BooksPage />}
                </div>

            </main>

            <Footer />
        </div>
    )
}

export default App