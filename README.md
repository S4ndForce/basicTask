# Todo + Projects App

A full-stack Todo application built with **Spring Boot** (backend) and **React** (frontend).

The backend was the primary focus of this project and was used to practice clean service-layer design, DTO separation, filtering with JPA Specifications, and pagination with Pageable.  
The frontend consumes the API and provides a working UI for interacting with todos and projects.

---

## Features

### Backend
- CRUD operations for todos
- Project -> Todo relationships
- Filtering by priority, category, and search term
- Pagination and sorting using Pageable
- Custom priority ordering (business order, not alphabetical)

### Frontend
- React UI for managing todos
- Tailwind CSS for clean UI design
- Create, update, delete, and toggle todos
- Delete completed todos
- Filter and search todos
- Sort todos by priority and creation time
- Pagination support (WIP)
- Project management (WIP)

---

## Architecture

### Backend (Spring Boot)
- **Controller**: request handling only
- **Service**: business logic and entity updates
- **Repository**: persistence + specification execution
- **Specifications**: composable filters
- **DTOs**: strict separation between API and entities

Filtering is handled with JPA Specifications.  
Sorting and pagination are handled via Pageable- alternative to custom queries.

### Frontend (React)
- Component-based UI
- Axios for API communication
- State-driven filtering and sorting
- Backend is the source of truth for data

---

## Sorting Notes

Priority sorting uses a numeric order defined in the `Priority` enum to ensure correct business ordering (HIGH -> MEDIUM -> LOW) instead of alphabetical sorting. 


---

## Example API Endpoints

- GET /api/todos
- GET /api/todos?priority=HIGH&page=0&size=10
- POST /api/todos
- PATCH /api/todos/{id}
- DELETE /api/todos/{id}

- GET /api/projects
- GET /api/projects/{id}/todos
