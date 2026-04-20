import { useFinance } from '../context/FinanceContext.jsx'
import { useBudget } from '../hooks/useBudget.js'
import BudgetCard from '../components/BudgetCard.jsx'

function Budget() {
  const { setMonthlyBudget } = useFinance()
  const { monthlyBudget, currentMonthExpenses, remaining, percentUsed } =
    useBudget()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const value = formData.get('budget')
    setMonthlyBudget(value)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Budget</h1>
        <p className="text-slate-500 mt-1">Set and monitor your monthly spending limits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-1">
          <BudgetCard
            monthlyBudget={monthlyBudget}
            spent={currentMonthExpenses}
            remaining={remaining}
            percentUsed={percentUsed}
          />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
            <h3 className="text-lg font-semibold text-slate-800">Set Monthly Budget</h3>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-600">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="budget"
                  defaultValue={monthlyBudget}
                  min="0"
                  step="0.01"
                  className="block w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Save Budget
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Budget
