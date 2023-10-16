import React from 'react'
import { Navbar } from '../components/Navbar'
import { FormRegister } from '../components/Login/FormRegister'
import { motion } from 'framer-motion';

export const Register = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}>
      <Navbar />
      <FormRegister />
    </motion.div>
  )
}
