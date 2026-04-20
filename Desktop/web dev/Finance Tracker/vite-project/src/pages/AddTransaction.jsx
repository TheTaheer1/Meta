import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TransactionForm from '../components/TransactionForm.jsx'
import { useFinance } from '../context/FinanceContext.jsx'

function AddTransaction() {
  const { addTransaction } = useFinance()
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    addTransaction(data)
    toast.success('Transaction added')
    navigate('/transactions')
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Add Transaction</h1>
        <p className="text-slate-500 mt-1">Record a new income or expense.</p>
      </div>
      <TransactionForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddTransaction
