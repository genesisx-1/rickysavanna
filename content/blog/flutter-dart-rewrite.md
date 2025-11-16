---
title: Rewriting LangAI with Flutter and Dart
date: 2024-11-15
excerpt: Taking my AI language translation app to the next level with Flutter and Dart, achieving a working beta version with improved performance and architecture.
---

## The Decision to Rewrite

After building LangAI with React Native, I realized there were fundamental architectural decisions I wanted to revisit. The mobile development landscape has evolved, and I wanted to explore what Flutter and Dart could offer for a real-time AI translation application. The rewrite wasn't just about changing frameworks—it was about building something more performant, more maintainable, and better aligned with modern mobile development practices.

## Why Flutter and Dart

Flutter's architecture appealed to me for several reasons. The widget-based system provides a more declarative approach to UI construction, and Dart's strong typing and ahead-of-time compilation promised better performance characteristics. For an app that needs to handle real-time AI API calls while maintaining smooth UI interactions, these performance benefits were crucial.

The hot reload feature in Flutter development is genuinely impressive. Being able to see changes instantly without losing application state accelerated my development cycle significantly. This was particularly valuable when iterating on the translation UI and testing different language pair combinations.

## Architecture Improvements

One of the key improvements in this rewrite was implementing a more robust state management pattern. I structured the app using a combination of Provider and Riverpod for dependency injection and state management. This separation of concerns made the codebase more testable and easier to reason about.

The translation service layer was completely redesigned. Instead of making direct API calls from components, I created a dedicated service class that handles API communication, error handling, and response parsing. This abstraction makes it much easier to swap out AI providers or add features like caching and offline support in the future.

## Handling Async Operations

Dart's async/await syntax is clean and intuitive, but managing multiple concurrent translation requests required careful consideration. I implemented a request queue system to prevent overwhelming the API with simultaneous calls, and added proper error handling for network failures and API rate limits.

The beta version includes retry logic with exponential backoff, which handles transient network issues gracefully. Users don't see cryptic error messages—the app intelligently retries failed requests and provides clear feedback about what's happening.

## UI/UX Enhancements

Flutter's Material Design components gave me access to a more polished set of UI elements out of the box. I leveraged custom animations and transitions to make the translation flow feel more responsive. The text input and output areas now have smooth transitions, and loading states are clearly communicated through animated indicators.

I also improved the language selection interface. Instead of a simple dropdown, I created a searchable list with flags and language codes, making it easier for users to find their target language quickly. This might seem like a small detail, but it significantly improves the user experience.

## Performance Optimizations

One of the most satisfying aspects of this rewrite was seeing the performance improvements. Flutter's rendering engine, Skia, provides smooth 60fps animations even on mid-range devices. The app feels more responsive, especially when switching between different translation modes or scrolling through translation history.

I implemented lazy loading for the translation history, so users with hundreds of saved translations don't experience any lag when opening the history screen. The app only loads what's visible, then fetches more as the user scrolls.

## Beta Testing Insights

Getting the beta version working was a milestone, but it also revealed areas that need refinement. Real-world usage exposed edge cases I hadn't considered—like handling very long input text, managing translations for languages with different text directions, and gracefully handling API response variations.

The beta testing phase has been invaluable. It's one thing to build something that works in development, but seeing how it performs with actual users provides insights that no amount of solo testing can match.

## Technical Challenges

Working with Flutter and Dart presented some interesting challenges. The package ecosystem is different from npm, and I had to learn the conventions for Flutter package management. Some packages I was used to in React Native don't have direct Flutter equivalents, which required finding alternative solutions or building custom implementations.

The state management patterns were also different from what I was familiar with. React's Context API and hooks have different mental models compared to Flutter's Provider and Riverpod. It took some time to internalize these patterns, but once I did, the code became more organized and easier to maintain.

## What's Next

The beta version is functional, but there's still work to be done. I'm planning to add features like offline translation caching, voice input support, and batch translation capabilities. The architecture I've built makes adding these features straightforward—the foundation is solid.

I'm also considering open-sourcing parts of the translation service layer. The abstraction I created could be useful for other developers building similar AI-powered applications, and contributing back to the community feels like the right next step.

## Reflection

This rewrite taught me that sometimes the best way to improve a project is to start fresh with the lessons you've learned. The React Native version was valuable, but the Flutter rewrite represents a more mature understanding of mobile development, state management, and API integration.

The process of rebuilding something from scratch with new tools is incredibly educational. You notice patterns you missed the first time, and you make architectural decisions with the benefit of hindsight. It's not just about the technology—it's about applying everything you've learned to build something better.

