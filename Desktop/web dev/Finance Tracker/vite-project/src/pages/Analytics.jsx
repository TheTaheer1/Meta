import { useFinance } from '../context/FinanceContext.jsx'
import Charts from '../components/Charts.jsx'
import { formatCurrency } from '../utils/currencyFormatter.js'

function Analytics() {
  const { transactions } = useFinance()

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)

  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)

  const netBalance = totalIncome - totalExpense

  const categoryTotals = {}
  transactions
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      if (!categoryTotals[tx.category]) {
        categoryTotals[tx.category] = 0
      }
      categoryTotals[tx.category] += Number(tx.amount || 0)
    })

  const topCategoryEntry = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0]
  const topCategory = topCategoryEntry ? topCategoryEntry[0] : 'N/A'

  const categoryData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }))

  const monthlySpendingData = [
    {
      month: 'All time',
      expense: totalExpense,
    },
  ]

  const incomeExpenseData = [
    {
      label: 'All time',
      income: totalIncome,
      expense: totalExpense,
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
        <p className="text-slate-500 mt-1">Deep dive into your financial habits and trends over time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Income</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-1.5">
            <span className="text-green-500 text-xl">+</span>
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-1.5">
            <span className="text-red-500 text-xl">-</span>
            {formatCurrency(totalExpense)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500 mb-1">Net Balance</p>
          <p
            className={`text-2xl sm:text-3xl font-bold ${
              netBalance >= 0 ? 'text-indigo-600' : 'text-rose-600'
            }`}
          >
            {formatCurrency(netBalance)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border-indigo-200 bg-indigo-50 shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-indigo-700/80 mb-1">Top Category</p>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-900 truncate">
            {topCategory}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 overflow-hidden">
        <Charts
          categoryData={categoryData}
          monthlySpendingData={monthlySpendingData}
          incomeExpenseData={incomeExpenseData}
        />
      </div>
    </div>
  )
}

export default Analytics
