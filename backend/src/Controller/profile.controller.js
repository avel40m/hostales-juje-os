import Profile from "../Models/Profile.js";
import User from "../Models/User.js";
import { ProfileDTO } from "../dto/profile.dto.js";
import { HttpsStatus } from "../utils/httpstatus.response.js";
import { sendResponseError, sendSuccessResponse } from "../utils/send.response.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.idUser).populate('profile');
        const userProfileDto = new ProfileDTO();
        userProfileDto.username = user.username;
        userProfileDto.email = user.email;
        userProfileDto.phone = user.profile?.phone;
        userProfileDto.province = user.profile?.province; 
        userProfileDto.location = user.profile?.location
        userProfileDto.city = user.profile?.city
        userProfileDto.sector = user.profile?.sector
        userProfileDto.createdAt = new Intl.DateTimeFormat('es',{dateStyle: 'full'}).format(user.createdAt);
        userProfileDto.profile = user?.profile != null ? true : false;

        sendSuccessResponse(res, null, userProfileDto, HttpsStatus.SUCCESS.OK);

    } catch (error) {
        sendResponseError(res, "Error al obtener el perfil de usuario", error, HttpsStatus.ERROR.INTENAL_ERROR);
        return
    }
}

export const createProfile = async (req,res) => {
    const id = req.idUser;
    try {
        const usuario = await User.findById(id);
        if(!usuario)
            return res.status(404).json({message:"El usuario no existe."});
        const profile = new Profile({...req.body,avatar:'default.png'});
        await profile.save();
        usuario.profile = profile;
        await usuario.save()
        return res.status(201).json({message:"Perfil creado correctamente"})
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const editProfile = async (req,res) => {
    const id = req.idUser;
    try {
        const usuario = await User.findById(id).populate('profile');
        if(!usuario.profile)
            return res.status(404).json({message:"No se encontro el perfil."})
        await Profile.findOneAndUpdate({_id: usuario.profile.id},req.body);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message:error.error.message})
    }
}