import express from 'express';
import { information } from '../../middlewares/details.js';
import User from '../../models/user.js';
import Session from '../../models/session.js';
import { startOfWeek, endOfWeek ,format} from 'date-fns';
import { Op } from 'sequelize';
import {fr} from 'date-fns/locale'
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


function validateMatriculeFormat(matricule) {
  const regex = /^[A-Za-z]{2}-[A-Za-z]{3}-\d{2}[A-Za-z]{2}\d{4}$/i;

  if (!matricule || !regex.test(matricule)) {
      return { isValid: false, message: "Format de matricule invalide" };
  }

  return { isValid: true };
}

const formatStudentData = (user) => ({
  nom: user.nom,
  prenom: user.prenom,
  numero: user.numero,
  niveau: `${user.niveau} année`,
  filiere: user.filiere
});

const formatSessionData = (sessions) => 
  sessions.map(session => ({
    id: session.id,
    cours: session.cours,
    jour: session.jour,
    lieu: session.lieu,
    debut: session.debut,
    fin: session.fin,
    filiere: session.filiere,
    enseignant: session.enseignant,
    support: session.support
  }));

const getCurrentWeekDates = () => {
  const currentDate = new Date();
  const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Lundi
  const end = endOfWeek(currentDate, { weekStartsOn: 1 }); // Dimanche
  
  return {
    start: format(start, "dd-MM-yyyy", { locale: fr }),
    end: format(end, "dd-MM-yyyy", { locale: fr })
  };
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