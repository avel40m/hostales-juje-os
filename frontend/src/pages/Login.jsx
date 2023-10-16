import React from 'react'
import { Navbar } from '../components/Navbar'
import { FormLogin } from '../components/Login/FormLogin'
import { motion } from 'framer-motion';

export const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{duration:1}}
      >
      <Navbar />
      <FormLogin />
    </ motion.div>
  )
}
