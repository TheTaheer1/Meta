import TransactionCard from './TransactionCard.jsx'
import EmptyState from './EmptyState.jsx'

function TransactionList({ transactions, onEdit, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try changing filters or add a new transaction."
      />
    )
  }

  return (
    <div className="flex flex-col">
      {transactions.map((tx) => (
        <TransactionCard
          key={tx.id}
          transaction={tx}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TransactionList
