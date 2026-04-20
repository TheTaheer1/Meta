import { format } from 'date-fns'
import { formatCurrency } from '../utils/currencyFormatter.js'

function TransactionCard({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === 'income'

  const handleEdit = () => {
    onEdit?.(transaction)
  }

  const handleDelete = () => {
    onDelete?.(transaction)
  }

  return (
    <div className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
      transaction.recurring ? 'border-l-4 border-l-indigo-400' : ''
    }`}>
      <div className="flex-1 min-w-0 mb-3 sm:mb-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-base font-semibold text-slate-900 truncate">{transaction.title}</h4>
          {transaction.recurring && (
            <span className="inline-flex items-center px-2 pt-0.5 pb-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Recurring
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 truncate flex items-center gap-1.5">
          <span className="font-medium">{transaction.category}</span>
          <span>•</span>
          <span>{transaction.date ? format(new Date(transaction.date), 'dd MMM yyyy') : 'No date'}</span>
        </p>
        {transaction.notes && (
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{transaction.notes}</p>
        )}
      </div>
      
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-1 pl-0 sm:pl-4 sm:border-l sm:border-slate-100">
        <div
          className={`text-lg font-bold whitespace-nowrap ${
            isIncome ? 'text-green-600' : 'text-slate-900'
          }`}
        >
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </div>
        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            type="button" 
            onClick={handleEdit}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors"
          >
            Edit
          </button>
          <button 
            type="button" 
            onClick={handleDelete} 
            className="text-xs font-medium text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionCard
