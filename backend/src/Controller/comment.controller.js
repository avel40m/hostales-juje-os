import { populate } from "dotenv";
import Comment from "../Models/Comment.js";
import Hostal from "../Models/Hostal.js";
import User from "../Models/User.js";
import { CommentDTO } from "../dto/comment.dto.js";

export const createComment = async (req,res) => {
    const {comment,value,nombre} = req.body;
    const id = req.idUser;
    try {
        const usuario = await User.findById(id);
        if(!usuario)
            return res.status(404).json({message:"El usuario no se encontro!!!"});
        const hostal = await Hostal.findOne({name: nombre});
        if(!hostal)
            return res.status(404).json({message:"El hostal no fue encontrado"});
        const comentario = new Comment();
        comentario.comment = comment;
        comentario.value = parseInt(value);
        comentario.user = usuario;

        await comentario.save();
        hostal.comments.push(comentario)

        await hostal.save();
        return res.status(201).json({message:"Se guardo el mensaje correctamente!!!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

export const getCommentsForHostals = async (req,res) => {
    try {
        const hostal = await Hostal.find().populate({path: 'comments',populate: {path: 'user'}});
        const comentarios = hostal.filter(hostal => hostal.comments.length != 0);
        const arreglo = [];
        comentarios.forEach(comentario => {
            let commentDTO = new CommentDTO();
            commentDTO.usuario = comentario.comments[0].user.username;
            commentDTO.comentario = comentario.comments[0].comment;
            commentDTO.valoracion = comentario.comments[0].value;
            commentDTO.horario = new Intl.DateTimeFormat('es-AR',{dateStyle: 'medium'}).format(comentario.comments[0].createdAt);;
            commentDTO.hostal = comentario.name;
            arreglo.push(commentDTO)
        })
        return res.status(200).json(arreglo);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}