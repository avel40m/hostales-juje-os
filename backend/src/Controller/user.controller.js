import User from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResponseError, sendSuccessResponse } from '../utils/send.response.js';
import { HttpsStatus } from '../utils/httpstatus.response.js';
import { UserDTO } from '../dto/user.dto.js';

export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User({
            username,
            email,
            password: bcrypt.hashSync(password, 10),
        });
        await newUser.save();
        return res.status(201).json({status:201,message:"Usuario registrado correctamente"})
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.username) {
        return res.status(500).json({status:500,message:"El usuario se encuentra registrado"})
    } else if (error.code === 11000 && error.keyPattern.email) {
            return res.status(500).json({status:500,message:"El email se encuentra registrado"})
        } else {
            return res.status(500).json({status:500,message:"Error al crear el usuario"})
        }
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await User.findOne({
            $or: [
                { username },
                { email: username }
            ]
        });
        if (!usuario) {
            sendResponseError(res, "El usuario no está registrado en la base de datos", null, HttpsStatus.ERROR.NOT_FOUND);
            return
        }
        const isMatch = bcrypt.compareSync(password,usuario.password);
        if(!isMatch){
            sendResponseError(res,"La contraseña no coinciden",null,HttpsStatus.ERROR.NOT_FOUND);
            return
        }

        const payload = {
            id: usuario._id,
            username: usuario.username,
            email: usuario.email,
            rol: usuario.rol
        }
        const userdto = new UserDTO(usuario._id,usuario.email,usuario.username,usuario.rol);
        const token = jwt.sign(payload,process.env.KEY_SECRET,{expiresIn: '30m'});

        sendSuccessResponse(res,"Usuario loggueado correctamente",{token,userdto},HttpsStatus.SUCCESS.OK);
        return
    } catch (error) {
        sendResponseError(res, 'Error al loggearse', error.message, HttpsStatus.ERROR.INTENAL_ERROR);
    }
}
// Chequear funcion
export const getUser = async (req,res) => {
    try {
        const user = await User.findById(req.idUser);
        const userdto = new UserDTO(user._id,user.email,user.username,user.rol,user.createdAt);
        return res.status(404).json({status:200,userdto});
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const getAllUser = async (req,res) => {
    try {
        const user = await User.find({rol: {$ne: 'ADMIN'}});
        const arreglosDto = [];
        user.forEach(usuarios => {
            const userdto = new UserDTO(usuarios._id,usuarios.email,usuarios.username,usuarios.rol,formatoDeFecha(usuarios.createdAt));
            arreglosDto.push(userdto);
        })
        return res.status(200).json(arreglosDto);
    } catch (error) {
        return res.status(500).json({message: error})
    }
}


const formatoDeFecha = (fecha) => {
    return new Intl.DateTimeFormat('es',{dateStyle:'full'}).format(fecha);
}
