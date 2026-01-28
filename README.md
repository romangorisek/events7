# Events7

Events7 is a full-stack application designed for managing events.

To build it we used Vue3 and NestJs as base frameworks.

On FE side we use Quasar framework te get predefined, full features components that are perfect for scenarios like dashboards and similar internal tools.

Key features supported:
 - Events CRUD with FE and BE validation
 - BE pagination, filtering and sorting
 - JWT authentication, used to validate users event creation and edition permissions
 - Automated testing

## How to Run

Follow these steps to set up and run the Events7 application locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm

### Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:romangorisek/events7.git
    cd events7
    ```

2.  **Backend (NestJS):**

    Navigate to the `be` directory, install dependencies, and start the development server.
    ```bash
    cd be
    npm install
    mv .env.example .env # update variables here to valid credentials for the fun7-ad-partner-expertise-test endpoint
    npm run start
    ```
    The backend will typically run on `http://localhost:3000`. For simplicity reasons, for this example we use this URL directly in the api service in the FE part.

3.  **Frontend (Vue.js/Quasar):**

    Open a new terminal, navigate to the `fe` directory, install dependencies, and start the development server.
    ```bash
    cd fe
    npm install
    npm run dev
    ```
    The frontend development server usually runs on `http://localhost:5173`.

4.  **Automated testing**

    Open a new terminal, to run all the tests use following commands:
    ```bash
    cd fe
    npm run test:e2e

    cd ../be
    npm run test
    npm run test:e2e
    ```
