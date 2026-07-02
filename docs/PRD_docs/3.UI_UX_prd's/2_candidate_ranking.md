# Candidate Ranking — UI/UX Product Requirement Document

## Page Purpose

The Candidate Ranking page is the primary feature of SharanAI.

It enables recruiters to submit a Job Description (JD), trigger the AI ranking engine, and receive an ordered list of the most relevant candidates based on semantic similarity, feature engineering, and ranking scores.

This page should feel fast, intelligent, and trustworthy.

---

# Primary Objective

Allow recruiters to rank candidates within seconds while providing enough transparency to understand why candidates appear in the order shown.

---

# Layout

Desktop Layout

```
----------------------------------------------------

Page Header

----------------------------------------------------

Job Description Input

----------------------------------------------------

Rank Candidates Button

----------------------------------------------------

Ranking Summary

----------------------------------------------------

Ranking Results Table

----------------------------------------------------

Pagination

----------------------------------------------------
```

---

# Page Header

Display

Title

Candidate Ranking

Subtitle

Upload or paste a Job Description to rank candidates using SharanAI.

---

# Job Description Input

A large multi-line text editor.

Placeholder

Paste the complete Job Description here...

Minimum Height

300px

Features

* Character Counter
* Scrollable Input
* Clear Button
* Paste Friendly
* Keyboard Shortcuts

Future Support

* Upload PDF
* Upload DOCX
* Save Templates

---

# Rank Candidates Button

Primary CTA.

Label

Rank Candidates

Behaviour

When clicked

POST

/rank-candidates

Disable button while request is running.

Show loading state.

---

# Loading Behaviour

Replace button text with

Ranking Candidates...

Display loading animation.

Prevent duplicate submissions.

---

# Ranking Summary

After ranking completes display

Candidates Evaluated

Average Score

Highest Score

Ranking Time

Future

Ranking Confidence

---

# Ranking Results Table

Columns

Candidate

Headline

Experience

Semantic Score

Final Score

Actions

Sorting

Final Score descending by default.

Future

Allow sorting on every column.

---

# Candidate Card

Each row should contain

Candidate Name

Headline

Experience

Skill Count

Final Score

Profile Completeness

Status Badge

Actions

---

# Score Visualization

Use a horizontal progress indicator.

Ranges

90-100

Excellent

75-89

Strong Match

60-74

Potential Match

Below 60

Needs Review

Avoid red unless score is critically low.

---

# Row Actions

Each row contains

View Candidate

View Report

Future

Shortlist

Compare

Download

---

# Search

Allow searching ranked candidates.

Filters should work instantly.

---

# Filters

Future-ready

Experience

Country

Minimum Score

Skills

Languages

Availability

---

# Empty State

Before ranking

Display

Paste a Job Description to begin ranking candidates.

Include a subtle illustration placeholder.

---

# No Results State

Display

No candidates matched this Job Description.

Provide

Try Another Job Description

---

# Error State

Display

Ranking failed.

Retry

Show technical details only in developer mode.

---

# API Integration

POST

/rank-candidates

Response

Populate

Summary

Ranking Table

Scores

Candidate IDs

---

# Navigation

Click

View Candidate

↓

GET

/candidate/{candidate_id}

Click

View Report

↓

GET

/report/{candidate_id}

---

# Motion

Table rows animate into view.

Cards fade in.

Progress bars animate.

Loading skeleton while waiting for API.

Avoid unnecessary animations.

---

# Accessibility

Keyboard navigation.

Sortable headers accessible.

Proper focus states.

Readable contrast.

---

# Responsive Behaviour

Desktop

Full table.

Tablet

Condensed table.

Mobile

Cards instead of table rows.

---

# Acceptance Criteria

The page must

Accept large Job Descriptions.

Call the backend successfully.

Display ranked candidates.

Navigate to Candidate Profile.

Navigate to Candidate Report.

Handle loading, empty, and error states gracefully.

Maintain Aurora AI design consistency.