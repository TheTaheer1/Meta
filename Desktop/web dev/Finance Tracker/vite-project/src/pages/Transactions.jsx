import { useState } from 'react'
import { useFinance } from '../context/FinanceContext.jsx'
import { useTransactions } from '../hooks/useTransactions.js'
import { useDebounce } from '../hooks/useDebounce.js'
import SearchBar from '../components/SearchBar.jsx'
import Filters from '../components/Filters.jsx'
import TransactionList from '../components/TransactionList.jsx'
import TransactionForm from '../components/TransactionForm.jsx'
import { toast } from 'react-toastify'

function Transactions() {
  const { deleteTransaction, updateTransaction } = useFinance()
  const txHook = useTransactions()
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 400)
  const [editingTx, setEditingTx] = useState(null)

  if (txHook.search !== debouncedSearch) {
    txHook.setSearch(debouncedSearch)
  }

  const categories = Array.from(
    new Set(txHook.rawTransactions.map((tx) => tx.category).filter(Boolean)),
  )

  const handleDelete = (tx) => {
    deleteTransaction(tx.id)
    toast.success('Transaction deleted')
  }

  const handleEdit = (tx) => {
    setEditingTx(tx)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-slate-500 mt-1">Manage and track your full history of income and expenses.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 sm:p-6 drop-shadow-sm flex flex-col gap-4">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <Filters
          category={txHook.categoryFilter}
          onCategoryChange={txHook.setCategoryFilter}
          type={txHook.typeFilter}
          onTypeChange={txHook.setTypeFilter}
          dateRange={txHook.dateRange}
          onDateRangeChange={txHook.setDateRange}
          sortBy={txHook.sortBy}
          onSortByChange={txHook.setSortBy}
          categories={categories}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <TransactionList
          transactions={txHook.transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {editingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Edit Transaction</h2>
              <button onClick={() => setEditingTx(null)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-0 overflow-y-auto max-h-[80vh]">
              <div className="px-5 py-2">
                <TransactionForm 
                  defaultValues={editingTx} 
                  onSubmit={(data) => {
                    updateTransaction(editingTx.id, data)
                    setEditingTx(null)
                    toast.success('Transaction updated')
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Transactions
