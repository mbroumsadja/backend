import { where } from "sequelize";
import Admin from "../models/admin.js";

export const loginA = async (req,res)=>{
    const {nom , password} = req.body;
    try {
        const findUser = await Admin.findOne({
            where:[
                {nom:nom} && {password:password}
            ]
        });

        if(!findUser){
            return res.status(404).json({ 
                success: false,
                message: "Ce nom n'existe pas. Veuillez créer un compte ici http://localhost:10000/signup/admin."
              });
        }
        return res.status(200).json({ 
            success: true,
            message: `Bienvenue monsieur ${findUser.prenom} votre mots de passe est ${findUser.password}`,
            url:""
          });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: process.env.NODE_ENV === 'production' ? undefined : err.message
          });
    }
}