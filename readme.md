# Work Planning Service

This RESTful API is designed to automate and simplify the process of scheduling and managing work shifts using Fastify, TypeScript, Prisma, and PostgreSQL. It provides an efficient way to handle worker schedules, ensuring no worker has more than one shift per day on database level.

## Features

- **Shift Management**: Easily manage work shifts, assigning workers to predefined time slots.
- **Worker Profiles**: Store and manage worker information, including contact details.
- **Unique Shift Assignment**: Enforce business rules to prevent scheduling a worker for more than one shift per day.

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or newer)
- PostgreSQL (v15.5 or newer)
- docker compose
- npm

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/teamway-workplan.git
   ```

2. Navigate to the project directory:

   ```sh
   cd teamway-workplan
   ```

3. Install npm packages:

   ```sh
   npm install
   ```

4. Prepare postgres db or run the docker compose command:

   ```sh
   docker-compose up -d
   ```

5. Create a `.env` file in the root directory and configure your database connection string:

   ```dotenv
   DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/workplanningdb"
   ```

6. Run Prisma migrations to set up your database schema:

   ```sh
   npx prisma migrate dev
   ```

7. Seed the database:

   ```sh
   npx prisma db seed
   ```

8. Start the server:
   ```sh
   npm run dev
   ```
   Your server should now be running and accessible at http://localhost:5000.

## Running the Tests

To execute the automated tests for this project, run:

    npm install

## Built With

- [**Fastify**](https://www.fastify.io/) - The web framework used
- [**Prisma**](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [**TypeScript**](https://www.typescriptlang.org/) - Superset of JavaScript for scalable web applications
- [**PostgreSQL**](https://www.postgresql.org/) - Open Source Relational Database

## Authors

- [**dskydiver**](https://www.github.com/dskydiver)
