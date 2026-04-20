import { useFinance } from '../context/FinanceContext.jsx'
import { useBudget } from '../hooks/useBudget.js'
import BudgetCard from '../components/BudgetCard.jsx'
import Charts from '../components/Charts.jsx'
import CurrencyWidget from '../components/CurrencyWidget.jsx'
import { formatCurrency } from '../utils/currencyFormatter.js'

function Dashboard() {
  const { transactions } = useFinance()
  const { monthlyBudget, currentMonthExpenses, remaining, percentUsed } =
    useBudget()

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)

  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)

  const balance = totalIncome - totalExpense

  const categoryMap = {}
  transactions
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      if (!categoryMap[tx.category]) {
        categoryMap[tx.category] = 0
      }
      categoryMap[tx.category] += Number(tx.amount || 0)
    })

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }))

  const monthlySpendingData = [
    { month: 'This month', expense: currentMonthExpenses },
  ]

  const incomeExpenseData = [
    { label: 'Total', income: totalIncome, expense: totalExpense },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Overview of your financial status this month.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <p className="text-sm font-semibold tracking-wide text-emerald-700/80 uppercase mb-1">Total Income</p>
          <p className="text-3xl font-bold text-emerald-900 flex items-center gap-2">
            <span className="text-emerald-500">+</span>
            {formatCurrency(totalIncome)}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-16 h-16 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
          </div>
          <p className="text-sm font-semibold tracking-wide text-rose-700/80 uppercase mb-1">Total Expense</p>
          <p className="text-3xl font-bold text-rose-900 flex items-center gap-2">
            <span className="text-rose-500">-</span>
            {formatCurrency(totalExpense)}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-sm font-semibold tracking-wide text-indigo-700/80 uppercase mb-1">Net Balance</p>
          <p
            className={`text-3xl font-bold ${
              balance >= 0 ? 'text-indigo-900' : 'text-rose-600'
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="border border-slate-200/60 bg-white rounded-3xl shadow-sm p-2">
            <BudgetCard
              monthlyBudget={monthlyBudget}
              spent={currentMonthExpenses}
              remaining={remaining}
              percentUsed={percentUsed}
            />
          </div>
          <CurrencyWidget />
        </div>
        <div className="lg:col-span-2 border border-slate-200/60 bg-white rounded-3xl shadow-sm overflow-hidden p-6">
           <Charts
            categoryData={categoryData}
            monthlySpendingData={monthlySpendingData}
            incomeExpenseData={incomeExpenseData}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
