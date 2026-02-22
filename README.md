🚀 Multi-Tenant SaaS Backend (MERN)

Live at Link : https://multi-tenant-backend-09ql.onrender.com

A production-grade multi-tenant backend built with Node.js, Express, and MongoDB, implementing JWT-based authentication, tenant isolation, and Role-Based Access Control (RBAC).

Designed using real SaaS architecture patterns, not tutorial shortcuts.

✨ Highlights

🔐 JWT Authentication

🏢 True Multi-Tenancy (Shared DB + tenant isolation)

🛡️ RBAC with Permission Mapping

🧩 Clean Architecture (Controllers / Services / Models)

🚫 Client cannot spoof organizationId

⚠️ Centralized Error Handling

🧠 Architecture Overview

Multi-Tenancy Strategy

Single MongoDB database

Each document (except Organization) contains organizationId

organizationId is extracted only from JWT

All DB queries are scoped by tenant

Request
 → Auth Middleware (JWT)
 → Tenant Middleware (organizationId)
 → Permission Middleware (RBAC)
 → Controller
 → Service
 → Tenant-Scoped DB Query


This guarantees zero cross-tenant data leakage.

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Auth: JWT, bcrypt

Architecture: Middleware-driven, service-layer business logic

📁 Project Structure
src/
├── config/
├── middlewares/
├── models/
├── controllers/
├── services/
├── routes/
├── utils/
├── constants/
└── validations/


Structured for scalability, testability, and maintainability.

🔐 Authentication & RBAC
Signup Flow

Creates a new organization

First user is assigned ADMIN

JWT contains:

userId

organizationId

role

Roles

ADMIN

MANAGER

MEMBER

RBAC

Permission-based (not role checks in controllers)

Centralized permission mapping

Enforced via middleware

🧪 Testing Summary

Manually tested using Postman with focus on:

✅ Authentication & JWT validation

✅ Tenant isolation (Org A ≠ Org B)

✅ Cross-tenant access prevention

✅ RBAC permission enforcement

✅ JWT tampering & orgId injection attacks

✅ Centralized error handling

12/14 defined test cases executed, covering all critical security and isolation paths.

▶️ Run Locally
npm install
npm run dev


Create .env:

PORT=5000
MONGO_URI=mongodb://localhost:27017/saas-db
JWT_SECRET=your_secret_key

📌 API Snapshot

Auth

POST /api/auth/signup

Projects

POST /api/projects

GET /api/projects

DELETE /api/projects/:id

Tasks

POST /api/tasks

GET /api/tasks/project/:projectId

PATCH /api/tasks/:id/status

All protected routes require:

Authorization: Bearer <JWT>

🎯 What This Project Demonstrates

Real-world SaaS backend design

Secure multi-tenant data isolation

Clean separation of concerns

Production-ready RBAC implementation

Strong backend engineering fundamentals

🔮 Future Enhancements

User invitation flow

Request validation (Zod/Joi)

Automated tests (Jest)

Rate limiting

Dockerized deployment
