---
title: NTX Investors
description: Full CRM system designed specifically for managing investor operations within limo and fleet businesses.
year: 2025
date: 2025-10-15
url: https://ntxinvestors.com
github: https://github.com/genesisx-1/ntxinvestors
technologies:
  - Django
  - Python
  - PostgreSQL
  - Chart.js
  - Pandas
  - Railway
  - WhiteNoise
---

I built a full CRM system designed specifically for managing investor operations within limo and fleet businesses.

I structured the backend using Django with a fully custom user model so I could support different roles like admins, dispatchers and investors. I added a CSV import pipeline using pandas so the company can upload large spreadsheets of vehicles and financial data without manual work.

On top of that, I built a full analytics dashboard using Chart.js, powered by models like Fleet, VehicleRecord, FleetSummary and InvestorProfile. The platform runs on Railway with PostgreSQL, static assets handled through WhiteNoise, and a dark UI theme across the entire dashboard.

