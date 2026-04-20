import { useState, useEffect } from 'react'

function CurrencyWidget() {
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
      .then(res => res.json())
      .then(data => {
        setRates({
          usdToInr: data.usd.inr.toFixed(2),
          eurToInr: (data.usd.inr / data.usd.eur).toFixed(2),
          gbpToInr: (data.usd.inr / data.usd.gbp).toFixed(2)
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch currency:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl border-none shadow-lg p-5 sm:p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10"></div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-indigo-900 opacity-20"></div>
      <h3 className="text-lg font-bold mb-5 flex items-center gap-2 relative z-10 text-white/95">
        <svg className="w-5 h-5 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Live Exchange Rates
      </h3>
      {loading ? (
        <div className="animate-pulse space-y-4 relative z-10">
          <div className="h-10 bg-white/10 rounded-xl w-full"></div>
          <div className="h-10 bg-white/10 rounded-xl w-full"></div>
          <div className="h-10 bg-white/10 rounded-xl w-full"></div>
        </div>
      ) : (
        <div className="space-y-3 relative z-10">
          <div className="flex justify-between items-center bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-3 backdrop-blur-sm border border-white/5">
             <div className="flex items-center gap-2">
               <span className="w-6 h-6 flex items-center justify-center bg-indigo-800/50 rounded text-xs font-bold text-indigo-100">US</span>
               <span className="font-medium text-indigo-50">1 USD</span>
             </div>
             <span className="font-bold text-lg text-white">₹ {rates?.usdToInr || '---'}</span>
          </div>
          <div className="flex justify-between items-center bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-3 backdrop-blur-sm border border-white/5">
             <div className="flex items-center gap-2">
               <span className="w-6 h-6 flex items-center justify-center bg-indigo-800/50 rounded text-xs font-bold text-indigo-100">EU</span>
               <span className="font-medium text-indigo-50">1 EUR</span>
             </div>
             <span className="font-bold text-lg text-white">₹ {rates?.eurToInr || '---'}</span>
          </div>
          <div className="flex justify-between items-center bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-3 backdrop-blur-sm border border-white/5">
             <div className="flex items-center gap-2">
               <span className="w-6 h-6 flex items-center justify-center bg-indigo-800/50 rounded text-xs font-bold text-indigo-100">UK</span>
               <span className="font-medium text-indigo-50">1 GBP</span>
             </div>
             <span className="font-bold text-lg text-white">₹ {rates?.gbpToInr || '---'}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencyWidget
