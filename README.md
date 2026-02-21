
---

<p align="center">
  <img src="./img.png" alt="AgroBridge Banner" width="100%">
</p>

# AgroBridge 🎯

---

## Basic Details

### Team Name: Lavender 💜

### Team Members

* Member 1: **Anakha Shaju** – College of Engineering Kallooppara
* Member 2: **Anagha S** – College of Engineering Kallooppara

### Hosted Project Link

Currently running locally:
https://agrobridge-4lb6me434-anaghaskumar-hubs-projects.vercel.app/

---

## Project Description

AgroBridge is a digital marketplace that connects farmers directly with importers.
Farmers can list crops, manage orders, track deliveries, and view revenue dashboards, while importers can browse crops, add items to cart, place secure orders, track delivery status, and rate products.

---

## The Problem Statement

Farmers often struggle with:

* Limited market access
* Middlemen reducing profit margins
* Lack of transparent order tracking
* No structured digital revenue tracking system

Importers face:

* Difficulty finding verified farmers
* No structured tracking or order history system

---

## The Solution

AgroBridge creates a direct farmer-to-importer marketplace platform that:

* Eliminates middlemen
* Enables transparent order tracking
* Provides real-time stock management
* Includes a cart + checkout system
* Gives farmers revenue dashboards
* Allows importers to track and rate deliveries

This builds a more transparent and profitable agricultural ecosystem.

---

# Technical Details

## Technologies/Components Used

### For Software:

* **Languages Used:**

  * HTML
  * CSS
  * JavaScript
  * Node.js

* **Frameworks Used:**

  * Express.js

* **Libraries Used:**

  * Built-in Fetch API

* **Tools Used:**

  * VS Code
  * Git & GitHub
  * Node Package Manager (npm)

### For Hardware:

Not applicable (Software-only web project)

---

# Features

* 🧑‍🌾 Farmer Dashboard with crop management
* 🛒 Importer Cart System (Max 10 items)
* 📦 Live Order Tracking (Preparing → Shipped → Delivered)
* 💰 Revenue Dashboard (Farmer-specific)
* ⭐ 1–5 Star Rating System
* 📊 Automatic GST & Delivery Fee Calculation
* 🔐 Role-based UI (Farmer & Importer Separation)
* 📦 Stock auto-updates after purchase

---

# Implementation

## For Software:

### Installation

```bash
npm install
```

### Run

```bash
node server.js
```

Then open in browser:

```
http://localhost:3000
```

---

# Project Documentation

## Screenshots

```
<img width="1917" height="1013" alt="Farmer login" src="https://github.com/user-attachments/assets/8dcc48ae-a671-4f85-adf4-c392a409c8f8" />
<img width="1913" height="1025" alt="Importer login" src="https://github.com/user-attachments/assets/7905cec7-b4f8-45f5-8eb2-219b43a087af" />
Login interface for farmers and importers

<img width="1917" height="1018" alt="Farmdash" src="https://github.com/user-attachments/assets/b68d2b36-f95b-4c1b-9d8d-dabe7e0c37fc" />
<img width="1915" height="1010" alt="farmrev" src="https://github.com/user-attachments/assets/257f2819-9414-4c90-906c-74542c78f503" />
Farmer managing crops and viewing revenue

<img width="1919" height="1026" alt="Imp add" src="https://github.com/user-attachments/assets/1279eccf-18df-497f-b6c0-4356f1f1f9d2" />
<img width="1916" height="1027" alt="imp cart" src="https://github.com/user-attachments/assets/eae0912a-679d-4a18-99f5-72384d0bf1e7" />
Importer adding products to cart and placing orders
```

---

## System Architecture

Backend: Node.js + Express
Frontend: HTML + CSS + JavaScript
Data Storage: In-memory arrays (crops & orders)

Flow:
User → Frontend → Express API → Data Processing → Response → UI Update

---

## Application Workflow

1. User selects role (Farmer / Importer)
2. Farmer:

   * Adds crops
   * Updates tracking
   * Views revenue
3. Importer:

   * Browses crops
   * Adds to cart
   * Enters delivery details
   * Checks out
   * Tracks delivery
   * Rates product

---

# Additional Documentation

## API Documentation

### Base URL

```
http://localhost:3000
```

---

### POST /add-crop

**Description:** Adds a new crop (Farmer only)

**Request Body**

```json
{
  "farmer": "Anakha",
  "name": "Rice",
  "weight": 100,
  "price": 50
}
```

---

### GET /crops

**Description:** Returns all available crops

---

### POST /checkout

**Description:** Places order from cart

---

### GET /orders

**Description:** Returns all orders

---

### POST /update-status/:index

**Description:** Updates delivery tracking

---

### POST /rate/:index

**Description:** Rates delivered order

---

### GET /revenue/:farmer

**Description:** Returns farmer-specific revenue

---

# Project Demo

### Video

(Add Google Drive / YouTube link here)

This demo shows:

* Farmer adding crops
* Importer placing order
* Live tracking updates
* Revenue dashboard calculation
* Rating system

---

# AI Tools Used (For Transparency)

**Tool Used:** ChatGPT

**Purpose:**

* Backend logic structuring
* Debugging
* UI optimization suggestions
* Code improvements
* Documentation formatting

**Approximate AI Assistance:** ~30–40%
(Core logic, integration, and architecture implemented manually)

**Human Contributions:**

* Full system design
* Business logic
* UI/UX decisions
* Debugging & testing
* API structure design

---

# Team Contributions

* **Anakha Shaju:** Backend development, cart logic, revenue system, API integration
* **Anagha S:** Frontend UI design, workflow structuring, testing & documentation

---

# License

This project is licensed under the MIT License.

---
