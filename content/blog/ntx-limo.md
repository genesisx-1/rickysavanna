---
title: Building NTX Limo - Real-Time Dispatch System
date: 2025-11-09
excerpt: How I built a complete limo dispatch and booking system with real-time updates and mobile alerts.
---

## The Challenge

NTX Limo needed a dispatch system that could handle real-time bookings, driver status updates, and provide instant notifications to dispatchers. The system had to be fast, reliable, and work seamlessly on both desktop and mobile devices.

## Choosing the Tech Stack

I decided on Next.js + TypeScript for the frontend, which gave me type safety and excellent performance. For the backend and real-time features, I chose Supabase, which provided authentication and real-time database subscriptions out of the box.

## Building the Core Features

The first major component was the authentication system. I integrated Supabase auth to handle dispatcher logins securely. Then I built the real-time subscription system so dispatchers could see new bookings and driver statuses instantly without refreshing the page.

## Custom Components

I designed a dark, modern interface using Tailwind-style utility classes. The map view was particularly challenging - I needed to show all active bookings and driver locations in real-time. I built custom components for booking cards that displayed all relevant information at a glance.

The driver list component needed to show current status, location, and assigned bookings. I made it update automatically as drivers moved or changed status.

## Mobile Alerts

One of the most important features was the mobile alert system. I integrated sound and vibration alerts for new bookings so dispatchers wouldn't miss critical requests even when away from their desk. This required careful handling of browser permissions and notification APIs.

## Architecture Decisions

I organized the codebase with a clear structure: /app for routes, /components for reusable UI elements, /lib for utilities, and /stores for state management. This made the codebase scalable and easy to maintain as features grew.

## Launch

After extensive testing with real dispatchers and drivers, the system went live. The real-time updates and mobile alerts transformed how the team managed bookings, significantly improving response times and efficiency.

