---
title: Building NTX Investors - A Custom CRM for Fleet Operations
date: 2025-10-14
excerpt: Developing a full CRM system specifically designed for managing investor operations in limo and fleet businesses.
---

## Understanding the Requirements

The project started with understanding the unique needs of managing investor operations in the limo and fleet industry. Unlike standard CRMs, this system needed to handle vehicle records, financial data, investor profiles, and fleet summaries all in one place.

## Backend Architecture

I chose Django for the backend because of its robust admin interface and flexible model system. The first major task was creating a fully custom user model that could support different roles: admins, dispatchers, and investors. Each role needed different permissions and access levels.

## CSV Import Pipeline

One of the biggest time-savers was building the CSV import pipeline using pandas. The company was managing hundreds of vehicles and financial records in spreadsheets, and manually entering this data would have taken weeks. I built a system that could parse large CSV files, validate the data, and import everything automatically.

This required careful error handling for malformed data and duplicate entries. I added detailed logging so the team could see exactly what was imported and what needed attention.

## Analytics Dashboard

The analytics dashboard was built using Chart.js and powered by custom Django models: Fleet, VehicleRecord, FleetSummary, and InvestorProfile. I created views that aggregated data from multiple sources to show comprehensive insights.

The dashboard needed to load quickly even with large datasets, so I optimized the database queries and added caching where appropriate.

## Deployment

I deployed the platform on Railway with PostgreSQL for the database. Static assets are handled through WhiteNoise, which simplified the deployment process. The entire platform uses a dark UI theme for a modern, professional look.

## Results

The system transformed how the company managed investor operations. What used to take hours of manual spreadsheet work now happens automatically, and the analytics dashboard provides insights that weren't possible before.

