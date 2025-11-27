📌 Full-Stack Product Management App
Angular 19 (Standalone) + Node.js + MongoDB + MySQL + Auth
This project is a full-stack application demonstrating multi-database integration using:
| Feature                                | Database |
| -------------------------------------- | -------- |
| Product CRUD                           | MongoDB  |
| User Authentication (Register + Login) | MySQL    |

🚀 Tech Stack

Frontend

Angular 19 (Standalone Components)

RxJS BehaviorSubject (State Management)

SCSS Custom Styling

Backend

Node.js + Express

MongoDB + Mongoose (Products)

MySQL + bcrypt + JWT (Users)



🖥 Frontend Setup (Angular 19 Standalone)

📍 Install Dependencies

cd product-crud-frontend

npm install

▶ Run Angular

ng serve --open


🍃 Product CRUD API (MongoDB)

| Method | API Endpoint        | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/products`     | List all products |
| GET    | `/api/products/:id` | Get product by ID |
| POST   | `/api/products`     | Add a product     |
| PUT    | `/api/products/:id` | Update product    |
| DELETE | `/api/products/:id` | Delete product    |
