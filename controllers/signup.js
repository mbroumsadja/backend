import User from "../models/user.js";
import Admin from "../models/admin.js";
import { information } from "../middlewares/details.js";
import { validateMatriculeFormat } from "../routes/android/android.js";
import { isValid } from "date-fns";
export const signupA = async (req, res)=>{
    const {nom , prenom, numero , email , password, departement} = req.body
    try {
        const findUser = await Admin.findOne({
            where:{
                nom:nom,
                password:password
            }
        });
        if(findUser){
            return res.status(404).json({ 
                success: false,
                message: "Cette utilisateurs existe déja. Veuillez vous connectez a votre compte.",
                url:"http://localhost:10000/login/admin"
              });
        }
        const  admin = await Admin.create({
            nom,
            prenom,
            numero,
            email,
            password,
            departement
        });

        return res.status(200).json({ 
            success: true,
            message: `Votre compte été bien créé monsieur ${admin.prenom}`,
            user:{
                nom:admin.nom,
                departement: admin.departement
            },
            url:""
          });
        
    } catch (err) {
        console.error("au niveau de signup admin",err);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: process.env.NODE_ENV === 'production' ? undefined : err.message
          });
    }
    }

export const signupU = async (req,res)=>{
    const {matricule, nom, prenom, email ,numero} = req.body;
    try {
       const teste = validateMatriculeFormat(matricule);
       if(teste.isValid){
        const findUser = await User.findOne({where:{matricule:matricule}});
        if(findUser){
            return res.status(404).json({
                success: false,
                message:`ce matricule existe déja connecté vous.`,
                url: ""
            });
        }
        const user = information(matricule)
        const student = await User.create({
            matricule,
            nom,
            prenom,
            numero,
            email,
            filiere: user.filiere,
            niveau: user.niveau
        });

        return res.status(200).json({
            success:true,
            message:`le compte de ${nom} a été creé avec succes.`,
            url:"",
            student:{
                nom: student.nom,
                matricule: student.matricule
            },
            url:""
        });
       }else{
        return res.status(404).json({
            success: false,
            message:"votre matricule n'est pas valide",
            url:"",
        })
       }
    
    } catch (err) {
        console.error("au niveau de signup user",err);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: process.env.NODE_ENV === 'production' ? undefined : err.message
          });
    }
}