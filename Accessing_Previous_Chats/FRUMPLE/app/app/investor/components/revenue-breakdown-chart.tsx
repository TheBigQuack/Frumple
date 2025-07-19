
'use client'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Gaming Stations', value: 42, color: '#22c55e' },
  { name: 'Server Hosting', value: 28, color: '#3b82f6' },
  { name: 'VR Experiences', value: 18, color: '#a855f7' },
  { name: 'Streaming Studios', value: 15, color: '#ec4899' },
  { name: 'Food & Beverages', value: 7, color: '#f59e0b' }
]

export default function RevenueBreakdownChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #22c55e', 
              borderRadius: '8px',
              fontSize: '11px'
            }}
            formatter={(value: any) => [`${value}%`, 'Revenue Share']}
            labelStyle={{ color: '#22c55e' }}
          />
          <Legend 
            verticalAlign="top"
            align="center"
            wrapperStyle={{ fontSize: '11px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
