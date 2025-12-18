# 🚀 LEB-EX – Business Management Platform

LEB-EX is a multi-tenant business management platform built to help businesses manage **staff, products, orders, and operational costs** from a modern dashboard.  
The system follows **real-world architecture**, separating authentication users from internal business staff.

---

## ✨ Features

### 🔐 Authentication & Roles
- Secure authentication using **NextAuth (App Router)**
- Role-based access:
  - Super Admin
  - Business Admin

### 🏢 Business Dashboard
- Overview of business performance
- Orders, staff, products statistics
- Recent orders list
- **Total monthly staff cost**

### 👥 Staff Management
- Internal staff records (not login users)
- Add, edit, delete staff
- Assign roles (Cashier, Delivery, Inventory, etc.)
- Set **monthly salary per staff**
- Active / inactive staff
- Email uniqueness per business

### 💰 Cost Tracking
- Automatic aggregation of staff salaries
- Monthly staff cost displayed on dashboard
- Ready for profit & expense analysis

### 📦 Product Management
- Product CRUD per business
- Inventory-ready (stock, active status)
- Order-safe pricing

### 🛒 Orders System
- Orders linked to businesses
- Orders assigned to staff
- Multiple products per order
- Historical pricing via order items

---

## 🧠 Architecture Highlights

- **User ≠ Staff**
  - `User` → authentication only
  - `Staff` → internal business employees
- Multi-tenant safe (business-scoped queries)
- Clean Prisma relations
- No authentication logic inside business entities
- Scalable for POS, delivery, invoices, and payroll

---

## 🛠 Tech Stack

| Layer | Technology |
|-----|------------|
Frontend | Next.js (App Router)
Backend | Next.js Route Handlers
Authentication | NextAuth (v5)
Database | PostgreSQL
ORM | Prisma
Styling | Tailwind CSS
Icons | Lucide React

---

## 📁 Project Structure

