# Dashboard — UI/UX Product Requirement Document

## Page Purpose

The Dashboard is the landing page of SharanAI.

Its purpose is to provide recruiters with an immediate overview of hiring activity, candidate quality, AI-generated insights, and quick access to core workflows.

The Dashboard should feel like an AI-powered command center rather than a traditional admin panel.

---

# Design Principles

The interface should prioritize clarity, speed, and decision-making.

Avoid unnecessary visual clutter.

Use generous spacing, clean typography, and consistent card layouts.

No emojis should appear anywhere in the interface.

---

# Layout

Desktop Layout

```
---------------------------------------------------------
Sidebar

---------------------------------------------------------

Top Navigation

---------------------------------------------------------

Hero Section

---------------------------------------------------------

Statistics Cards

---------------------------------------------------------

AI Insights

Recent Rankings

---------------------------------------------------------

Analytics Preview

---------------------------------------------------------

Top Skills

Candidate Distribution

---------------------------------------------------------

Quick Actions

---------------------------------------------------------
```

---

# Sidebar

Items

Dashboard

Candidate Ranking

Candidates

Reports

Analytics

Settings

Account

The active item should display a subtle Aurora AI gradient indicator.

---

# Top Navigation

Components

* Search Bar
* Theme Toggle (Light / Dark / System)
* Notifications
* User Profile Menu

Sticky positioning.

Height: 72px.

---

# Hero Section

Displays

Welcome back,

Recruiter Name

Tagline

Smarter Hiring, Better Decisions

Below this, display a short AI-generated summary.

Example

"Your candidate database contains 50 candidates. The average experience is 7 years. Backend Engineering remains the strongest talent category."

This section should be powered by analytics in future versions.

---

# Statistics Cards

Display four primary metrics.

Total Candidates

Average Experience

Average Profile Score

Average Languages

Each card should include:

* Icon
* Metric Value
* Short Description
* Small trend indicator (future-ready)

Cards should have hover elevation and smooth transitions.

---

# AI Insights Panel

Purpose

Surface intelligent observations derived from available analytics.

Example insights

* Python is the most common skill.
* Most candidates have 5–8 years of experience.
* Profile completeness averages 55.86%.
* Majority of candidates are located in India.

Initially, these insights may be rule-based.

The design should allow future AI-generated summaries.

---

# Recent Ranking Sessions

Display the latest candidate ranking operations.

Columns

Job Title

Candidates Ranked

Top Score

Time

Clicking an entry opens the ranking page.

If no ranking history exists, display an informative empty state.

---

# Analytics Preview

Display two charts.

Top Skills

Candidate Distribution by Country

Charts should use Recharts.

Cards should include a "View Analytics" button.

---

# Quick Actions

Buttons

Rank New Job Description

Browse Candidates

View Reports

Open Analytics

Primary action should emphasize Candidate Ranking.

---

# Search

Global search available from the navigation bar.

Future support

* Candidate search
* Job search
* Report search

---

# Loading State

Display skeleton cards while data loads.

Avoid spinners where possible.

---

# Empty State

If analytics are unavailable:

Display a clean illustration placeholder.

Show

"No analytics available yet."

Provide a button:

"Refresh Dashboard"

---

# Error State

If backend connection fails:

Display a non-intrusive error card.

Message

"Unable to retrieve dashboard data."

Button

Retry

---

# Responsive Behaviour

Desktop

Four statistic cards in a row.

Tablet

Two cards per row.

Mobile

Single-column layout.

Sidebar collapses into a navigation drawer.

---

# API Integration

Dashboard calls:

GET /analytics

The response populates:

* Statistics Cards
* AI Insights
* Charts

Future endpoints can extend this page without redesign.

---

# Motion Design

Cards fade in sequentially.

Charts animate on first render.

Buttons have subtle hover elevation.

Page transitions use smooth opacity and translate animations.

Avoid excessive motion.

---

# Accessibility

Keyboard navigation.

Visible focus states.

ARIA labels for charts.

Proper semantic headings.

Responsive typography.

---

# Acceptance Criteria

The dashboard should:

* Load within two seconds on local data.
* Display analytics correctly.
* Support light, dark, and system themes.
* Maintain visual consistency with the Aurora AI design language.
* Provide a clean and distraction-free recruiter experience.