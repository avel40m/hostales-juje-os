import React, { useState } from 'react'
import './styles/chatbot.css';
import {BsFillChatTextFill} from 'react-icons/bs'
import Bot from 'react-simple-chatbot';


const steps = [
    {
      id: '0',
      message: '¿Cual es su nombre?',
      trigger: 'name',
    },
    {
      id: 'name',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hola, {previousValue}! ¿En que pudo ayudarte?',
      trigger: 'options',
    },
    {
        id: 'options',
        options: [
          { value: 'Pagos', label: 'Pagos', trigger: '4' },
          { value: 'descuentos', label: 'Descuentos', trigger: '5' },
        ],
      },
      {
        id: '2',
        message: '¿Desea hacer otra consulta?',
        trigger: 'final',
      },
      {
        id: '4',
        message: 'Actualmente se aceptán pagos a travéz de mercado pago',
        trigger: '2',
      },
      {
        id: '5',
        message: 'Ningún hostal cuentán con descuentos',
        trigger: '2',
      },
      {
          id: 'final',
          options: [
            { value: 'SI', label: 'si', trigger: '0' },
            { value: 'NO', label: 'no', end: true },
          ],
        },
    {
      id: '1',
      message: 'Si no quedo conforme, por favor envianos un mensaje!',
      trigger: '0'
    },
  ];
export const ChatBot = () => {
    const [value, setValue] = useState(true)
  return (
    <div>
        <div className='chat'  style={{display: `${value ? 'none' : 'block'}`}}>
        <Bot
         headerTitle="Chat"
         placeholder='Escriba su mensaje...'
        steps={steps}/>
        </div>
        <button className='btn-chat'>
            <BsFillChatTextFill 
            className='icon-chat' 
            onClick={() => setValue(!value)}
            />
        </button>
    </div>
  )
}
