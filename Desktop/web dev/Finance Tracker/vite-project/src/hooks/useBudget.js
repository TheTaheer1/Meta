import { useMemo } from 'react'
import { useFinance } from '../context/FinanceContext.jsx'

export function useBudget() {
  const { budget, currentMonthExpenses } = useFinance()

  const remaining = useMemo(() => {
    return (budget.monthlyBudget || 0) - (currentMonthExpenses || 0)
  }, [budget.monthlyBudget, currentMonthExpenses])

  const percentUsed = useMemo(() => {
    if (!budget.monthlyBudget) return 0
    const value = (currentMonthExpenses / budget.monthlyBudget) * 100
    if (!Number.isFinite(value)) return 0
    return Math.min(100, Math.max(0, Math.round(value)))
  }, [budget.monthlyBudget, currentMonthExpenses])

  return {
    monthlyBudget: budget.monthlyBudget || 0,
    currentMonthExpenses,
    remaining,
    percentUsed,
  }
}

