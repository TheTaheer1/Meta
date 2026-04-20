import { useMemo, useState } from 'react'
import { parseISO, isWithinInterval } from 'date-fns'
import { useFinance } from '../context/FinanceContext.jsx'

export function useTransactions() {
  const { transactions } = useFinance()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [sortBy, setSortBy] = useState('date_desc')

  const filteredAndSorted = useMemo(() => {
    let list = [...transactions]

    // search
    const trimmedSearch = search.trim().toLowerCase()
    if (trimmedSearch) {
      list = list.filter((tx) => {
        const inTitle = tx.title.toLowerCase().includes(trimmedSearch)
        const inNotes = (tx.notes || '').toLowerCase().includes(trimmedSearch)
        return inTitle || inNotes
      })
    }

    // category
    if (categoryFilter !== 'all') {
      list = list.filter((tx) => tx.category === categoryFilter)
    }

    // type
    if (typeFilter !== 'all') {
      list = list.filter((tx) => tx.type === typeFilter)
    }

    // date range
    if (dateRange.from || dateRange.to) {
      list = list.filter((tx) => {
        if (!tx.date) return false
        const date = parseISO(tx.date)
        const from = dateRange.from ? parseISO(dateRange.from) : null
        const to = dateRange.to ? parseISO(dateRange.to) : null

        if (from && to) {
          return isWithinInterval(date, { start: from, end: to })
        }
        if (from) {
          return date >= from
        }
        if (to) {
          return date <= to
        }
        return true
      })
    }

    // sort
    list.sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.date) - new Date(a.date)
      }
      if (sortBy === 'date_asc') {
        return new Date(a.date) - new Date(b.date)
      }
      if (sortBy === 'amount_desc') {
        return b.amount - a.amount
      }
      if (sortBy === 'amount_asc') {
        return a.amount - b.amount
      }
      if (sortBy === 'category_asc') {
        return a.category.localeCompare(b.category)
      }
      if (sortBy === 'category_desc') {
        return b.category.localeCompare(a.category)
      }
      return 0
    })

    return list
  }, [transactions, search, categoryFilter, typeFilter, dateRange, sortBy])

  return {
    transactions: filteredAndSorted,
    rawTransactions: transactions,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    dateRange,
    setDateRange,
    sortBy,
    setSortBy,
  }
}

