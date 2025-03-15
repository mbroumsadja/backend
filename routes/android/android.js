import express from 'express';
import "../../models/sync.js";
import User from '../../models/user.js';
import Session from '../../models/session.js';
import { Op } from 'sequelize';
import {validateMatriculeFormat} from '../../middlewares/matricule_validate.js'
import {getCurrentWeekDates} from '../../middlewares/week.js'
import { formatSessionData,formatStudentData  } from '../../utils/format_data.js';
// import '../_init.js';
const android = express.Router();

const validateMatricule = (req, res, next) => {
  const { matricule } = req.params;
  
  const validationResult = validateMatriculeFormat(matricule);
  
  if (!validationResult.isValid) {
    return res.status(400).json({ 
      success: false,
      message: validationResult.message || "Matricule invalide" 
    });
  }
  next();
};


android.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bienvenue sur l'API de l'application mobile",
    version: "1.0.0"
  });
});


android.get('/:matricule', validateMatricule, async (req, res) => {
  const { matricule } = req.params;
  
  try {
    // Recherche de l'utilisateur
    const user = await User.findOne({
      where: { matricule },
      attributes: ['id', 'nom', 'prenom', 'numero', 'niveau', 'filiere']
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Ce matricule n'existe pas. Veuillez créer un compte."
      });
    }
    
    // Obtention des dates de la semaine
    const { start: startDate, end: endDate } = getCurrentWeekDates();
    
    // Recherche des séances pour la semaine
    const sessions = await Session.findAll({
      where: {
        jour: {
          [Op.between]: [startDate, endDate]
        },
        filiere: user.filiere,
        niveau: user.niveau
      },
      order: [['jour', 'ASC'], ['debut', 'ASC']]
    });

    // Construction de la réponse
    res.status(200).json({
      success: true,
      data: {
        student: formatStudentData(user),
        weekRange: {
          debut: startDate,
          fin: endDate
        },
        seances: formatSessionData(sessions)
      }
    });
    
  } catch (error) {
    console.error('Erreur dans la route /:matricule', { 
      matricule,
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
});


export default android;