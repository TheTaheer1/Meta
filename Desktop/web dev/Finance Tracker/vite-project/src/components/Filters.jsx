function Filters({
  category,
  onCategoryChange,
  type,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  sortBy,
  onSortByChange,
  categories,
}) {
  const handleDateChange = (field, value) => {
    onDateRangeChange?.({
      ...dateRange,
      [field]: value,
    })
  }

  const selectClass = "block w-full rounded-lg border-slate-200 bg-slate-50 border py-2 pl-3 pr-8 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
  const labelClass = "block text-xs font-semibold tracking-wide text-slate-500 uppercase mb-1.5"

  return (
    <div className="pt-2 sm:pt-4 border-t border-slate-100">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select
            className={selectClass}
            value={category}
            onChange={(e) => onCategoryChange?.(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className={labelClass}>Type</label>
          <select className={selectClass} value={type} onChange={(e) => onTypeChange?.(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>From</label>
          <input
            className={selectClass}
            type="date"
            value={dateRange.from}
            onChange={(e) => handleDateChange('from', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>To</label>
          <input
            className={selectClass}
            type="date"
            value={dateRange.to}
            onChange={(e) => handleDateChange('to', e.target.value)}
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <label className={labelClass}>Sort by</label>
          <select
            className={selectClass}
            value={sortBy}
            onChange={(e) => onSortByChange?.(e.target.value)}
          >
            <option value="date_desc">Date (newest first)</option>
            <option value="date_asc">Date (oldest first)</option>
            <option value="amount_desc">Amount (high to low)</option>
            <option value="amount_asc">Amount (low to high)</option>
            <option value="category_asc">Category (A-Z)</option>
            <option value="category_desc">Category (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

Filters.defaultProps = {
  categories: [],
}

export default Filters
