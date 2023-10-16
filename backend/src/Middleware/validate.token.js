import User from "../Models/User.js";
import { UserDTO } from "../dto/user.dto.js";
import { HttpsStatus } from "../utils/httpstatus.response.js";
import { sendResponseError } from "../utils/send.response.js";
import jwt from 'jsonwebtoken';

export const verificarAutenticacionAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(404).json({ message: "Token no encontrado" })
        const { rol,id } = jwt.verify(token, process.env.KEY_SECRET);

        if (rol !== 'ADMIN')
            return res.status(403).json({ message: "No tiene el permiso para está accion" })
        req.idUser = id;
        next();
    } catch (error) {
        return res.status(404).json({ message: "El token está expirado" })
    }
}

export const verificarAutenticacionClient = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            sendResponseError(res, "Token no encontrado", null, HttpsStatus.ERROR.UNAUTHORIZED);
        const { id, rol } = jwt.verify(token, process.env.KEY_SECRET);

        if (rol !== 'CLIENT')
            sendResponseError(res, "No cuenta con el permiso para hacer está peticion", null, HttpsStatus.ERROR.FORBIDDEN);
        req.idUser = id;
        next();
    } catch (error) {
        sendResponseError(res, "El token está expirado", error, HttpsStatus.ERROR.NOT_FOUND);
    }
}

export const validateToken = async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token)
            return res.status(404).json({message:'Token no encontrado'});
        const { id } = jwt.verify(token,process.env.KEY_SECRET);
        const usuario = await User.findById(id);
        const userdto = new UserDTO(usuario._id,usuario.email,usuario.username,usuario.rol);
        return res.status(200).json({status:200,userdto});
    } catch (error) {
        return res.status(500).json({message:"El token ha expirado"})
    }
}