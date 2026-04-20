import { formatCurrency } from '../utils/currencyFormatter.js'

function BudgetCard({ monthlyBudget, spent, remaining, percentUsed }) {
  const isOverBudget = remaining < 0
  const progressColor = percentUsed < 75 
    ? 'bg-indigo-500' 
    : percentUsed < 100 
      ? 'bg-amber-500' 
      : 'bg-rose-500'

  return (
    <div className="p-5 sm:p-6 w-full max-w-sm mx-auto sm:max-w-none">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 tracking-tight">Monthly Budget</h3>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 text-center sm:text-left divide-x divide-slate-100">
        <div className="px-1 sm:px-2">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">Budget</p>
          <p className="text-sm sm:text-base font-bold text-slate-700">{formatCurrency(monthlyBudget)}</p>
        </div>
        <div className="px-1 sm:px-2">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">Spent</p>
          <p className="text-sm sm:text-base font-bold text-slate-700">{formatCurrency(spent)}</p>
        </div>
        <div className="px-1 sm:px-2">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">Remaining</p>
          <p
            className={`text-sm sm:text-base font-bold ${
              isOverBudget ? 'text-rose-600' : 'text-emerald-600'
            }`}
          >
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-sm font-medium text-slate-700">Utilization</span>
          <span className={`text-sm font-semibold ${isOverBudget ? 'text-rose-600' : 'text-slate-600'}`}>
            {percentUsed}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressColor}`}
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          />
        </div>
        {isOverBudget && (
          <p className="text-xs text-rose-500 mt-2 font-medium">You have exceeded your monthly budget.</p>
        )}
      </div>
    </div>
  )
}

export default BudgetCard
