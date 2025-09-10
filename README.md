Create a directory `preptrack` then create two more directories inside this `backend` and `frontend`

Run `cd backend`

Run `npm init -y`

Install Typescript `npm install typescript @types/node --save-dev`

To create `tsconfig.json` file run `npx tsc --init`

Edit `tsconfig.json` file as below:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "commonjs",
    "target": "es6",
    "esModuleInterop": true,
    "types": [],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

Edit `script` inside `package.json`

```json
"scripts": {
    "start": "node dist/app.js",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

Build using `npm run build`

Start using `npm start`

# Setting up Track APIs

- Create different directories `model`, `routes`, `controller`, `service`, `repository`, and `config` inside `src`.
- Run `npm install pg typeorm reflect-metadata && npm install -D @types/pg` to install the required packages in order to setup postgres and node.js connection and using typeorm.
- Please make sure your `tsconfig.json` file matches with the one there in the repository.
- Download database by following this link https://www.postgresql.org/download/.

## Overview

This document provides a comprehensive, detailed explanation of the architecture, folder structure, code hierarchy, and call flow for the Track API service in the backend of the PrepTracker project. It is designed to serve as a reference for developers and system designers, and as a template for documenting future backend and frontend services.

---

## 1. Project Structure & Modularity

The backend codebase is organized using a modular, layered architecture. Each folder and file has a specific responsibility, making the codebase scalable, maintainable, and easy to extend.

```
backend/
│
├── src/
│   ├── app.ts                  # Main entry point, Express app setup
│   ├── config/
│   │   └── Database.ts         # Database connection and initialization logic
│   ├── controller/
│   │   └── TrackController.ts  # Handles HTTP requests for Track resource
│   ├── model/
│   │   └── Track.ts            # TypeORM entity for Track table
│   ├── repository/
│   │   └── TrackRepository.ts  # Data access logic for Track
│   ├── routes/
│   │   └── TrackRoutes.ts      # Express router for Track endpoints
│   ├── service/
│   │   └── TrackService.ts     # Business logic for Track
│   └── ...                     # Other modules/services
├── package.json
├── tsconfig.json
└── ...
```

### Modularity Principles

- **Separation of Concerns:** Each layer (model, repository, service, controller, routes, config) is responsible for a distinct part of the application logic.
- **Single Responsibility:** Each file/class does one thing (e.g., `TrackRepository` only handles DB operations for Track).
- **Extensibility:** New features or entities can be added by replicating the structure.

---

## 2. Track API Call Flow & Data Lifecycle

### 2.1. End-to-End Request Flow

1. **Client** sends a request to `/api/v1/tracks` (GET/POST/PUT/DELETE).
2. **Express App (`app.ts`)** receives the request and delegates to the router (`TrackRoutes.ts`).
3. **Router (`TrackRoutes.ts`)** matches the endpoint and calls the appropriate controller function (`createTrack` for POST, etc.).
4. **Controller (`TrackController.ts`)** processes the request, validates input, and calls the service layer.
5. **Service (`TrackService.ts`)** contains business logic and calls the repository for data access.
6. **Repository (`TrackRepository.ts`)** interacts with the database using TypeORM, performing CRUD operations.
7. **Model (`Track.ts`)** defines the Track entity and its schema for the database.
8. **Database (`Database.ts`)** manages the connection to PostgreSQL and entity synchronization.

### 2.2. Example: POST /api/v1/tracks

![alt text](https://raw.githubusercontent.com/innoskrit/psit-batch-2027/master/preptrack/documentation/track_flowchart.png "Track API Flow Chart")

#### Step-by-Step Breakdown

| Step | File/Component     | Action/Responsibility                       |
| ---- | ------------------ | ------------------------------------------- |
| 1    | app.ts             | Receives API request, routes to TrackRoutes |
| 2    | TrackRoutes.ts     | Calls createTrack controller                |
| 3    | TrackController.ts | Extracts data, calls TrackService           |
| 4    | TrackService.ts    | Validates, calls TrackRepository            |
| 5    | TrackRepository.ts | Creates and saves Track entity              |
| 6    | Track.ts           | Entity definition for Track                 |
| 7    | Database.ts        | Handles DB connection and sync              |

---

## 3. Detailed Component Roles & Responsibilities

### app.ts

- Sets up the Express server and middleware (e.g., JSON parsing).
- Mounts `/api/v1` routes for Track and other future services.
- Responsible for initializing the database connection (via `initializeDatabase`).
- Can be extended to add global error handling, authentication, logging, etc.

### config/Database.ts

- Configures TypeORM DataSource for PostgreSQL.
- Exports `initializeDatabase()` to connect and synchronize entities.
- Ensures all models are registered for automatic table creation.

### routes/TrackRoutes.ts

- Defines endpoints for Track resource (`/tracks`).
- Maps HTTP methods (GET, POST, etc.) to controller functions.
- Can be extended to add more routes (PUT, DELETE, etc.).

### controller/TrackController.ts

- Handles HTTP requests and responses for Track.
- Validates and extracts request data.
- Calls service methods and returns appropriate HTTP responses.
- Can be extended to add input validation, error handling, etc.

### service/TrackService.ts

- Contains business logic for Track operations (e.g., validation, transformation).
- Calls repository for data access.
- Can be extended to add more complex business rules.

### repository/TrackRepository.ts

- Handles direct database operations (CRUD) for Track.
- Uses TypeORM repository for Track entity.
- Can be extended to add custom queries, batch operations, etc.

### model/Track.ts

- Defines Track entity schema (fields, types, decorators).
- Used by TypeORM to map to the database table.
- Can be extended to add more fields, relationships, etc.

---

## 4. Track Entity Table Structure

| Field       | Type    | Description             |
| ----------- | ------- | ----------------------- |
| id          | uuid    | Primary key             |
| name        | varchar | Track name (required)   |
| description | varchar | Track description       |
| slug        | varchar | URL-friendly identifier |
| isNew       | boolean | Is this a new track?    |
| isActive    | boolean | Is this track active?   |
| createdAt   | date    | Creation timestamp      |

---

## 5. System Design Principles & Best Practices

- **Separation of Concerns:** Each layer (controller, service, repository, model) has a clear responsibility.
- **Scalability:** Easy to add new features (e.g., more endpoints, new entities, authentication).
- **Maintainability:** Modular code makes debugging and updates straightforward.
- **Type Safety:** TypeScript and TypeORM ensure strong typing and schema validation.
- **Extensibility:** New backend services and frontend models can follow the same structure for consistency.
- **Error Handling:** Can be centralized in `app.ts` for all routes and services.

---

## 6. Template for Future Services

- We will create similar files for other services like topic, subtopic, etc.

---

## 7. Summary

This document serves as the first system design for the backend Track API. Future backend services and frontend models should follow this modular, well-documented approach for consistency and maintainability.

---
