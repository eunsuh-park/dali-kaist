"""
Excel to JSON Converter
This script converts datatable.xlsx to datatable.json
Usage: python convert_excel_to_json.py
"""
import pandas as pd
import json
import sys

try:
    # Read Excel file
    print("Reading datatable.xlsx...")
    df = pd.read_excel('datatable.xlsx', engine='openpyxl')
    
    # Convert to list of dictionaries
    data = df.to_dict('records')
    
    # Clean up NaN values
    for record in data:
        for key, value in record.items():
            if pd.isna(value):
                record[key] = ''
    
    # Save as JSON with UTF-8 encoding
    with open('datatable.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # Also create a JavaScript file for direct import (no fetch needed)
    js_content = 'const publicationsData = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';'
    with open('publications-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("Successfully converted to datatable.json and publications-data.js")
    print(f"  Total publications: {len(data)}")
    print(f"  Columns: {', '.join(df.columns.tolist())}")
    
    # Show year distribution
    if 'Year' in df.columns or 'year' in df.columns:
        year_col = 'Year' if 'Year' in df.columns else 'year'
        year_counts = df[year_col].value_counts().sort_index(ascending=False)
        print(f"\n  Publications by year:")
        for year, count in year_counts.items():
            if pd.notna(year):
                print(f"    {year}: {count}")
    
except ImportError:
    print("Error: Required packages not installed.")
    print("Please install: pip install pandas openpyxl")
    sys.exit(1)
except FileNotFoundError:
    print("Error: datatable.xlsx not found in current directory")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

