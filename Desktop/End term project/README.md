
# ServEase: Home Services Platform

## Overview

ServEase is a modern, full-stack web application that connects users with trusted home service providers. It features real-time booking, provider analytics, reviews, and a polished, demo-ready UI. The platform is designed for seamless user and provider experiences, robust authentication, and easy extensibility.

---

## Problem Statement

Finding reliable home services is often difficult due to lack of trust, transparency, and real-time communication. ServEase solves this by offering:
- Verified provider listings
- Transparent booking and review systems
- Real-time status tracking for users and providers

---

## Features

### User Features
- **Browse & Filter Services:** Search by category, provider, or keyword.
- **Book Services:** Select date, time slot, and describe your problem.
- **Booking Dashboard:** Track all bookings, reschedule, cancel, or delete.
- **Provider Reviews:** Rate providers after completed jobs.
- **Authentication:** Secure signup/login with role-based access.

### Provider Features
- **Provider Dashboard:** View analytics (earnings, jobs, reviews).
- **Manage Bookings:** Accept, reject, mark in-progress/completed, delete cancelled.
- **Profile Management:** Set experience, field, and hourly rate.
- **See Reviews:** View latest customer feedback.

### Admin Features
- **Provider Management:** Edit provider info, manage onboarding.
- **Analytics:** View all bookings and providers.

### General
- **Modern UI/UX:** Responsive, mobile-friendly, and visually appealing.
- **Demo/Test Ready:** Always-visible demo providers and services.
- **Mock & Real Backend:** Works with Firebase (Firestore/Auth) or localStorage mock mode.

---

# ServEase: Home Services Platform

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage Guide](#usage-guide)
- [Core Flows](#core-flows)
- [Screenshots](#screenshots)
- [FAQ](#faq)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)
- [Authors & Credits](#authors--credits)

---

## Introduction

ServEase is a modern, full-stack web application that connects users with trusted home service providers. It features real-time booking, provider analytics, reviews, and a polished, demo-ready UI. The platform is designed for seamless user and provider experiences, robust authentication, and easy extensibility. It is ideal for academic demos, hackathons, or as a foundation for a real-world SaaS product.

---

## Features

### User Features
- **Browse & Filter Services:** Search by category, provider, or keyword.
- **Book Services:** Select date, time slot, and describe your problem.
- **Booking Dashboard:** Track all bookings, reschedule, cancel, or delete.
- **Provider Reviews:** Rate providers after completed jobs.
- **Authentication:** Secure signup/login with role-based access.

### Provider Features
- **Provider Dashboard:** View analytics (earnings, jobs, reviews).
- **Manage Bookings:** Accept, reject, mark in-progress/completed, delete cancelled.
- **Profile Management:** Set experience, field, and hourly rate.
- **See Reviews:** View latest customer feedback.

### Admin Features
- **Provider Management:** Edit provider info, manage onboarding.
- **Analytics:** View all bookings and providers.

### General
- **Modern UI/UX:** Responsive, mobile-friendly, and visually appealing.
- **Demo/Test Ready:** Always-visible demo providers and services.
- **Mock & Real Backend:** Works with Firebase (Firestore/Auth) or localStorage mock mode.

---

## Architecture

### High-Level Overview
- **Frontend:** React (SPA) with Context API for state management.
- **Backend:** Firebase Firestore/Auth (or localStorage mock for demo/testing).
- **Componentization:** Modular, reusable components for all UI elements.
- **Routing:** React Router DOM for multi-page navigation.
- **State Management:** Context + custom hooks for bookings, auth, and providers.

### Data Flow
1. **User Authentication:** Context API manages login state, roles, and user info.
2. **Booking Flow:** Bookings are created via forms, stored in Firestore or localStorage, and reflected in dashboards.
3. **Provider Management:** Providers can update their profile, manage bookings, and view analytics.
4. **Review System:** Users submit reviews after completed bookings; providers see reviews in their dashboard.

---

## Tech Stack

- **Frontend:** React 18/19, Vite, Tailwind CSS v4, Framer Motion, Lucide React
- **Routing:** React Router DOM v6
- **State Management:** React Context, Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- **Backend:** Firebase (Firestore/Auth) or localStorage mock API
- **Other:** Toast notifications, modular component structure

---

## Project Structure

```
src/
  components/      # UI components (BookingCard, ReviewModal, etc.)
  context/         # Auth and Booking context providers
  hooks/           # Custom hooks (useAuth, useBookings, useProviders)
  pages/           # Main pages (Home, Bookings, Dashboard, etc.)
  services/        # API logic (authService, bookingService, reviewService)
  utils/           # Helpers (formatting, etc.)
public/
  assets/          # Images, icons, etc.
```

---

## Setup & Installation

### Quick Start (Mock Mode)
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:5174](http://localhost:5174)

### Firebase Integration (Optional)
1. Create a Firebase project (Firestore + Auth)
2. Add your config to `.env`
3. The app will auto-detect Firebase config and use Firestore/Auth

---

## Usage Guide

### User
1. Sign up or log in as a user.
2. Browse or search for services.
3. Book a service by selecting a provider, date, and time slot.
4. Track your bookings in the dashboard.
5. After completion, rate your provider.

### Provider
1. Sign up as a provider and complete your profile.
2. View and manage incoming bookings.
3. Update booking status (accept, in-progress, completed, etc.).
4. View analytics and customer reviews.

### Admin
1. Log in as admin.
2. Manage providers and view all bookings.

---

## Core Flows

### Booking Flow
1. User selects a service and provider.
2. User picks a date and time slot.
3. Booking is created and appears in both user and provider dashboards.
4. Provider updates status as work progresses.
5. User can reschedule, cancel, or delete bookings.

### Review Flow
1. After a booking is marked completed, user can submit a review.
2. Review is saved and shown to the provider.

### Provider Onboarding
1. Provider signs up and fills in experience, field, and hourly rate.
2. Admin can edit provider info if needed.

---


## FAQ

**Q: Can I use this project for my own startup?**
A: Yes! The code is modular and easy to extend for real-world use.

**Q: Does it support real payments?**
A: No, all payments are simulated for demo purposes.

**Q: Can I add more service categories or providers?**
A: Yes, just update the mock data or Firestore collections.

**Q: Is it mobile-friendly?**
A: Yes, the UI is fully responsive.

**Q: How do I switch between mock and Firebase mode?**
A: The app auto-detects Firebase config. If not present, it uses localStorage mock mode.

---

## Known Limitations

- No real payment gateway (all payments are simulated)
- No push/email notifications (providers see reviews in dashboard only)
- Accessibility and offline support are basic
- No advanced analytics or export for admin

---

## Contributing

Pull requests and suggestions are welcome! Please open an issue or PR for any improvements or bug fixes.

---





