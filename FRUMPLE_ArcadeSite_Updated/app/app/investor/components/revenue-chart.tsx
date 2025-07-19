
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { month: 'Jan', revenue: 85000, expenses: 65000, profit: 20000 },
  { month: 'Feb', revenue: 92000, expenses: 67000, profit: 25000 },
  { month: 'Mar', revenue: 98000, expenses: 68000, profit: 30000 },
  { month: 'Apr', revenue: 105000, expenses: 70000, profit: 35000 },
  { month: 'May', revenue: 110000, expenses: 71000, profit: 39000 },
  { month: 'Jun', revenue: 115000, expenses: 72000, profit: 43000 },
  { month: 'Jul', revenue: 118000, expenses: 73000, profit: 45000 },
  { month: 'Aug', revenue: 122000, expenses: 74000, profit: 48000 },
  { month: 'Sep', revenue: 125000, expenses: 75000, profit: 50000 },
  { month: 'Oct', revenue: 128000, expenses: 76000, profit: 52000 },
  { month: 'Nov', revenue: 130000, expenses: 77000, profit: 53000 },
  { month: 'Dec', revenue: 132000, expenses: 78000, profit: 54000 }
]

export default function RevenueChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #22c55e', 
              borderRadius: '8px',
              fontSize: '11px'
            }}
            formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
            labelStyle={{ color: '#22c55e' }}
          />
          <Legend 
            verticalAlign="top"
            wrapperStyle={{ fontSize: '11px' }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#22c55e" 
            strokeWidth={2}
            name="Revenue"
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Expenses"
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="profit" 
            stroke="#a855f7" 
            strokeWidth={2}
            name="Profit"
            dot={{ fill: '#a855f7', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
