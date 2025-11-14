---
title: Building Astrid Chat - A Lightweight Messaging System
date: 2024-08-19
excerpt: Creating a lightweight chat and messaging system with custom global state management.
---

## Starting Simple

I wanted to build a chat system that was lightweight and fast, without the bloat of larger messaging platforms. The goal was to create something that could be easily integrated into other projects or used standalone.

## Technology Stack

I chose Next.js + TypeScript for the frontend, which gave me a solid foundation and type safety. The challenge was managing chat state efficiently without using heavy state management libraries.

## Global State Management

I implemented custom global state via the Context API. This was lighter than Redux or other state management solutions, and it gave me full control over how the state was structured and updated.

## Service Layer

I created a /services directory for handling login, email authentication, message operations, and profile updates. This separation of concerns made the codebase clean and easy to maintain.

## Modular Components

I built modular components for chat lists, message bubbles, inputs, and modals. Each component was designed to be reusable and easy to customize. The message bubbles needed to handle different message types and states (sent, delivered, read).

## TypeScript Build Errors

One of the challenges was resolving TypeScript build errors, especially around the real-time message updates and state management. I spent time ensuring type safety throughout the application, which caught several bugs early.

## Deployment

After resolving all the build errors and thoroughly testing the messaging functionality, I deployed the system. The lightweight architecture meant fast load times and smooth performance even with multiple active conversations.

## Lessons Learned

This project taught me a lot about building real-time features efficiently and managing complex state without over-engineering the solution.

