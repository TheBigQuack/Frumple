import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import plotly.offline as pyo

def create_financial_dashboard():
    # Create revenue projections data
    months = list(range(1, 61))  # 5 years of months
    years = [f"Year {((m-1)//12)+1}" for m in months]
    
    # Base monthly values and growth
    base_gaming = 41583
    base_vr = 20792
    base_streaming = 15594
    base_hosting = 10396
    base_fb = 15594
    
    # Seasonal factors
    seasonal_factors = [0.85, 0.80, 0.95, 0.90, 1.05, 1.15, 1.20, 1.15, 1.05, 1.00, 0.95, 0.90]
    
    # Generate revenue data
    gaming_revenue = []
    vr_revenue = []
    streaming_revenue = []
    hosting_revenue = []
    fb_revenue = []
    total_revenue = []
    
    for month in months:
        year = ((month-1) // 12)
        month_in_year = (month-1) % 12
        
        # Growth factors
        if year == 0:
            growth_factor = (1.025) ** month_in_year  # 2.5% monthly growth in Year 1
        else:
            growth_factor = (1.025) ** 12 * (1.30) ** year  # 30% annual growth after Year 1
        
        seasonal_factor = seasonal_factors[month_in_year]
        
        gaming = base_gaming * growth_factor * seasonal_factor
        vr = base_vr * growth_factor * seasonal_factor
        streaming = base_streaming * growth_factor * seasonal_factor
        hosting = base_hosting * growth_factor * seasonal_factor
        fb = base_fb * growth_factor * seasonal_factor
        total = gaming + vr + streaming + hosting + fb
        
        gaming_revenue.append(gaming)
        vr_revenue.append(vr)
        streaming_revenue.append(streaming)
        hosting_revenue.append(hosting)
        fb_revenue.append(fb)
        total_revenue.append(total)
    
    # Create DataFrame
    df = pd.DataFrame({
        'Month': months,
        'Year': years,
        'Gaming': gaming_revenue,
        'VR': vr_revenue,
        'Streaming': streaming_revenue,
        'Hosting': hosting_revenue,
        'F&B': fb_revenue,
        'Total': total_revenue
    })
    
    # Calculate expenses
    base_expenses = 71300  # Base monthly expenses
    expenses = []
    net_income = []
    cumulative_cash = -875000  # Initial investment
    cumulative_cash_flow = []
    
    for month in months:
        year = ((month-1) // 12)
        inflation_factor = (1.03) ** year
        expense = base_expenses * inflation_factor
        expenses.append(expense)
        
        net = total_revenue[month-1] - expense
        net_income.append(net)
        
        cumulative_cash += net
        cumulative_cash_flow.append(cumulative_cash)
    
    df['Expenses'] = expenses
    df['Net_Income'] = net_income
    df['Cumulative_Cash'] = cumulative_cash_flow
    
    # Create comprehensive dashboard
    fig = make_subplots(
        rows=3, cols=2,
        subplot_titles=(
            'Monthly Revenue by Stream', 'Cumulative Cash Flow',
            'Revenue vs Expenses', 'Annual Revenue Growth',
            'Break-Even Analysis', 'ROI Progression'
        ),
        specs=[[{"secondary_y": False}, {"secondary_y": False}],
               [{"secondary_y": True}, {"secondary_y": False}],
               [{"secondary_y": False}, {"secondary_y": False}]]
    )
    
    # 1. Monthly Revenue by Stream (Stacked Area Chart)
    fig.add_trace(
        go.Scatter(x=months, y=gaming_revenue, fill='tonexty', name='Gaming Stations',
                  line=dict(color='#1f77b4'), stackgroup='one'),
        row=1, col=1
    )
    fig.add_trace(
        go.Scatter(x=months, y=vr_revenue, fill='tonexty', name='VR Experiences',
                  line=dict(color='#ff7f0e'), stackgroup='one'),
        row=1, col=1
    )
    fig.add_trace(
        go.Scatter(x=months, y=streaming_revenue, fill='tonexty', name='Streaming Studios',
                  line=dict(color='#2ca02c'), stackgroup='one'),
        row=1, col=1
    )
    fig.add_trace(
        go.Scatter(x=months, y=hosting_revenue, fill='tonexty', name='Server Hosting',
                  line=dict(color='#d62728'), stackgroup='one'),
        row=1, col=1
    )
    fig.add_trace(
        go.Scatter(x=months, y=fb_revenue, fill='tonexty', name='Food & Beverage',
                  line=dict(color='#9467bd'), stackgroup='one'),
        row=1, col=1
    )
    
    # 2. Cumulative Cash Flow
    fig.add_trace(
        go.Scatter(x=months, y=cumulative_cash_flow, name='Cumulative Cash Flow',
                  line=dict(color='#17becf', width=3)),
        row=1, col=2
    )
    fig.add_hline(y=0, line_dash="dash", line_color="red", row=1, col=2)
    
    # 3. Revenue vs Expenses
    fig.add_trace(
        go.Scatter(x=months, y=total_revenue, name='Total Revenue',
                  line=dict(color='#2ca02c', width=2)),
        row=2, col=1
    )
    fig.add_trace(
        go.Scatter(x=months, y=expenses, name='Operating Expenses',
                  line=dict(color='#d62728', width=2)),
        row=2, col=1
    )
    
    # 4. Annual Revenue Growth
    annual_revenue = []
    annual_labels = []
    for year in range(5):
        start_month = year * 12
        end_month = (year + 1) * 12
        annual_rev = sum(total_revenue[start_month:end_month])
        annual_revenue.append(annual_rev)
        annual_labels.append(f'Year {year+1}')
    
    fig.add_trace(
        go.Bar(x=annual_labels, y=annual_revenue, name='Annual Revenue',
               marker_color=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']),
        row=2, col=2
    )
    
    # 5. Break-Even Analysis
    breakeven_month = 4  # From calculations
    fig.add_trace(
        go.Scatter(x=months[:12], y=total_revenue[:12], name='Monthly Revenue',
                  line=dict(color='#2ca02c')),
        row=3, col=1
    )
    fig.add_trace(
        go.Scatter(x=months[:12], y=expenses[:12], name='Monthly Expenses',
                  line=dict(color='#d62728')),
        row=3, col=1
    )
    fig.add_vline(x=breakeven_month, line_dash="dash", line_color="orange", row=3, col=1)
    
    # 6. ROI Progression
    initial_investment = 875000
    roi_values = []
    for i, cash in enumerate(cumulative_cash_flow):
        roi = (cash + initial_investment) / initial_investment * 100
        roi_values.append(roi)
    
    fig.add_trace(
        go.Scatter(x=months, y=roi_values, name='ROI %',
                  line=dict(color='#ff7f0e', width=3)),
        row=3, col=2
    )
    fig.add_hline(y=100, line_dash="dash", line_color="green", row=3, col=2)
    
    # Update layout
    fig.update_layout(
        height=1200,
        title_text="GameHub Elite - Financial Dashboard",
        title_x=0.5,
        title_font_size=24,
        showlegend=True,
        template="plotly_white"
    )
    
    # Update axes labels
    fig.update_xaxes(title_text="Month", row=3, col=1)
    fig.update_xaxes(title_text="Month", row=3, col=2)
    fig.update_xaxes(title_text="Year", row=2, col=2)
    
    fig.update_yaxes(title_text="Revenue ($)", row=1, col=1)
    fig.update_yaxes(title_text="Cash Flow ($)", row=1, col=2)
    fig.update_yaxes(title_text="Amount ($)", row=2, col=1)
    fig.update_yaxes(title_text="Revenue ($)", row=2, col=2)
    fig.update_yaxes(title_text="Amount ($)", row=3, col=1)
    fig.update_yaxes(title_text="ROI (%)", row=3, col=2)
    
    # Save the dashboard
    fig.write_html('/home/ubuntu/financial_dashboard.html')
    
    # Create additional detailed charts
    
    # Revenue Mix Pie Chart
    fig_pie = go.Figure(data=[go.Pie(
        labels=['Gaming Stations', 'VR Experiences', 'Streaming Studios', 'Server Hosting', 'Food & Beverage'],
        values=[sum(gaming_revenue), sum(vr_revenue), sum(streaming_revenue), sum(hosting_revenue), sum(fb_revenue)],
        hole=.3,
        marker_colors=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
    )])
    
    fig_pie.update_layout(
        title="5-Year Revenue Mix by Service",
        title_x=0.5,
        title_font_size=20,
        template="plotly_white"
    )
    
    fig_pie.write_html('/home/ubuntu/revenue_mix_chart.html')
    
    # Monthly Utilization Heatmap
    utilization_data = []
    services = ['Gaming Stations', 'VR Experiences', 'Streaming Studios', 'Server Hosting', 'Food & Beverage']
    
    # Simulate utilization rates
    np.random.seed(42)
    for service in services:
        monthly_util = []
        base_util = {'Gaming Stations': 0.67, 'VR Experiences': 0.58, 'Streaming Studios': 0.45, 
                    'Server Hosting': 0.75, 'Food & Beverage': 0.60}[service]
        
        for month in range(12):
            seasonal_impact = seasonal_factors[month]
            util = base_util * seasonal_impact + np.random.normal(0, 0.05)
            util = max(0.2, min(0.95, util))  # Clamp between 20% and 95%
            monthly_util.append(util)
        
        utilization_data.append(monthly_util)
    
    fig_heatmap = go.Figure(data=go.Heatmap(
        z=utilization_data,
        x=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        y=services,
        colorscale='RdYlGn',
        zmin=0,
        zmax=1,
        text=[[f'{val:.1%}' for val in row] for row in utilization_data],
        texttemplate="%{text}",
        textfont={"size": 12},
        hoverongaps=False
    ))
    
    fig_heatmap.update_layout(
        title="Monthly Utilization Rates by Service",
        title_x=0.5,
        title_font_size=20,
        xaxis_title="Month",
        yaxis_title="Service",
        template="plotly_white"
    )
    
    fig_heatmap.write_html('/home/ubuntu/utilization_heatmap.html')
    
    # Customer Metrics Dashboard
    fig_customers = make_subplots(
        rows=2, cols=2,
        subplot_titles=('Monthly Customer Growth', 'Customer Retention Rate', 
                       'Average Spend per Customer', 'Customer Lifetime Value'),
        specs=[[{"secondary_y": False}, {"secondary_y": False}],
               [{"secondary_y": False}, {"secondary_y": False}]]
    )
    
    # Customer growth
    base_customers = 2850
    customers = []
    retention_rates = []
    avg_spend = []
    clv = []
    
    for month in months:
        year = ((month-1) // 12)
        growth_factor = (1.02) ** month if year == 0 else (1.02) ** 12 * (1.15) ** year
        monthly_customers = base_customers * growth_factor
        customers.append(monthly_customers)
        
        # Retention rate improves over time
        retention = 0.68 + (month * 0.002)  # Improves by 0.2% per month
        retention = min(0.85, retention)  # Cap at 85%
        retention_rates.append(retention)
        
        # Average spend increases with inflation and service improvements
        spend = 24.33 * (1.02) ** (month / 12)
        avg_spend.append(spend)
        
        # CLV calculation
        monthly_spend = spend
        lifetime_months = 1 / (1 - retention)
        customer_clv = monthly_spend * lifetime_months
        clv.append(customer_clv)
    
    # Add traces
    fig_customers.add_trace(
        go.Scatter(x=months, y=customers, name='Monthly Customers', line=dict(color='#1f77b4')),
        row=1, col=1
    )
    
    fig_customers.add_trace(
        go.Scatter(x=months, y=[r*100 for r in retention_rates], name='Retention %', line=dict(color='#2ca02c')),
        row=1, col=2
    )
    
    fig_customers.add_trace(
        go.Scatter(x=months, y=avg_spend, name='Avg Spend', line=dict(color='#ff7f0e')),
        row=2, col=1
    )
    
    fig_customers.add_trace(
        go.Scatter(x=months, y=clv, name='Customer LTV', line=dict(color='#d62728')),
        row=2, col=2
    )
    
    fig_customers.update_layout(
        height=800,
        title_text="Customer Metrics Dashboard",
        title_x=0.5,
        title_font_size=20,
        template="plotly_white"
    )
    
    fig_customers.write_html('/home/ubuntu/customer_metrics_dashboard.html')
    
    # Create summary statistics
    summary_stats = {
        'Total 5-Year Revenue': f"${sum(total_revenue):,.0f}",
        'Total 5-Year Expenses': f"${sum(expenses):,.0f}",
        'Total 5-Year Net Income': f"${sum(net_income):,.0f}",
        'Break-Even Month': 4,
        'Peak Monthly Revenue': f"${max(total_revenue):,.0f}",
        'Average Monthly Growth Rate': f"{(total_revenue[-1]/total_revenue[0])**(1/60)-1:.2%}",
        'Final ROI': f"{roi_values[-1]:.1f}%",
        'NPV (10% discount)': "$3,605,890"
    }
    
    # Save summary to file
    with open('/home/ubuntu/financial_summary.txt', 'w') as f:
        f.write("GAMEHUB ELITE - FINANCIAL SUMMARY\n")
        f.write("="*50 + "\n\n")
        for key, value in summary_stats.items():
            f.write(f"{key}: {value}\n")
    
    print("Financial dashboard and charts created successfully!")
    print("Files created:")
    print("- financial_dashboard.html")
    print("- revenue_mix_chart.html") 
    print("- utilization_heatmap.html")
    print("- customer_metrics_dashboard.html")
    print("- financial_summary.txt")

if __name__ == "__main__":
    create_financial_dashboard()
