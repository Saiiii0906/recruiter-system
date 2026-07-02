# Reports — UI/UX Product Requirement Document

## Purpose

The Reports page presents AI-generated recruiter reports in a structured, readable format.

Reports summarize candidate information and help recruiters make informed hiring decisions without reviewing raw profile data.

---

# Layout

Page Header

↓

Candidate Selector

↓

Report Viewer

↓

Recommendation Panel

↓

Actions

---

# Header

Title

AI Recruiter Report

Subtitle

AI-generated candidate evaluation summary.

---

# Candidate Selector

Searchable dropdown.

Displays:

* Candidate Name
* Candidate ID

Future support:

* Recent Reports
* Favorites

---

# Report Viewer

Displays:

* Candidate Overview
* Experience Summary
* Skills Summary
* Education Summary
* Languages
* AI Summary
* Recruiter Recommendation

Use typography optimized for reading.

---

# Recommendation Panel

Displays:

* Strong Match
* Potential Match
* Needs Review

Future:

Confidence score.

---

# Actions

Buttons:

* Copy Report
* Download PDF
* Export
* Back to Candidate

---

# API

GET /report/{candidate_id}

---

# States

Loading

Empty

Error

Success

---

# Responsive

Desktop:

Two-column layout.

Mobile:

Single-column.

---

# Acceptance Criteria

Reports should be readable, printable, responsive, and consistent with the Aurora AI design language.