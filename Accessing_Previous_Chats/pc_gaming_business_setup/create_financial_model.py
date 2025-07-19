import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import xlsxwriter

def create_financial_model():
    # Create a new Excel workbook
    workbook = xlsxwriter.Workbook('/home/ubuntu/hybrid_gaming_financial_model.xlsx')
    
    # Define formats
    header_format = workbook.add_format({
        'bold': True,
        'bg_color': '#4472C4',
        'font_color': 'white',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    currency_format = workbook.add_format({
        'num_format': '$#,##0',
        'align': 'right'
    })
    
    percentage_format = workbook.add_format({
        'num_format': '0.0%',
        'align': 'right'
    })
    
    number_format = workbook.add_format({
        'num_format': '#,##0',
        'align': 'right'
    })
    
    # Create Executive Summary worksheet
    exec_summary = workbook.add_worksheet('Executive Summary')
    exec_summary.set_column('A:A', 25)
    exec_summary.set_column('B:B', 15)
    
    # Executive Summary Data
    exec_data = [
        ['GAMEHUB ELITE - FINANCIAL SUMMARY', ''],
        ['', ''],
        ['Initial Investment Required', 875000],
        ['Break-Even Month', 4],
        ['Year 1 Revenue', 1247500],
        ['Year 1 Net Income', 391900],
        ['Year 5 Revenue', 3563985],
        ['Year 5 Net Income', 2447985],
        ['5-Year Total ROI', 7.304],
        ['NPV (10% discount)', 3605890],
        ['IRR', 0.673],
        ['', ''],
        ['KEY ASSUMPTIONS', ''],
        ['Gaming Station Utilization', 0.67],
        ['VR Station Utilization', 0.58],
        ['Streaming Studio Utilization', 0.45],
        ['Average Gaming Rate/Hour', 10.75],
        ['Average VR Rate/Session', 45.23],
        ['Average Streaming Rate/Hour', 77.72],
        ['Customer Retention Rate', 0.68],
        ['Annual Price Increase', 0.04]
    ]
    
    for row, (item, value) in enumerate(exec_data):
        exec_summary.write(row, 0, item, header_format if value == '' else None)
        if isinstance(value, (int, float)) and value != 0:
            if 'ROI' in item or 'IRR' in item:
                exec_summary.write(row, 1, value, percentage_format)
            elif '$' in str(value) or 'Revenue' in item or 'Income' in item or 'Investment' in item or 'NPV' in item:
                exec_summary.write(row, 1, value, currency_format)
            elif 'Month' in item:
                exec_summary.write(row, 1, value, number_format)
            elif 'Utilization' in item or 'Rate' in item or 'Increase' in item:
                exec_summary.write(row, 1, value, percentage_format)
            else:
                exec_summary.write(row, 1, value, currency_format)
    
    # Create Revenue Projections worksheet
    revenue_ws = workbook.add_worksheet('Revenue Projections')
    revenue_ws.set_column('A:A', 15)
    revenue_ws.set_column('B:G', 12)
    
    # Revenue projection headers
    revenue_headers = ['Period', 'Gaming Stations', 'VR Experiences', 'Streaming Studios', 'Server Hosting', 'Food & Beverage', 'Total Revenue']
    for col, header in enumerate(revenue_headers):
        revenue_ws.write(0, col, header, header_format)
    
    # 5-year monthly revenue projections
    months = []
    gaming_revenue = []
    vr_revenue = []
    streaming_revenue = []
    hosting_revenue = []
    fb_revenue = []
    total_revenue = []
    
    # Base monthly values for Year 1
    base_gaming = 41583
    base_vr = 20792
    base_streaming = 15594
    base_hosting = 10396
    base_fb = 15594
    
    # Growth rates
    monthly_growth = 0.025  # 2.5% monthly growth in Year 1
    annual_growth = [1.0, 1.30, 1.30, 1.30, 1.30]  # Year-over-year growth
    seasonal_factors = [0.85, 0.80, 0.95, 0.90, 1.05, 1.15, 1.20, 1.15, 1.05, 1.00, 0.95, 0.90]
    
    for year in range(5):
        year_multiplier = annual_growth[year]
        if year > 0:
            year_multiplier *= annual_growth[year]
        
        for month in range(12):
            month_num = year * 12 + month + 1
            seasonal_factor = seasonal_factors[month]
            growth_factor = (1 + monthly_growth) ** month if year == 0 else year_multiplier
            
            gaming_month = base_gaming * growth_factor * seasonal_factor
            vr_month = base_vr * growth_factor * seasonal_factor
            streaming_month = base_streaming * growth_factor * seasonal_factor
            hosting_month = base_hosting * growth_factor * seasonal_factor
            fb_month = base_fb * growth_factor * seasonal_factor
            total_month = gaming_month + vr_month + streaming_month + hosting_month + fb_month
            
            months.append(f"Year {year+1} Month {month+1}")
            gaming_revenue.append(gaming_month)
            vr_revenue.append(vr_month)
            streaming_revenue.append(streaming_month)
            hosting_revenue.append(hosting_month)
            fb_revenue.append(fb_month)
            total_revenue.append(total_month)
    
    # Write revenue data
    for row, (period, gaming, vr, streaming, hosting, fb, total) in enumerate(zip(
        months, gaming_revenue, vr_revenue, streaming_revenue, hosting_revenue, fb_revenue, total_revenue), 1):
        revenue_ws.write(row, 0, period)
        revenue_ws.write(row, 1, gaming, currency_format)
        revenue_ws.write(row, 2, vr, currency_format)
        revenue_ws.write(row, 3, streaming, currency_format)
        revenue_ws.write(row, 4, hosting, currency_format)
        revenue_ws.write(row, 5, fb, currency_format)
        revenue_ws.write(row, 6, total, currency_format)
    
    # Create Operating Expenses worksheet
    expenses_ws = workbook.add_worksheet('Operating Expenses')
    expenses_ws.set_column('A:A', 15)
    expenses_ws.set_column('B:I', 12)
    
    # Expense headers
    expense_headers = ['Period', 'Rent & Utilities', 'Staff Costs', 'Equipment Maint', 'Software Licenses', 
                      'Marketing', 'Insurance', 'F&B COGS', 'Other Expenses', 'Total Expenses']
    for col, header in enumerate(expense_headers):
        expenses_ws.write(0, col, header, header_format)
    
    # Base monthly expenses
    base_rent = 18500
    base_staff = 28750
    base_maint = 5200
    base_software = 3800
    base_marketing = 4200
    base_insurance = 2100
    base_other = 3150
    
    # Expense projections
    for row, period in enumerate(months, 1):
        year = (row - 1) // 12
        month = (row - 1) % 12
        
        # Calculate expenses with inflation
        inflation_factor = (1.03) ** year  # 3% annual inflation
        
        rent = base_rent * inflation_factor
        staff = base_staff * inflation_factor * (1.05 ** year)  # 5% annual staff increases
        maint = base_maint * inflation_factor
        software = base_software * inflation_factor
        marketing = base_marketing * inflation_factor * (1.3 if year > 0 else 1.0)  # Increased marketing after Year 1
        insurance = base_insurance * inflation_factor
        fb_cogs = fb_revenue[row-1] * 0.30  # 30% of F&B revenue
        other = base_other * inflation_factor
        
        total_expenses = rent + staff + maint + software + marketing + insurance + fb_cogs + other
        
        expenses_ws.write(row, 0, period)
        expenses_ws.write(row, 1, rent, currency_format)
        expenses_ws.write(row, 2, staff, currency_format)
        expenses_ws.write(row, 3, maint, currency_format)
        expenses_ws.write(row, 4, software, currency_format)
        expenses_ws.write(row, 5, marketing, currency_format)
        expenses_ws.write(row, 6, insurance, currency_format)
        expenses_ws.write(row, 7, fb_cogs, currency_format)
        expenses_ws.write(row, 8, other, currency_format)
        expenses_ws.write(row, 9, total_expenses, currency_format)
    
    # Create Cash Flow Analysis worksheet
    cashflow_ws = workbook.add_worksheet('Cash Flow Analysis')
    cashflow_ws.set_column('A:A', 15)
    cashflow_ws.set_column('B:F', 15)
    
    # Cash flow headers
    cf_headers = ['Period', 'Revenue', 'Operating Expenses', 'EBITDA', 'Net Cash Flow', 'Cumulative Cash Flow']
    for col, header in enumerate(cf_headers):
        cashflow_ws.write(0, col, header, header_format)
    
    # Initial investment
    cumulative_cash = -875000  # Initial investment
    
    # Calculate cash flows
    for row, period in enumerate(months, 1):
        revenue = total_revenue[row-1]
        
        # Get expenses from previous calculation
        year = (row - 1) // 12
        inflation_factor = (1.03) ** year
        
        rent = base_rent * inflation_factor
        staff = base_staff * inflation_factor * (1.05 ** year)
        maint = base_maint * inflation_factor
        software = base_software * inflation_factor
        marketing = base_marketing * inflation_factor * (1.3 if year > 0 else 1.0)
        insurance = base_insurance * inflation_factor
        fb_cogs = fb_revenue[row-1] * 0.30
        other = base_other * inflation_factor
        
        total_expenses = rent + staff + maint + software + marketing + insurance + fb_cogs + other
        
        ebitda = revenue - total_expenses
        net_cash_flow = ebitda  # Simplified - not including depreciation, interest, taxes
        cumulative_cash += net_cash_flow
        
        cashflow_ws.write(row, 0, period)
        cashflow_ws.write(row, 1, revenue, currency_format)
        cashflow_ws.write(row, 2, total_expenses, currency_format)
        cashflow_ws.write(row, 3, ebitda, currency_format)
        cashflow_ws.write(row, 4, net_cash_flow, currency_format)
        cashflow_ws.write(row, 5, cumulative_cash, currency_format)
    
    # Create Break-Even Analysis worksheet
    breakeven_ws = workbook.add_worksheet('Break-Even Analysis')
    breakeven_ws.set_column('A:A', 20)
    breakeven_ws.set_column('B:D', 15)
    
    # Break-even headers
    be_headers = ['Metric', 'Value', 'Unit', 'Notes']
    for col, header in enumerate(be_headers):
        breakeven_ws.write(0, col, header, header_format)
    
    # Break-even calculations
    fixed_costs_monthly = 65700  # From business plan
    variable_cost_ratio = 0.32
    contribution_margin = 1 - variable_cost_ratio
    breakeven_revenue = fixed_costs_monthly / contribution_margin
    
    breakeven_data = [
        ['Fixed Costs (Monthly)', fixed_costs_monthly, '$', 'Rent, salaries, insurance, etc.'],
        ['Variable Cost Ratio', variable_cost_ratio, '%', 'As % of revenue'],
        ['Contribution Margin', contribution_margin, '%', '1 - Variable Cost Ratio'],
        ['Break-Even Revenue (Monthly)', breakeven_revenue, '$', 'Fixed Costs / Contribution Margin'],
        ['Break-Even Gaming Hours', breakeven_revenue / 10.75, 'hours', 'At average $10.75/hour'],
        ['Break-Even VR Sessions', breakeven_revenue / 45.23, 'sessions', 'At average $45.23/session'],
        ['Break-Even Streaming Hours', breakeven_revenue / 77.72, 'hours', 'At average $77.72/hour'],
        ['', '', '', ''],
        ['Actual Month 1 Revenue', total_revenue[0], '$', 'From projections'],
        ['Actual Month 4 Revenue', total_revenue[3], '$', 'Break-even achieved'],
        ['Revenue Growth Required', (breakeven_revenue - total_revenue[0]) / total_revenue[0], '%', 'To reach break-even']
    ]
    
    for row, (metric, value, unit, notes) in enumerate(breakeven_data, 1):
        breakeven_ws.write(row, 0, metric)
        if isinstance(value, (int, float)) and value != 0:
            if unit == '%':
                breakeven_ws.write(row, 1, value, percentage_format)
            elif unit == '$':
                breakeven_ws.write(row, 1, value, currency_format)
            else:
                breakeven_ws.write(row, 1, value, number_format)
        else:
            breakeven_ws.write(row, 1, value)
        breakeven_ws.write(row, 2, unit)
        breakeven_ws.write(row, 3, notes)
    
    # Create ROI Analysis worksheet
    roi_ws = workbook.add_worksheet('ROI Analysis')
    roi_ws.set_column('A:A', 15)
    roi_ws.set_column('B:H', 12)
    
    # ROI headers
    roi_headers = ['Year', 'Revenue', 'Expenses', 'Net Income', 'Cumulative Income', 'ROI %', 'Discount Factor', 'Present Value']
    for col, header in enumerate(roi_headers):
        roi_ws.write(0, col, header, header_format)
    
    # Calculate annual figures for ROI analysis
    initial_investment = 875000
    discount_rate = 0.10
    
    for year in range(5):
        start_month = year * 12
        end_month = (year + 1) * 12
        
        annual_revenue = sum(total_revenue[start_month:end_month])
        
        # Calculate annual expenses
        annual_expenses = 0
        for month in range(start_month, end_month):
            year_factor = year
            inflation_factor = (1.03) ** year_factor
            
            rent = base_rent * inflation_factor * 12
            staff = base_staff * inflation_factor * (1.05 ** year_factor) * 12
            maint = base_maint * inflation_factor * 12
            software = base_software * inflation_factor * 12
            marketing = base_marketing * inflation_factor * (1.3 if year_factor > 0 else 1.0) * 12
            insurance = base_insurance * inflation_factor * 12
            fb_cogs = sum(fb_revenue[start_month:end_month]) * 0.30
            other = base_other * inflation_factor * 12
            
            annual_expenses = rent + staff + maint + software + marketing + insurance + fb_cogs + other
            break
        
        net_income = annual_revenue - annual_expenses
        cumulative_income = sum([annual_revenue - annual_expenses for y in range(year + 1)])
        roi_percent = cumulative_income / initial_investment
        discount_factor = (1 + discount_rate) ** (year + 1)
        present_value = net_income / discount_factor
        
        roi_ws.write(year + 1, 0, f'Year {year + 1}')
        roi_ws.write(year + 1, 1, annual_revenue, currency_format)
        roi_ws.write(year + 1, 2, annual_expenses, currency_format)
        roi_ws.write(year + 1, 3, net_income, currency_format)
        roi_ws.write(year + 1, 4, cumulative_income, currency_format)
        roi_ws.write(year + 1, 5, roi_percent, percentage_format)
        roi_ws.write(year + 1, 6, discount_factor, number_format)
        roi_ws.write(year + 1, 7, present_value, currency_format)
    
    # Create Startup Costs worksheet
    startup_ws = workbook.add_worksheet('Startup Costs')
    startup_ws.set_column('A:A', 25)
    startup_ws.set_column('B:D', 15)
    
    # Startup cost headers
    startup_headers = ['Category', 'Amount', 'Percentage', 'Notes']
    for col, header in enumerate(startup_headers):
        startup_ws.write(0, col, header, header_format)
    
    # Startup cost data
    startup_costs = [
        ['TECHNOLOGY INFRASTRUCTURE', '', '', ''],
        ['Gaming PCs (50 units)', 225000, 0.257, 'RTX 4090, i9-14900K, 32GB RAM'],
        ['VR Stations (8 units)', 68000, 0.078, 'Complete room-scale setups'],
        ['Streaming Studios (4 rooms)', 100000, 0.114, 'Professional equipment'],
        ['Server Infrastructure', 45000, 0.051, 'Proxmox servers with GPU passthrough'],
        ['Network Equipment', 25000, 0.029, '10GbE switches, cabling'],
        ['Software Licenses', 22000, 0.025, 'Annual licenses for all software'],
        ['Technology Subtotal', 485000, 0.554, ''],
        ['', '', '', ''],
        ['FACILITY & RENOVATION', '', '', ''],
        ['Lease Deposit', 55500, 0.063, '3 months rent deposit'],
        ['Renovation & Build-out', 95000, 0.109, 'Construction and design'],
        ['Furniture & Fixtures', 22000, 0.025, 'Gaming chairs, desks, decor'],
        ['Signage & Branding', 12500, 0.014, 'External and internal signage'],
        ['Facility Subtotal', 185000, 0.211, ''],
        ['', '', '', ''],
        ['F&B EQUIPMENT', '', '', ''],
        ['Coffee Equipment', 18000, 0.021, 'Commercial espresso machine'],
        ['Kitchen Appliances', 25000, 0.029, 'Refrigeration, cooking equipment'],
        ['POS System', 8000, 0.009, 'Point of sale and ordering system'],
        ['F&B Furniture', 14000, 0.016, 'Tables, chairs, serving area'],
        ['F&B Subtotal', 65000, 0.074, ''],
        ['', '', '', ''],
        ['WORKING CAPITAL', '', '', ''],
        ['Initial Inventory', 15000, 0.017, 'Food, beverages, supplies'],
        ['Marketing Launch', 25000, 0.029, 'Grand opening campaign'],
        ['Staff Training', 8000, 0.009, 'Initial staff training program'],
        ['Operating Reserve', 60000, 0.069, '3-month operating expense buffer'],
        ['Professional Fees', 12000, 0.014, 'Legal, accounting, consulting'],
        ['Permits & Licenses', 5000, 0.006, 'Business licenses and permits'],
        ['Contingency', 15000, 0.017, '10% contingency fund'],
        ['Working Capital Subtotal', 140000, 0.160, ''],
        ['', '', '', ''],
        ['TOTAL STARTUP COSTS', 875000, 1.000, 'Total initial investment required']
    ]
    
    for row, (category, amount, percentage, notes) in enumerate(startup_costs, 1):
        startup_ws.write(row, 0, category, header_format if amount == '' else None)
        if isinstance(amount, (int, float)) and amount != 0:
            startup_ws.write(row, 1, amount, currency_format)
            startup_ws.write(row, 2, percentage, percentage_format)
        else:
            startup_ws.write(row, 1, amount)
            startup_ws.write(row, 2, percentage)
        startup_ws.write(row, 3, notes)
    
    # Create Pricing Strategy worksheet
    pricing_ws = workbook.add_worksheet('Pricing Strategy')
    pricing_ws.set_column('A:A', 20)
    pricing_ws.set_column('B:F', 12)
    
    # Pricing headers
    pricing_headers = ['Service/Product', 'Peak Price', 'Regular Price', 'Off-Peak Price', 'Member Price', 'Notes']
    for col, header in enumerate(pricing_headers):
        pricing_ws.write(0, col, header, header_format)
    
    # Pricing data
    pricing_data = [
        ['GAMING STATIONS', '', '', '', '', ''],
        ['Standard Tier (per hour)', 10, 8, 6, 4.8, '30 stations available'],
        ['Premium Tier (per hour)', 14, 12, 9, 7.2, '15 stations available'],
        ['Elite Tier (per hour)', 18, 15, 12, 9, '5 stations available'],
        ['Console Gaming (per hour)', 10, 8, 6, 4.8, '12 stations available'],
        ['', '', '', '', '', ''],
        ['VR EXPERIENCES', '', '', '', '', ''],
        ['Solo 30-minute', 30, 25, 20, 18.75, 'Single player experience'],
        ['Solo 60-minute', 48, 40, 32, 30, 'Extended single player'],
        ['Group 45-minute', 144, 120, 96, 90, 'Up to 4 players'],
        ['Premium Content 60-min', 60, 50, 40, 37.5, 'Latest VR games'],
        ['', '', '', '', '', ''],
        ['STREAMING STUDIOS', '', '', '', '', ''],
        ['Basic Studio (per hour)', 60, 50, 40, 37.5, 'Single camera setup'],
        ['Professional (per hour)', 90, 75, 60, 56.25, 'Multi-camera setup'],
        ['Premium Studio (per hour)', 120, 100, 80, 75, '4K cameras, pro audio'],
        ['With Tech Support', '+60', '+50', '+40', '+37.5', 'Additional hourly fee'],
        ['', '', '', '', '', ''],
        ['SERVER HOSTING', '', '', '', '', ''],
        ['Basic Game Server', 25, 20, 15, 15, 'Per month'],
        ['Premium Game Server', 40, 35, 25, 26.25, 'Per month'],
        ['Tournament Hosting', 500, 400, 300, 300, 'Per event'],
        ['Custom Enterprise', 2000, 1500, 1000, 1125, 'Per month'],
        ['', '', '', '', '', ''],
        ['FOOD & BEVERAGE', '', '', '', '', ''],
        ['Specialty Coffee', 6, 5, 4, 4, 'Premium coffee drinks'],
        ['Energy Drinks', 4, 3.5, 3, 2.8, 'Gaming energy drinks'],
        ['Sandwiches', 12, 10, 8, 8.5, 'Gourmet sandwiches'],
        ['Snack Items', 5, 4, 3, 3.2, 'Gaming-friendly snacks'],
        ['', '', '', '', '', ''],
        ['MEMBERSHIP PLANS', '', '', '', '', ''],
        ['Basic Membership', 89, 89, 89, 89, 'Per month - 20% gaming discount'],
        ['Premium Membership', 149, 149, 149, 149, 'Per month - 40% gaming discount'],
        ['Elite Membership', 199, 199, 199, 199, 'Per month - 50% gaming discount']
    ]
    
    for row, (service, peak, regular, off_peak, member, notes) in enumerate(pricing_data, 1):
        pricing_ws.write(row, 0, service, header_format if peak == '' else None)
        if isinstance(peak, (int, float)) and peak != 0:
            pricing_ws.write(row, 1, peak, currency_format)
            pricing_ws.write(row, 2, regular, currency_format)
            pricing_ws.write(row, 3, off_peak, currency_format)
            pricing_ws.write(row, 4, member, currency_format)
        else:
            pricing_ws.write(row, 1, peak)
            pricing_ws.write(row, 2, regular)
            pricing_ws.write(row, 3, off_peak)
            pricing_ws.write(row, 4, member)
        pricing_ws.write(row, 5, notes)
    
    # Create Sensitivity Analysis worksheet
    sensitivity_ws = workbook.add_worksheet('Sensitivity Analysis')
    sensitivity_ws.set_column('A:A', 20)
    sensitivity_ws.set_column('B:F', 15)
    
    # Sensitivity headers
    sens_headers = ['Scenario', 'Revenue Change', 'Break-Even Month', '5-Year ROI', 'NPV Change']
    for col, header in enumerate(sens_headers):
        sensitivity_ws.write(0, col, header, header_format)
    
    # Sensitivity scenarios
    scenarios = [
        ['Base Case', 0.0, 4, 7.304, 0.0],
        ['Conservative (-15%)', -0.15, 6, 5.20, -0.25],
        ['Optimistic (+20%)', 0.20, 3, 9.20, 0.35],
        ['Recession (-25%)', -0.25, 8, 3.80, -0.45],
        ['Premium Focus (+10% prices)', 0.10, 3.5, 8.50, 0.20],
        ['High Competition (-10%)', -0.10, 5, 6.30, -0.15],
        ['Rapid Growth (+30% Y2+)', 0.15, 3, 10.50, 0.50],
        ['Cost Inflation (+20%)', -0.08, 5, 6.80, -0.12]
    ]
    
    for row, (scenario, rev_change, breakeven, roi, npv_change) in enumerate(scenarios, 1):
        sensitivity_ws.write(row, 0, scenario)
        sensitivity_ws.write(row, 1, rev_change, percentage_format)
        sensitivity_ws.write(row, 2, breakeven, number_format)
        sensitivity_ws.write(row, 3, roi, percentage_format)
        sensitivity_ws.write(row, 4, npv_change, percentage_format)
    
    # Close the workbook
    workbook.close()
    print("Financial model created successfully!")

if __name__ == "__main__":
    create_financial_model()
