
"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const profitabilityData = [
  {
    year: 'Year 1',
    revenue: 750,
    expenses: 630,
    ebitda: 120,
    margin: 16
  },
  {
    year: 'Year 2',
    revenue: 950,
    expenses: 760,
    ebitda: 190,
    margin: 20
  },
  {
    year: 'Year 3',
    revenue: 1200,
    expenses: 924,
    ebitda: 276,
    margin: 23
  },
  {
    year: 'Year 4',
    revenue: 1400,
    expenses: 1050,
    ebitda: 350,
    margin: 25
  },
  {
    year: 'Year 5',
    revenue: 1600,
    expenses: 1200,
    ebitda: 400,
    margin: 25
  }
]

export function ProfitabilityChart() {
  return (
    <div className="h-96 p-4 bg-slate-900 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={profitabilityData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <XAxis 
            dataKey="year" 
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
          />
          <YAxis 
            yAxisId="left"
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            label={{ 
              value: 'Amount ($K)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            label={{ 
              value: 'Margin (%)', 
              angle: 90, 
              position: 'insideRight',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: 11
            }}
            formatter={(value: number, name: string) => {
              if (name === 'Margin') return [`${value}%`, name]
              return [`$${value}K`, name]
            }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 11 }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="revenue" 
            stroke="#60B5FF" 
            strokeWidth={3}
            dot={{ fill: '#60B5FF', strokeWidth: 2, r: 4 }}
            name="Revenue"
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="ebitda" 
            stroke="#FF9149" 
            strokeWidth={3}
            dot={{ fill: '#FF9149', strokeWidth: 2, r: 4 }}
            name="EBITDA"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="margin" 
            stroke="#80D8C3" 
            strokeWidth={3}
            dot={{ fill: '#80D8C3', strokeWidth: 2, r: 4 }}
            name="Margin"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
