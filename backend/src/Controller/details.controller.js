import Details from "../Models/Details.js";
import Hostal from "../Models/Hostal.js"

export const createDetails = async (req,res) => {
    const { idHostal } = req.params
    try {
        const hostal = await Hostal.findById(idHostal);
        if(!hostal)
            return res.status(404).json({message:"El hostal no existe"});
        const details = new Details(req.body);
        await details.save();
        hostal.details = details
        hostal.save();
        return res.status(201).json({message:"Se guardo correctamente!!!"})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}