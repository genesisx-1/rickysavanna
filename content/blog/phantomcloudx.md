---
title: Building PhantomCloudX - A Multi-Account Trading Journal
date: 2024-06-14
excerpt: Developing a multi-account trading journal for traders working with prop firms or multiple brokers.
---

## Understanding the Need

Traders working with prop firms or multiple brokers need a way to track trades across all their accounts in one place. Most trading journals only handle a single account, which creates a lot of manual work for active traders.

## Project Structure

I organized the project with a React/TypeScript structure, using directories like /app, /components, /contexts, and /lib for clear separation of concerns. This made it easy to find and modify specific features.

## Account Management

The first major feature was account management. Traders needed to be able to add multiple accounts, switch between them easily, and see aggregated data across all accounts. I built a system that could handle unlimited accounts while keeping the UI clean and intuitive.

## Trade Input System

I created a trade input system that was fast and accurate. Traders need to enter trades quickly, so I designed forms that minimized clicks and auto-filled common values. The system validates entries to prevent errors that could skew analytics.

## Account Switching

The account switching feature needed to be seamless. I implemented a context system that made it easy to switch between accounts without losing your place or having to reload data.

## Analytics Dashboard

The analytics component was crucial. Traders need to see performance metrics, win rates, and other key statistics. I built a dashboard that could aggregate data across all accounts or show individual account performance.

## Dashboard Components

I created reusable dashboard components that could display different types of trading data. This made it easy to add new analytics features as traders requested them.

## Results

The system provides traders with a comprehensive view of their trading activity across all accounts, making it much easier to track performance and identify areas for improvement.

