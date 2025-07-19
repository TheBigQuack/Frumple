
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const investmentData = [
  { name: 'Facility Development', value: 40, amount: 180 },
  { name: 'Technology Platform', value: 25, amount: 112.5 },
  { name: 'Legal Game Library', value: 20, amount: 90 },
  { name: 'Working Capital', value: 15, amount: 67.5 }
]

const colors = ['#60B5FF', '#FF9149', '#FF90BB', '#80D8C3']

export function InvestmentChart() {
  return (
    <div className="h-96 p-4 bg-slate-900 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={investmentData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${value}%`}
            labelLine={false}
          >
            {investmentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: 11
            }}
            formatter={(value: number, name: string, props: any) => [
              `${value}% ($${props.payload.amount}K)`,
              name
            ]}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
