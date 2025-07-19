
"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const revenueData = [
  {
    year: 'Year 1',
    beverages: 525,
    gaming: 150,
    events: 75,
    total: 750
  },
  {
    year: 'Year 2',
    beverages: 665,
    gaming: 190,
    events: 95,
    total: 950
  },
  {
    year: 'Year 3',
    beverages: 840,
    gaming: 240,
    events: 120,
    total: 1200
  },
  {
    year: 'Year 4',
    beverages: 980,
    gaming: 280,
    events: 140,
    total: 1400
  },
  {
    year: 'Year 5',
    beverages: 1120,
    gaming: 320,
    events: 160,
    total: 1600
  }
]

export function RevenueChart() {
  return (
    <div className="h-96 p-4 bg-slate-900 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <XAxis 
            dataKey="year" 
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
          />
          <YAxis 
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            label={{ 
              value: 'Revenue ($K)', 
              angle: -90, 
              position: 'insideLeft',
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
            formatter={(value: number) => [`$${value}K`, '']}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 11 }}
          />
          <Bar 
            dataKey="beverages" 
            stackId="a" 
            fill="#60B5FF" 
            name="Beverages"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="gaming" 
            stackId="a" 
            fill="#FF9149" 
            name="Gaming"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="events" 
            stackId="a" 
            fill="#FF90BB" 
            name="Events & Food"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
