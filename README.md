# Todo + Projects App

A full-stack Todo application built with **Spring Boot** (backend) and **React** (frontend).

The backend was the primary focus of this project, with an emphasis on clean service-layer design, DTO separation, JPA Specifications for filtering, and pagination using Pageable.  
The frontend consumes the API and provides a functional UI for interacting with todos and projects.

---

## Features

### Backend
- CRUD operations for todos
- Optional project association (projects act as filters, not owners)
- Filtering by search term, category, and priority
- Pagination and sorting using Pageable
- Custom priority ordering (business order, not alphabetical)
- Aggregation queries for todo statistics

### Frontend
- React UI for managing todos
- Tailwind CSS for clean UI design
- Create, update, delete, and toggle todos
- Delete completed todos
- Search, sorting, and pagination
- Project-based filtering
- Global and project-specific stats UI

---

## Architecture

### Backend (Spring Boot)
- **Controller**: request handling only
- **Service**: business logic and entity updates
- **Repository**: persistence and specification execution
- **Specifications**: composable filtering logic
- **DTOs**: strict separation between API and entities

Filtering is handled with JPA Specifications.  
Sorting and pagination are handled via Pageable as an alternative to custom queries.

### Frontend (React)
- Component-based UI
- Axios for API communication
- State-driven filtering and sorting
- Backend as the source of truth for data

---

## Sorting Notes

Priority sorting uses a numeric order defined in the `Priority` enum to ensure correct business ordering (HIGH → MEDIUM → LOW), rather than alphabetical sorting.

---

## Project Notes

Projects act as a filter.  
Todos created within a project contain an optional `project_id`, but todos remain first-class entities and can exist independently of projects.
The Global list is always in /api/todos

---

## Example API Endpoints

- GET `/api/todos`
- GET `/api/todos?priority=HIGH&page=0&size=10`
- POST `/api/todos`
- PATCH `/api/todos/{id}`
- DELETE `/api/todos/{id}`
- GET `/api/todos/stats`
- GET `/api/projects`
- POST `/api/projects/{id}/todos`
