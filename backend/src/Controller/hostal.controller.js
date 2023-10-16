import Hostal from "../Models/Hostal.js";
import { HostalDTO, HostalMenuDTO } from "../dto/hostal.dto.js";

export const createHostal = async (req,res) => {
    try {
        const hostal = new Hostal(req.body);
        await hostal.save();
        return res.status(201).json({message:"Hostal creado correctamente"});        
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const getHostal = async (req,res) => {
    try {
        const hostal = await Hostal.find();
        const arregloHostal = [];
        hostal.map(hostals => {
            let hostal = new HostalDTO(hostals.id,hostals.place,hostals.name,hostals.price,hostals.phone);
            arregloHostal.push(hostal);
        })
        return res.status(200).json(arregloHostal)
    } catch (error) {
        return res.status(500).json({message:error});    
    }
}

export const detailsHostal = async (req,res) => {
    const { id } = req.params;
    try {
        const hostal = await Hostal.findById(id);
        res.status(200).json(hostal);
    } catch (error) {
        return res.status(500).json({message:error});    
    }
}

export const getHostalMenu = async (req,res) => {
    try {
        const hostal = await Hostal.find();
        const arregloHostal = [];
        hostal.map(hostals => {
            let hostalDTO = new HostalMenuDTO();
            hostalDTO.id = hostals.id; 
            hostalDTO.nombre = hostals.name; 
            hostalDTO.lugar = hostals.place; 
            hostalDTO.telefono = hostals.phone; 
            hostalDTO.descripcion = hostals.description; 
            hostalDTO.precio = hostals.price; 
            hostalDTO.imagen = hostals.photo;
            hostalDTO.address = hostals.address;
            hostalDTO.ubicacion = hostals.name.split(' ').join('+');
            arregloHostal.push(hostalDTO); 
        })
        return res.status(200).json(arregloHostal);
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const getHostalMenuDetails = async (req,res) => {
    const {id} = req.params;
    try {
        const hostals = await Hostal.findById(id).populate('details');
        return res.status(200).json({hostals})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}