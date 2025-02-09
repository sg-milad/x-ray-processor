# **NestJS** ![NestJS Logo](https://github.com/imanhpr/nest-assignment/assets/56130647/facef099-7c17-4d9c-ae36-84265b05e31a)

## 🚀 How to Run the Project

To set up and run the project, follow these steps:

1. Copy the environment configuration files:
    ```bash
    cp .env.example .env
    cp .env.example .env.dev
    ```
2. Start the project using Docker:
    ```bash
    docker compose up
    ```
3. Wait a few minutes for the build process to complete.
4. Once the project is running, open [localhost:3000/docs](http://localhost:3000/docs) to access the Swagger API documentation.
    - If you prefer using **Postman**, import the `docs-json.json` file.

---

## 🧪 How to Run Tests

1. Install dependencies:
    ```bash
    pnpm install
    ```
2. Run tests:
    ```bash
    pnpm test
    ```
3. Run end-to-end (E2E) tests:
    ```bash
    pnpm test:e2e

    ```
