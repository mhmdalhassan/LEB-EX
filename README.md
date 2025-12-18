# LEB-EX  
### Full-Stack Marketplace & Business Management Platform

LEB-EX is a modern full-stack web platform designed to help local businesses manage their operations efficiently through a centralized system.  
It provides role-based dashboards, staff management, subscription handling, and a scalable architecture built with modern web technologies.

---

## 📌 Project Overview

- **Project Name:** LEB-EX  
- **Type:** Final Full-Stack Web Development Project  
- **Developer:** Mohammad Al Hassan  
- **Role:** Full-Stack Web Developer  

LEB-EX focuses on solving real-world business problems by offering a unified solution for managing businesses, staff, and system access through a secure and scalable architecture.

---

## 🎯 Problem Statement

Many local businesses struggle with:
- Lack of centralized management systems  
- Inefficient staff and order management  
- No clear dashboards or analytics  
- Traditional and manual workflows  

These challenges reduce efficiency and make scaling difficult.

---

## 💡 Solution

LEB-EX provides:
- A centralized business management platform  
- Role-based dashboards for different user types  
- Subscription-based access control  
- Secure authentication and authorization  
- Scalable, production-ready architecture  

---

## 👥 User Roles

The system uses **Role-Based Access Control (RBAC)**:

- **Super Admin**
  - Manages all businesses and users
  - Controls subscriptions and platform settings

- **Business Admin**
  - Manages their own business
  - Handles staff, dashboards, and settings

- **Staff**
  - Accesses assigned tasks and operations based on permissions

---

## ⚙️ Core Features

- Authentication & Authorization (NextAuth)
- Role-Based Access Control (RBAC)
- Business Dashboard & Analytics
- Staff Management
- Subscription Management
- Secure RESTful API routes
- Clean and modular architecture

---

## 🧱 System Architecture

- **Framework:** Next.js 16 (App Router)
- **API Layer:** Next.js API Routes
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** NextAuth
- **Styling:** Tailwind CSS

Architecture principles:
- Separation of concerns  
- Server & Client Components  
- Scalable and maintainable structure  

---

## 🛠 Technology Stack

- Next.js 16  
- Prisma ORM  
- PostgreSQL  
- NextAuth  
- Tailwind CSS  
- TypeScript / JavaScript  

---

## 🚧 Challenges & Solutions

| Challenge | Solution |
|---------|----------|
| Prisma relation issues | Careful schema design |
| Authorization complexity | Middleware-based RBAC |
| App Router behavior | Clear server/client separation |
| Schema consistency | Iterative testing with Prisma Studio |

---

## 🧪 Demo Flow

The demo includes:
1. User authentication (Login)
2. Business dashboard overview
3. Staff management
4. Business settings and permissions

---

## 🚀 Future Improvements

- Online payments integration (Stripe / PayPal)
- Real-time notifications system
- Mobile application (React Native)
- Performance optimization and caching

---

## 📈 Project Value

- Solves real-world business problems
- Built with modern, industry-relevant technologies
- Scalable and production-ready
- Demonstrates strong full-stack development skills

---

## 📂 Installation

```bash
git clone https://github.com/your-username/leb-ex.git
cd leb-ex
npm install
