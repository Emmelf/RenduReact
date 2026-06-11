import { useState, useCallback } from 'react'

const BASE_URL = 'https://openlibrary.org'

export function useBooks() {
    const [books, setBooks]     = useState([])
    const [total, setTotal]     = useState(0)
    const [status, setStatus]   = useState('idle')   // idle | loading | success | error
    const [error, setError]     = useState(null)
    const [query, setQuery]     = useState('')

    const search = useCallback(async (q) => {
        if (!q.trim()) return
        setStatus('loading')
        setError(null)
        setQuery(q)

        try {
            const params = new URLSearchParams({ q, limit: 20, fields: 'key,title,author_name,first_publish_year,cover_i,subject,number_of_pages_median,editions' })
            const res  = await fetch(`${BASE_URL}/search.json?${params}`)
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`)
            const data = await res.json()

            const parsed = data.docs.map((doc) => ({
                key:       doc.key,
                title:     doc.title,
                authors:   doc.author_name ?? [],
                year:      doc.first_publish_year ?? null,
                coverId:   doc.cover_i ?? null,
                subjects:  doc.subject?.slice(0, 3) ?? [],
                pages:     doc.number_of_pages_median ?? null,
                coverUrl:  doc.cover_i
                    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                    : null,
            }))

            setBooks(parsed)
            setTotal(data.numFound)
            setStatus('success')
        } catch (e) {
            setError(e.message || 'Une erreur est survenue.')
            setStatus('error')
        }
    }, [])

    const reset = useCallback(() => {
        setBooks([])
        setTotal(0)
        setStatus('idle')
        setError(null)
        setQuery('')
    }, [])

    return { books, total, status, error, query, search, reset }
}