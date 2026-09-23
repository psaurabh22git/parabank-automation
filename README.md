@'
# ParaBank Test Automation Framework

An end-to-end automated testing suite built with [Playwright](https://playwright.dev/) and TypeScript to validate core functional scenarios and REST API services for the [ParaBank Demo Application](https://parabank.parasoft.com/).

---

## 📌 Project Overview

This framework provides stabilized, reliable UI and API test coverage designed to handle dynamic data formatting, complex page behaviors, and flaky session states.

### Key Highlights
* **UI Test Stabilization**: Uses robust attribute-based locators and explicit field blur triggers to ensure reliable form submission.
* **Resilient Data Aggregation**: Avoids registration flakiness by leveraging pre-seeded account credentials (`john`/`demo`) for accurate transaction aggregation and floating-point summation.
* **REST API Testing**: Interacts directly with ParaBank REST endpoints using explicit JSON content negotiation headers (`Accept: application/json`).

---

## 🛠️ Tech Stack & Prerequisites

* **Language**: TypeScript / Node.js
* **Automation Tool**: Playwright (`@playwright/test`)
* **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/parabank-automation.git](https://github.com/YOUR_USERNAME/parabank-automation.git)
cd parabank-automation