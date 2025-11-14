---
title: Building Account Management Features
date: 2024-07-30
excerpt: Implementing account switching and management in my trading journal.
---

## Feature Focus

I've been working on the account management features. This is more complex than I initially thought. Users need to be able to create accounts, switch between them, and see trades specific to each account.

## What I've Implemented

I built:
- Account creation and deletion
- Account switching functionality
- Context API to manage account state globally
- UI to display current account and switch between them

The Context API was a new concept for me, but it's perfect for this use case. I can access the current account from any component without prop drilling.

## Technical Challenges

The hardest part was making sure trades are properly associated with accounts. I had to restructure my data model to include account IDs with each trade. It required refactoring existing code, which was good practice.

## UI Improvements

I've been working on making the interface cleaner. It's still basic, but it's functional. I'm focusing on functionality first, then I'll make it look better.

## What's Next

I need to build the analytics features - calculating win rates, profit/loss, and other metrics. That's going to require some math and data aggregation, which will be a new challenge.

## Reflection

This project is teaching me so much. Every feature requires learning something new. It's frustrating sometimes, but also incredibly rewarding when things work.

