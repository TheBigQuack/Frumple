
'use client'

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { month: 'Month 1', roi: 0, cumulative: 0 },
  { month: 'Month 6', roi: -15, cumulative: -131250 },
  { month: 'Month 12', roi: 25, cumulative: 218750 },
  { month: 'Month 18', roi: 85, cumulative: 743750 },
  { month: 'Month 24', roi: 165, cumulative: 1443750 },
  { month: 'Month 30', roi: 245, cumulative: 2143750 },
  { month: 'Month 36', roi: 312, cumulative: 2730000 }
]

export default function ROIChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #a855f7', 
              borderRadius: '8px',
              fontSize: '11px'
            }}
            formatter={(value: any, name: string) => [
              name === 'roi' ? `${value}%` : `$${value.toLocaleString()}`,
              name === 'roi' ? 'ROI' : 'Cumulative Return'
            ]}
            labelStyle={{ color: '#a855f7' }}
          />
          <defs>
            <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="roi" 
            stroke="#a855f7" 
            fillOpacity={1}
            fill="url(#roiGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
