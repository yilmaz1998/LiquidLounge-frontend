import React from "react"
import { Routes, Route } from "react-router-dom"

import ClassicsPage from "./pages/classics/ClassicsPage"
import ShowClassics from "./pages/classics/ShowClassics"
import MakeComment from "./pages/comments/MakeComment"
import EditComment from "./pages/comments/EditComment"
import MyFavorites from "./pages/favorites/MyFavorites"
import ShowFavorites from "./pages/favorites/ShowFavorites"
import MyDrinks from "./pages/drinks/MyDrinks"
import ShowDrinks from "./pages/drinks/ShowDrinks"
import EditDrink from "./pages/drinks/EditDrink"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import WelcomePage from "./pages/WelcomePage"

function App() {
  return (
     <div className="App">
    <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/drink/:id" element={<ShowDrinks />} />
          <Route path="/drink" element={<MyDrinks />} />
          <Route path="/drink/:id" element={<EditDrink />} />
          <Route path="/favorite" element={<MyFavorites />} />
          <Route path="/favorite/:id" element={<ShowFavorites />} />
          <Route path="/comment" element={<MakeComment />} />
          <Route path="/comment/:id" element={<EditComment />} />
          <Route path="/classics" element={<ClassicsPage />} />
          <Route path="/classics/:id" element={<ShowClassics />} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      <Footer />
      </div>
  )
}

export default App
