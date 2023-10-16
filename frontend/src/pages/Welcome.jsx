import React from 'react'
import { Cards } from '../components/Cards'
import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Opinions } from '../components/Opinions'
import { motion } from 'framer-motion';
import { ChatBot } from '../components/ChatBot'

export const Welcome = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <Header />
      <Cards />
      <Opinions />
      <ChatBot />
      <Footer />
    </motion.div>
  )
}
