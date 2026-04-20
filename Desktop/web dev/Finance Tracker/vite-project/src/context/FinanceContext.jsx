import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { isSameMonth, parseISO } from 'date-fns'

const FinanceContext = createContext(null)

const TRANSACTIONS_KEY = 'finance_app_transactions'
const BUDGET_KEY = 'finance_app_budget'

function loadTransactions() {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function loadBudget() {
  try {
    const raw = localStorage.getItem(BUDGET_KEY)
    if (!raw) return { monthlyBudget: 0 }
    const parsed = JSON.parse(raw)
    if (typeof parsed?.monthlyBudget !== 'number') {
      return { monthlyBudget: 0 }
    }
    return parsed
  } catch {
    return { monthlyBudget: 0 }
  }
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => loadTransactions())
  const [budget, setBudget] = useState(() => loadBudget())

  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget))
  }, [budget])

  const addTransaction = (data) => {
    const newTransaction = {
      id: uuidv4(),
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      type: data.type,
      date: data.date,
      notes: data.notes || '',
      recurring: Boolean(data.recurring),
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const updateTransaction = (id, updates) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              ...updates,
              amount: updates.amount !== undefined ? Number(updates.amount) : tx.amount,
            }
          : tx,
      ),
    )
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id))
  }

  const setMonthlyBudget = (value) => {
    setBudget({ monthlyBudget: Number(value) || 0 })
  }

  const currentMonthExpenses = useMemo(() => {
    const now = new Date()
    return transactions
      .filter(
        (tx) =>
          tx.type === 'expense' &&
          tx.date &&
          isSameMonth(parseISO(tx.date), now),
      )
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
  }, [transactions])

  const value = {
    transactions,
    budget,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setMonthlyBudget,
    currentMonthExpenses,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) {
    throw new Error('useFinance must be used within FinanceProvider')
  }
  return ctx
}

