import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than 0')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  date: yup.string().required('Date is required'),
  notes: yup.string().nullable(),
  recurring: yup.boolean(),
})

function TransactionForm({ defaultValues, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      title: '',
      amount: '',
      category: '',
      type: 'expense',
      date: '',
      notes: '',
      recurring: false,
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const submitHandler = (data) => {
    onSubmit?.(data)
  }

  const inputClass = "block w-full rounded-lg border-slate-300 bg-slate-50 border py-2 px-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5"
  const errorClass = "mt-1.5 text-sm text-rose-500 font-medium"

  return (
    <form className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 sm:p-8" onSubmit={handleSubmit(submitHandler)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelClass}>Title</label>
          <input className={inputClass} placeholder="e.g. Grocery shopping" {...register('title')} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-400 sm:text-sm">₹</span>
            </div>
            <input className={`${inputClass} pl-7`} type="number" step="0.01" placeholder="0.00" {...register('amount')} />
          </div>
          {errors.amount && <p className={errorClass}>{errors.amount.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <div>
          <label className={labelClass}>Category</label>
          <input className={inputClass} placeholder="e.g. Food, Rent" {...register('category')} />
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select className={inputClass} {...register('type')}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && <p className={errorClass}>{errors.type.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input className={inputClass} type="date" {...register('date')} />
          {errors.date && <p className={errorClass}>{errors.date.message}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className={labelClass}>Notes (Optional)</label>
        <textarea
          className={inputClass}
          rows={3}
          placeholder="Add any extra details..."
          {...register('notes')}
        />
        {errors.notes && <p className={errorClass}>{errors.notes.message}</p>}
      </div>

      <div className="flex items-center mb-8">
        <input 
          id="recurring-checkbox"
          type="checkbox" 
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" 
          {...register('recurring')} 
        />
        <label htmlFor="recurring-checkbox" className="ml-2.5 block text-sm font-medium text-slate-700 cursor-pointer">
          Mark as recurring transaction
        </label>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          className="w-full sm:w-auto flex justify-center py-2.5 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        >
          Save Transaction
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
