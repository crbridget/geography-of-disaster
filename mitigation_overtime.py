import pandas as pd

disaster_summaries = pd.read_csv('data/disaster_summaries.csv')
hazard_grants = pd.read_csv('data/hazard_grants.csv')


merged_df = disaster_summaries.merge(hazard_grants, on='disasterNumber')

# Convert declarationDate to datetime
merged_df['declarationDate'] = pd.to_datetime(merged_df['declarationDate'])

# Create year and month columns
merged_df['year'] = merged_df['declarationDate'].dt.year
merged_df['month'] = merged_df['declarationDate'].dt.month

merged_df.to_csv('data/merged_df.csv', index=False)
