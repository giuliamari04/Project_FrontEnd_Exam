# 🐶🐱 Pet Adoption App

## Overview
**Pet Adoption App** is a frontend web application designed to help users explore dogs and cats and save their favorite animals.

Users can browse animal cards, like or unlike pets, and manage their personal profile. The application supports **user authentication** and **role-based access**, allowing administrators to manage users and view all likes.  
All data is stored locally using `localStorage`, making the app simple and fully frontend-based.

This project was developed as part of a **Frontend Development Exam**.

---

## 🚀 Main Features

- Browse dogs and cats using an external API (**TheDogAPI** and **TheCatApi**)
- Like and unlike animals with a heart button when user logged
- User login and registration system using `localStorage`
- Personal profile page with a list of liked animals
- Make a fake donation for the shelter
- Role-based access:
  - **User**: can see and manage only their own likes
  - **Admin**: can view all users and all liked animals by other users
- Admin can delete user accounts
- Account deletion with confirmation modal
- Login-required modal for protected actions
- Responsive layout

---

## 🛠️ Technologies Used

- **React** (with Vite)
- **JavaScript (ES6+)**
- **React Router**
- **CSS / Tailwind CSS**
- **API**: [TheDogAPI](https://thedogapi.com/) and [TheCatApi](https://thecatapi.com)
- **localStorage** for authentication and data persistence
- **redux** to manage and share the dogs and cats data globally between components, avoiding prop drilling and ensuring better state consistency.

I decided to use Redux Toolkit instead of classic Redux because it greatly simplifies state management. In particular, for this project with asynchronous fetches, slices, and dynamic filters, Toolkit allows the use of createSlice and createAsyncThunk, which automate many repetitive operations like actions and reducers, improving code maintainability.
---

## 💻 How to Run the Project

### Option 1: Clone the repository
```sh
git clone https://github.com/giuliamari04/Project_FrontEnd_Exam.git
cd Project_FrontEnd_Exam
cd vite-progect
npm install
npm run dev
```

### use this credetials to access as an admin user:
- email: admin@gmail.com
- password: 123456

or register new credentials on the register page to access as an normal user

## API Key
you can get free api key on
- [TheDogAPI](https://thedogapi.com/)
- [TheCatApi](https://thecatapi.com)

### make .env file and write your key inside
```sh
VITE_DOG_API_KEY=YOUR_DOG_API
VITE_CAT_API_KEY=YOUR_CAT_API
```

### Structure
```sh
src/
│
├── api/
│   ├── dogApi.js        # Functions to fetch dogs from TheDogAPI
│   └── catApi.js        # Functions to fetch cats from TheCatAPI
│
├── components/
│   ├── Navbar.jsx       # Navigation bar
│   ├── Footer.jsx       # Footer
│   ├── AnimalCard.jsx   # Animal card component
│   └── Modal.jsx        # Modal for confirmations / information
│
├── pages/
│   ├── Home.jsx         # Main homepage
│   ├── Dogs.jsx         # Dogs page
│   ├── Cats.jsx         # Cats page
│   ├── User.jsx         # User profile / liked animals list
│   ├── Login.jsx        # Login page
│   └── Register.jsx     # Registration page
│
├── features/
│   ├── dogSlice.js      # Redux slice for dogs
│   ├── catSlice.js      # Redux slice for cats
│   └── store.js         # Redux store configuration
│
├── hooks/
│   └── useFetch.js      # Custom hook for fetching data
│
├── styles/
│   ├── main.css         # Global styles
│   └── Card.css         # Styles for animal cards (optional)
│
├── App.jsx              # Main component with routing
├── main.jsx             # React entry point
└── index.css            # Base global styles

```