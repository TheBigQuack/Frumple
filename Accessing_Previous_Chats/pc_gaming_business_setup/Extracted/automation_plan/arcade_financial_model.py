#!/usr/bin/env python3
"""
Arcade Lounge Financial Model Generator
Creates detailed financial projections based on industry data
"""

import json
import pandas as pd
from datetime import datetime

def generate_startup_cost_scenarios():
    """Generate startup cost scenarios for different arcade sizes"""
    scenarios = {
        "Small Arcade (10-15 machines)": {
            "real_estate_lease": {"min": 6000, "max": 15000, "avg": 10500},
            "renovation": {"min": 10000, "max": 30000, "avg": 20000},
            "arcade_machines": {"min": 20000, "max": 45000, "avg": 32500},
            "pos_tech_systems": {"min": 3000, "max": 8000, "avg": 5500},
            "furniture_decor": {"min": 5000, "max": 10000, "avg": 7500},
            "security_systems": {"min": 4000, "max": 8000, "avg": 6000},
            "initial_inventory": {"min": 6000, "max": 12000, "avg": 9000},
            "licenses_permits": {"min": 500, "max": 3000, "avg": 1750},
            "insurance": {"min": 4000, "max": 8000, "avg": 6000},
            "marketing_launch": {"min": 8000, "max": 15000, "avg": 11500},
            "working_capital": {"min": 50000, "max": 100000, "avg": 75000},
            "total_range": {"min": 65000, "max": 143000, "avg": 104500}
        },
        "Medium Arcade (20-30 machines)": {
            "real_estate_lease": {"min": 15000, "max": 30000, "avg": 22500},
            "renovation": {"min": 30000, "max": 80000, "avg": 55000},
            "arcade_machines": {"min": 75000, "max": 150000, "avg": 112500},
            "pos_tech_systems": {"min": 8000, "max": 20000, "avg": 14000},
            "furniture_decor": {"min": 10000, "max": 25000, "avg": 17500},
            "security_systems": {"min": 8000, "max": 15000, "avg": 11500},
            "initial_inventory": {"min": 12000, "max": 20000, "avg": 16000},
            "licenses_permits": {"min": 2000, "max": 5000, "avg": 3500},
            "insurance": {"min": 8000, "max": 15000, "avg": 11500},
            "marketing_launch": {"min": 15000, "max": 30000, "avg": 22500},
            "working_capital": {"min": 100000, "max": 200000, "avg": 150000},
            "total_range": {"min": 150000, "max": 300000, "avg": 225000}
        },
        "Large Arcade (40+ machines)": {
            "real_estate_lease": {"min": 30000, "max": 60000, "avg": 45000},
            "renovation": {"min": 80000, "max": 200000, "avg": 140000},
            "arcade_machines": {"min": 200000, "max": 400000, "avg": 300000},
            "pos_tech_systems": {"min": 20000, "max": 50000, "avg": 35000},
            "furniture_decor": {"min": 25000, "max": 50000, "avg": 37500},
            "security_systems": {"min": 15000, "max": 30000, "avg": 22500},
            "initial_inventory": {"min": 20000, "max": 40000, "avg": 30000},
            "licenses_permits": {"min": 5000, "max": 10000, "avg": 7500},
            "insurance": {"min": 15000, "max": 30000, "avg": 22500},
            "marketing_launch": {"min": 30000, "max": 60000, "avg": 45000},
            "working_capital": {"min": 200000, "max": 400000, "avg": 300000},
            "total_range": {"min": 500000, "max": 730000, "avg": 615000}
        }
    }
    return scenarios

def generate_operating_expenses():
    """Generate monthly operating expense models"""
    operating_costs = {
        "Small Arcade": {
            "rent": {"min": 4000, "max": 8000, "avg": 6000},
            "utilities": {"min": 800, "max": 1500, "avg": 1150},
            "staff_wages": {"min": 8000, "max": 15000, "avg": 11500},
            "machine_maintenance": {"min": 500, "max": 1500, "avg": 1000},
            "insurance": {"min": 300, "max": 600, "avg": 450},
            "marketing": {"min": 1000, "max": 3000, "avg": 2000},
            "inventory_restocking": {"min": 500, "max": 1000, "avg": 750},
            "licenses_permits": {"min": 100, "max": 300, "avg": 200},
            "miscellaneous": {"min": 500, "max": 1000, "avg": 750},
            "total_monthly": {"min": 15700, "max": 30900, "avg": 23800}
        },
        "Medium Arcade": {
            "rent": {"min": 8000, "max": 15000, "avg": 11500},
            "utilities": {"min": 1500, "max": 3000, "avg": 2250},
            "staff_wages": {"min": 15000, "max": 30000, "avg": 22500},
            "machine_maintenance": {"min": 1000, "max": 3000, "avg": 2000},
            "insurance": {"min": 600, "max": 1200, "avg": 900},
            "marketing": {"min": 2000, "max": 5000, "avg": 3500},
            "inventory_restocking": {"min": 1000, "max": 2000, "avg": 1500},
            "licenses_permits": {"min": 200, "max": 500, "avg": 350},
            "miscellaneous": {"min": 1000, "max": 2000, "avg": 1500},
            "total_monthly": {"min": 30300, "max": 61700, "avg": 46000}
        },
        "Large Arcade": {
            "rent": {"min": 15000, "max": 30000, "avg": 22500},
            "utilities": {"min": 3000, "max": 6000, "avg": 4500},
            "staff_wages": {"min": 30000, "max": 60000, "avg": 45000},
            "machine_maintenance": {"min": 2000, "max": 5000, "avg": 3500},
            "insurance": {"min": 1200, "max": 2500, "avg": 1850},
            "marketing": {"min": 3000, "max": 8000, "avg": 5500},
            "inventory_restocking": {"min": 2000, "max": 4000, "avg": 3000},
            "licenses_permits": {"min": 300, "max": 800, "avg": 550},
            "miscellaneous": {"min": 2000, "max": 4000, "avg": 3000},
            "total_monthly": {"min": 58500, "max": 120300, "avg": 89400}
        }
    }
    return operating_costs

def generate_revenue_projections():
    """Generate revenue projection models"""
    revenue_models = {
        "Small Arcade": {
            "machines_count": {"min": 10, "max": 15, "avg": 12},
            "revenue_per_machine_daily": {"min": 15, "max": 35, "avg": 25},
            "food_beverage_monthly": {"min": 3000, "max": 8000, "avg": 5500},
            "events_parties_monthly": {"min": 2000, "max": 6000, "avg": 4000},
            "monthly_revenue": {"min": 9500, "max": 29750, "avg": 19625},
            "annual_revenue": {"min": 114000, "max": 357000, "avg": 235500}
        },
        "Medium Arcade": {
            "machines_count": {"min": 20, "max": 30, "avg": 25},
            "revenue_per_machine_daily": {"min": 20, "max": 40, "avg": 30},
            "food_beverage_monthly": {"min": 8000, "max": 20000, "avg": 14000},
            "events_parties_monthly": {"min": 6000, "max": 15000, "avg": 10500},
            "monthly_revenue": {"min": 26400, "max": 71000, "avg": 48700},
            "annual_revenue": {"min": 316800, "max": 852000, "avg": 584400}
        },
        "Large Arcade": {
            "machines_count": {"min": 40, "max": 60, "avg": 50},
            "revenue_per_machine_daily": {"min": 25, "max": 50, "avg": 37.5},
            "food_beverage_monthly": {"min": 20000, "max": 50000, "avg": 35000},
            "events_parties_monthly": {"min": 15000, "max": 40000, "avg": 27500},
            "monthly_revenue": {"min": 65000, "max": 182000, "avg": 123500},
            "annual_revenue": {"min": 780000, "max": 2184000, "avg": 1482000}
        }
    }
    return revenue_models

def calculate_break_even_analysis():
    """Calculate break-even points for different scenarios"""
    startup_costs = generate_startup_cost_scenarios()
    operating_costs = generate_operating_expenses()
    revenue_models = generate_revenue_projections()
    
    break_even_analysis = {}
    
    size_mappings = {
        "Small Arcade (10-15 machines)": "Small Arcade",
        "Medium Arcade (20-30 machines)": "Medium Arcade", 
        "Large Arcade (40+ machines)": "Large Arcade"
    }
    
    for startup_key, size in size_mappings.items():
        startup_avg = startup_costs[startup_key]["total_range"]["avg"]
        monthly_revenue_avg = revenue_models[size]["monthly_revenue"]["avg"]
        monthly_costs_avg = operating_costs[size]["total_monthly"]["avg"]
        monthly_profit = monthly_revenue_avg - monthly_costs_avg
        
        if monthly_profit > 0:
            break_even_months = startup_avg / monthly_profit
            break_even_analysis[size] = {
                "startup_investment": startup_avg,
                "monthly_revenue": monthly_revenue_avg,
                "monthly_costs": monthly_costs_avg,
                "monthly_profit": monthly_profit,
                "break_even_months": round(break_even_months, 1),
                "break_even_years": round(break_even_months / 12, 1),
                "annual_profit": monthly_profit * 12,
                "profit_margin": round((monthly_profit / monthly_revenue_avg) * 100, 1)
            }
        else:
            break_even_analysis[size] = {
                "startup_investment": startup_avg,
                "monthly_revenue": monthly_revenue_avg,
                "monthly_costs": monthly_costs_avg,
                "monthly_profit": monthly_profit,
                "break_even_months": "Not profitable",
                "break_even_years": "Not profitable",
                "annual_profit": monthly_profit * 12,
                "profit_margin": round((monthly_profit / monthly_revenue_avg) * 100, 1)
            }
    
    return break_even_analysis

def calculate_roi_scenarios():
    """Calculate ROI scenarios over different time periods"""
    break_even = calculate_break_even_analysis()
    roi_scenarios = {}
    
    for size, data in break_even.items():
        if isinstance(data["break_even_months"], (int, float)):
            # 3-year ROI calculation
            initial_investment = data["startup_investment"]
            annual_profit = data["annual_profit"]
            
            roi_3_year = ((annual_profit * 3) / initial_investment) * 100
            roi_5_year = ((annual_profit * 5) / initial_investment) * 100
            
            roi_scenarios[size] = {
                "initial_investment": initial_investment,
                "annual_profit": annual_profit,
                "3_year_total_profit": annual_profit * 3,
                "5_year_total_profit": annual_profit * 5,
                "3_year_roi_percentage": round(roi_3_year, 1),
                "5_year_roi_percentage": round(roi_5_year, 1),
                "payback_period_years": data["break_even_years"]
            }
    
    return roi_scenarios

def generate_pricing_strategies():
    """Generate pricing strategy recommendations"""
    pricing_strategies = {
        "Token-Based Pricing": {
            "description": "Traditional arcade model with tokens or cards",
            "token_price": "$0.25 - $1.00 per token",
            "games_per_token": "1-4 games depending on machine type",
            "advantages": ["Familiar to customers", "Easy to track", "Encourages bulk purchases"],
            "revenue_impact": "Standard baseline revenue model"
        },
        "Time-Based Pricing": {
            "description": "Hourly or daily passes for unlimited play",
            "hourly_rate": "$15 - $25 per hour",
            "daily_pass": "$35 - $60 per day",
            "advantages": ["Higher revenue per customer", "Longer customer stays", "Predictable pricing"],
            "revenue_impact": "15-25% higher revenue per customer"
        },
        "Membership Model": {
            "description": "Monthly or annual memberships with benefits",
            "monthly_membership": "$25 - $50 per month",
            "annual_membership": "$250 - $500 per year",
            "advantages": ["Recurring revenue", "Customer loyalty", "Predictable cash flow"],
            "revenue_impact": "30-40% more stable revenue stream"
        },
        "Hybrid Pricing": {
            "description": "Combination of tokens, time passes, and memberships",
            "flexibility": "Multiple pricing options for different customer segments",
            "advantages": ["Maximizes revenue potential", "Appeals to all customer types", "Optimizes per-customer value"],
            "revenue_impact": "20-35% higher overall revenue"
        }
    }
    return pricing_strategies

def generate_scalability_models():
    """Generate scalability analysis"""
    scalability_models = {
        "Horizontal Scaling": {
            "approach": "Opening additional locations",
            "investment_per_location": "$150,000 - $300,000",
            "timeline": "12-18 months per new location",
            "roi_impact": "Economies of scale reduce per-location costs by 10-15%",
            "risk_factors": ["Market saturation", "Management complexity", "Capital requirements"]
        },
        "Vertical Scaling": {
            "approach": "Expanding services at existing location",
            "additional_services": ["Food service expansion", "Private party rooms", "Gaming tournaments", "Retail merchandise"],
            "investment_required": "$25,000 - $100,000",
            "revenue_increase": "15-30% additional revenue",
            "timeline": "3-6 months implementation"
        },
        "Franchise Model": {
            "approach": "Licensing business model to franchisees",
            "franchise_fee": "$25,000 - $50,000",
            "royalty_percentage": "5-8% of gross revenue",
            "investment_from_franchisor": "$50,000 - $100,000 for systems and support",
            "scalability_potential": "Rapid expansion with lower capital requirements"
        }
    }
    return scalability_models

def generate_funding_requirements():
    """Generate funding requirement analysis"""
    funding_analysis = {
        "Startup Funding Needs": {
            "Small Arcade": {
                "total_funding_required": "$104,500 - $143,000",
                "recommended_funding": "$150,000 - $200,000 (including buffer)",
                "funding_sources": ["Personal savings", "Small business loans", "Angel investors", "Crowdfunding"]
            },
            "Medium Arcade": {
                "total_funding_required": "$225,000 - $300,000",
                "recommended_funding": "$350,000 - $450,000 (including buffer)",
                "funding_sources": ["SBA loans", "Angel investors", "Venture capital", "Equipment financing"]
            },
            "Large Arcade": {
                "total_funding_required": "$615,000 - $730,000",
                "recommended_funding": "$800,000 - $1,000,000 (including buffer)",
                "funding_sources": ["Venture capital", "Private equity", "Commercial loans", "Strategic partnerships"]
            }
        },
        "Working Capital Requirements": {
            "months_of_coverage": "6-12 months of operating expenses",
            "seasonal_considerations": "Higher requirements during slower months (typically Jan-Mar)",
            "growth_capital": "Additional 20-30% for expansion opportunities"
        },
        "Investor Expectations": {
            "Angel Investors": {
                "typical_investment": "$25,000 - $100,000",
                "expected_roi": "20-30% annually",
                "involvement_level": "Advisory role, industry connections"
            },
            "Venture Capital": {
                "typical_investment": "$500,000 - $2,000,000",
                "expected_roi": "25-40% annually",
                "involvement_level": "Board seats, strategic guidance, exit planning"
            },
            "Private Equity": {
                "typical_investment": "$1,000,000+",
                "expected_roi": "20-25% annually",
                "involvement_level": "Operational improvements, scaling strategies"
            }
        }
    }
    return funding_analysis

def main():
    """Generate comprehensive financial model"""
    print("Generating Arcade Lounge Financial Analysis Model...")
    
    # Generate all financial components
    startup_costs = generate_startup_cost_scenarios()
    operating_costs = generate_operating_expenses()
    revenue_models = generate_revenue_projections()
    break_even_analysis = calculate_break_even_analysis()
    roi_scenarios = calculate_roi_scenarios()
    pricing_strategies = generate_pricing_strategies()
    scalability_models = generate_scalability_models()
    funding_requirements = generate_funding_requirements()
    
    # Compile comprehensive model
    financial_model = {
        "generated_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "startup_cost_scenarios": startup_costs,
        "monthly_operating_expenses": operating_costs,
        "revenue_projections": revenue_models,
        "break_even_analysis": break_even_analysis,
        "roi_scenarios": roi_scenarios,
        "pricing_strategies": pricing_strategies,
        "scalability_models": scalability_models,
        "funding_requirements": funding_requirements
    }
    
    # Save to markdown file
    output_file = "/home/ubuntu/.research_files/arcade_financial_model.md"
    
    with open(output_file, 'w') as f:
        f.write("# Arcade Lounge Financial Model Analysis\n\n")
        f.write(f"*Generated on: {financial_model['generated_date']}*\n\n")
        
        # Startup Costs Section
        f.write("## Startup Cost Scenarios\n\n")
        for size, costs in startup_costs.items():
            f.write(f"### {size}\n")
            f.write(f"**Total Investment Range:** ${costs['total_range']['min']:,} - ${costs['total_range']['max']:,}\n")
            f.write(f"**Average Investment:** ${costs['total_range']['avg']:,}\n\n")
            f.write("**Detailed Breakdown:**\n")
            for category, values in costs.items():
                if category != 'total_range':
                    category_name = category.replace('_', ' ').title()
                    f.write(f"- {category_name}: ${values['min']:,} - ${values['max']:,} (avg: ${values['avg']:,})\n")
            f.write("\n")
        
        # Operating Expenses Section
        f.write("## Monthly Operating Expenses\n\n")
        for size, expenses in operating_costs.items():
            f.write(f"### {size}\n")
            f.write(f"**Total Monthly Range:** ${expenses['total_monthly']['min']:,} - ${expenses['total_monthly']['max']:,}\n")
            f.write(f"**Average Monthly:** ${expenses['total_monthly']['avg']:,}\n\n")
            f.write("**Expense Breakdown:**\n")
            for category, values in expenses.items():
                if category != 'total_monthly':
                    category_name = category.replace('_', ' ').title()
                    f.write(f"- {category_name}: ${values['min']:,} - ${values['max']:,} (avg: ${values['avg']:,})\n")
            f.write("\n")
        
        # Revenue Projections Section
        f.write("## Revenue Projections\n\n")
        for size, revenue in revenue_models.items():
            f.write(f"### {size}\n")
            f.write(f"**Machine Count:** {revenue['machines_count']['min']} - {revenue['machines_count']['max']} machines\n")
            f.write(f"**Revenue per Machine (Daily):** ${revenue['revenue_per_machine_daily']['min']} - ${revenue['revenue_per_machine_daily']['max']}\n")
            f.write(f"**Monthly Revenue Range:** ${revenue['monthly_revenue']['min']:,} - ${revenue['monthly_revenue']['max']:,}\n")
            f.write(f"**Average Monthly Revenue:** ${revenue['monthly_revenue']['avg']:,}\n")
            f.write(f"**Annual Revenue Range:** ${revenue['annual_revenue']['min']:,} - ${revenue['annual_revenue']['max']:,}\n\n")
        
        # Break-Even Analysis Section
        f.write("## Break-Even Analysis\n\n")
        for size, analysis in break_even_analysis.items():
            f.write(f"### {size}\n")
            f.write(f"**Initial Investment:** ${analysis['startup_investment']:,}\n")
            f.write(f"**Monthly Revenue:** ${analysis['monthly_revenue']:,}\n")
            f.write(f"**Monthly Costs:** ${analysis['monthly_costs']:,}\n")
            f.write(f"**Monthly Profit:** ${analysis['monthly_profit']:,}\n")
            f.write(f"**Profit Margin:** {analysis['profit_margin']}%\n")
            f.write(f"**Break-Even Period:** {analysis['break_even_months']} months ({analysis['break_even_years']} years)\n")
            f.write(f"**Annual Profit:** ${analysis['annual_profit']:,}\n\n")
        
        # ROI Scenarios Section
        f.write("## ROI Scenarios\n\n")
        for size, roi in roi_scenarios.items():
            f.write(f"### {size}\n")
            f.write(f"**Initial Investment:** ${roi['initial_investment']:,}\n")
            f.write(f"**Annual Profit:** ${roi['annual_profit']:,}\n")
            f.write(f"**3-Year Total Profit:** ${roi['3_year_total_profit']:,}\n")
            f.write(f"**3-Year ROI:** {roi['3_year_roi_percentage']}%\n")
            f.write(f"**5-Year Total Profit:** ${roi['5_year_total_profit']:,}\n")
            f.write(f"**5-Year ROI:** {roi['5_year_roi_percentage']}%\n")
            f.write(f"**Payback Period:** {roi['payback_period_years']} years\n\n")
        
        # Pricing Strategies Section
        f.write("## Pricing Strategies\n\n")
        for strategy, details in pricing_strategies.items():
            f.write(f"### {strategy}\n")
            f.write(f"**Description:** {details['description']}\n")
            for key, value in details.items():
                if key not in ['description', 'advantages']:
                    f.write(f"**{key.replace('_', ' ').title()}:** {value}\n")
            f.write(f"**Advantages:** {', '.join(details['advantages'])}\n\n")
        
        # Scalability Models Section
        f.write("## Scalability Models\n\n")
        for model, details in scalability_models.items():
            f.write(f"### {model}\n")
            for key, value in details.items():
                if isinstance(value, list):
                    f.write(f"**{key.replace('_', ' ').title()}:** {', '.join(value)}\n")
                else:
                    f.write(f"**{key.replace('_', ' ').title()}:** {value}\n")
            f.write("\n")
        
        # Funding Requirements Section
        f.write("## Funding Requirements\n\n")
        startup_funding = funding_requirements["Startup Funding Needs"]
        for size, funding in startup_funding.items():
            f.write(f"### {size}\n")
            for key, value in funding.items():
                if isinstance(value, list):
                    f.write(f"**{key.replace('_', ' ').title()}:** {', '.join(value)}\n")
                else:
                    f.write(f"**{key.replace('_', ' ').title()}:** {value}\n")
            f.write("\n")
        
        f.write("### Investor Expectations\n\n")
        investor_expectations = funding_requirements["Investor Expectations"]
        for investor_type, details in investor_expectations.items():
            f.write(f"**{investor_type}:**\n")
            for key, value in details.items():
                f.write(f"- {key.replace('_', ' ').title()}: {value}\n")
            f.write("\n")
    
    print(f"Financial model saved to: {output_file}")
    return output_file

if __name__ == "__main__":
    main()
