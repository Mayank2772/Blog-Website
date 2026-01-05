import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { useAppContext } from '../context/AppContext'
const Home = () => {
  const {token} = useAppContext()
  return (
    <>
    <Navbar />
    <Header />
    <BlogList />
    {!token && <NewsLetter />}
    <Footer />
    </>
  )
}

export default Home
