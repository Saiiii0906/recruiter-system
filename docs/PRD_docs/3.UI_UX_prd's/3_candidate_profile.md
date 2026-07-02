# Candidate Profile — UI/UX Product Requirement Document

## Page Purpose

The Candidate Profile page provides a complete, recruiter-friendly view of an individual candidate.

It consolidates all relevant information into a structured layout so recruiters can evaluate candidates quickly without reading raw resume data.

The page should emphasize clarity, professionalism, and efficient decision-making.

---

# Layout

Desktop Layout

```text
-----------------------------------------------------

Candidate Header

-----------------------------------------------------

Overview Cards

-----------------------------------------------------

Professional Summary

-----------------------------------------------------

Skills

Experience Timeline

-----------------------------------------------------

Education

Languages

Certifications

-----------------------------------------------------

Profile Insights

-----------------------------------------------------

Quick Actions

-----------------------------------------------------
```

---

# Candidate Header

Display

* Candidate Name
* Professional Headline
* Current Company
* Current Role
* Country
* Years of Experience

Actions

* View Report
* Back to Ranking
* Copy Candidate ID

---

# Overview Cards

Display:

* Years of Experience
* Profile Completeness
* Number of Skills
* Number of Certifications

Each card should include:

* Title
* Value
* Supporting description

---

# Professional Summary

Display the candidate's headline and summary.

If no summary is available:

Show

"No professional summary available."

---

# Skills Section

Display skills as badges.

Group by proficiency if available.

Allow future filtering by:

* Programming Languages
* Frameworks
* Cloud
* Databases
* Tools

---

# Experience Timeline

Display career history in reverse chronological order.

Each experience entry includes:

* Company
* Job Title
* Employment Period
* Description (if available)

Use a clean vertical timeline.

---

# Education

Display:

* Degree
* Institution
* Graduation Year (if available)

---

# Languages

Display language badges.

Example:

English

Hindi

Kannada

---

# Certifications

Display certification cards.

Each card contains:

* Certification Name
* Issuing Organization
* Year (if available)

If no certifications exist:

"No certifications available."

---

# Profile Insights

Generate quick recruiter insights based on profile data.

Examples:

* Strong backend engineering experience.
* High profile completeness.
* Diverse technical skill set.
* Multilingual candidate.

Initially these may be rule-based.

Future versions may use LLM-generated summaries.

---

# Quick Actions

Buttons

* View AI Report
* Back to Ranking
* Copy Candidate ID

Future

* Shortlist Candidate
* Compare Candidate
* Export Candidate

---

# Loading State

Display skeleton placeholders for:

* Header
* Cards
* Timeline
* Skills
* Education

---

# Empty State

If candidate information is unavailable:

Display:

"Candidate information could not be loaded."

Provide:

Return to Candidate Ranking

---

# Error State

If backend request fails:

Display a clean error message with:

Retry

---

# API Integration

GET

/candidate/{candidate_id}

Populate:

* Header
* Skills
* Experience
* Education
* Languages
* Certifications
* Profile Insights

---

# Motion

Cards fade in.

Timeline animates sequentially.

Skill badges animate subtly.

Avoid excessive animation.

---

# Accessibility

Keyboard navigation.

Semantic headings.

Readable contrast.

Responsive typography.

---

# Responsive Behaviour

Desktop

Two-column layout.

Tablet

Stack sections vertically.

Mobile

Single-column cards.

---

# Acceptance Criteria

The page should:

* Display all available candidate information.
* Present data in a recruiter-friendly format.
* Support responsive layouts.
* Match the Aurora AI design language.
* Load smoothly with skeleton placeholders.
* Navigate seamlessly from Ranking and Reports.