# Car Washing Service API Documentation

## Overview

This API is designed for a car washing service application using Node.js, Express, TypeScript, Zod, Mongoose, and JWT. It provides endpoints for user authentication, service management, slot creation, and booking functionalities. Below is a summary of all available routes and their respective access permissions.

## Authentication

### Sign Up
- **Route:** `/api/auth/signup`
- **Method:** `POST`
- **Description:** Registers a new user for the car washing service.

### Log In
- **Route:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT for accessing protected routes.

## Services Management (Admin Only)

### Create Service
- **Route:** `/api/services`
- **Method:** `POST`
- **Description:** Creates a new car washing service.

### Get Service by ID
- **Route:** `/api/services/:id`
- **Method:** `GET`
- **Description:** Retrieves details of a specific car washing service by its ID.

### Get All Services
- **Route:** `/api/services`
- **Method:** `GET`
- **Description:** Retrieves a list of all available car washing services.

### Update Service
- **Route:** `/api/services/:id`
- **Method:** `PUT`
- **Description:** Updates the details of a specific car washing service by its ID.

### Delete Service (Soft Delete)
- **Route:** `/api/services/:id`
- **Method:** `DELETE`
- **Description:** Soft deletes a specific car washing service by its ID.

## Slot Management (Admin Only)

### Create Slot
- **Route:** `/api/services/slots`
- **Method:** `POST`
- **Description:** Creates a new time slot for car washing services.

### Check Slot Availability
- **Route:** `/api/slots/availability`
- **Method:** `GET`
- **Description:** Checks the availability of time slots for booking.

## Booking Management

### Book a Service
- **Route:** `/api/bookings`
- **Method:** `POST`
- **Description:** Books a car washing service for a user.

### Get All Bookings (Admin Only)
- **Route:** `/api/bookings`
- **Method:** `GET`
- **Description:** Retrieves a list of all bookings for the car washing services.

### Get User's Bookings
- **Route:** `/api/my-bookings`
- **Method:** `GET`
- **Description:** Retrieves the bookings made by the authenticated user.

## Usage

1. **Authentication:** Users must log in to book services and access their own booking history. Admins need to authenticate to manage services and slots.

2. **Service Management:** Admins can create, update, and delete car washing services. They can also manage available slots and check their availability.

3. **Booking:** Users can book car washing services, while admins can view all bookings and manage service-related operations.

## Technology Stack

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web framework for Node.js.
- **TypeScript**: Superset of JavaScript for static type checking.
- **Zod**: TypeScript-first schema validation library.
- **Mongoose**: MongoDB object modeling tool.
- **JWT**: JSON Web Tokens for secure authentication.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo-url.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd your-project-directory
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

5. **Configure environment variables:**
   - Create a `.env` file in the root directory and add necessary environment variables such as `PORT`, `MONGO_URI`, `JWT_SECRET`, etc.

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Make your changes and commit:**

    ```bash
    git add .
    git commit -m "Add your commit message"
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature
    ```

5. **Create a pull request.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

