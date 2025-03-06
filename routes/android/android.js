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
  
  // Fonction de validation (à définir selon vos règles)
  const validationResult = validateMatriculeFormat(matricule);
  
  if (!validationResult.isValid) {
    return res.status(400).json({ 
      success: false,
      message: validationResult.message || "Matricule invalide" 
    });
  }
  
  next();
};

// Fonction de validation du format du matricule (à adapter selon vos règles)
function validateMatriculeFormat(matricule) {
  const regex = /^[A-Za-z]{2}-[A-Za-z]{3}-\d{2}[A-Za-z]{2}\d{4}$/i;

  if (!matricule || !regex.test(matricule)) {
      return { isValid: false, message: "Format de matricule invalide" };
  }

  return { isValid: true };
}

// Fonction utilitaire pour formater les données étudiant
const formatStudentData = (user) => ({
  nom: user.nom,
  prenom: user.prenom,
  numero: user.numero,
  niveau: `${user.niveau} année`,
  filiere: user.filiere
});

// Fonction utilitaire pour formater les séances
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

// Fonction utilitaire pour obtenir les dates de la semaine actuelle
const getCurrentWeekDates = () => {
  const currentDate = new Date();
  const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Lundi
  const end = endOfWeek(currentDate, { weekStartsOn: 1 }); // Dimanche
  
  return {
    start: format(start, "dd-MM-yyyy", { locale: fr }),
    end: format(end, "dd-MM-yyyy", { locale: fr })
  };
};

// Route d'accueil
android.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bienvenue sur l'API de l'application mobile",
    version: "1.0.0"
  });
});

// Route pour obtenir les données d'un étudiant et ses séances
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


// await Session.bulkCreate([
//   {
//     "cours": "Algorithmique avancée",
//     "jour": "04-03-2025",
//     "lieu": "Salle A101",
//     "debut": "08h00",
//     "fin": "10h00",
//     "enseignant": "Pr. Ndongo",
//     "filiere": "informatique",
//     "niveau": 1
//   },
//   {
//     "cours": "Circuits électriques",
//     "jour": "05-03-2025",
//     "lieu": "Salle B23",
//     "debut": "10h30",
//     "fin": "12h30",
//     "enseignant": "Dr. Kamdem",
//     "filiere": "genie electrique",
//     "niveau": 2
//   },
//   {
//     "cours": "Mécanique des structures",
//     "jour": "06-03-2025",
//     "lieu": "Salle C12",
//     "debut": "14h00",
//     "fin": "16h00",
//     "enseignant": "Mme. Tchinda",
//     "filiere": "genie civile",
//     "niveau": 3
//   },
//   {
//     "cours": "Forage pétrolier",
//     "jour": "07-03-2025",
//     "lieu": "Salle D8",
//     "debut": "09h00",
//     "fin": "11h00",
//     "enseignant": "Dr. Ngono",
//     "filiere": "genie petrolier",
//     "niveau": 4
//   },
//   {
//     "cours": "Réseaux avancés",
//     "jour": "08-03-2025",
//     "lieu": "Salle E4",
//     "debut": "08h00",
//     "fin": "10h00",
//     "enseignant": "Pr. Mbarga",
//     "filiere": "reseaux et telecom",
//     "niveau": 2
//   },
//   {
//     "cours": "Intelligence Artificielle",
//     "jour": "03-03-2025",
//     "lieu": "Salle A305",
//     "debut": "15h00",
//     "fin": "17h00",
//     "enseignant": "Dr. Fouda",
//     "filiere": "informatique",
//     "niveau": 4
//   },
//   {
//     "cours": "Systèmes embarqués",
//     "jour": "04-03-2025",
//     "lieu": "Salle B45",
//     "debut": "13h00",
//     "fin": "15h00",
//     "enseignant": "Dr. Kenfack",
//     "filiere": "genie electrique",
//     "niveau": 3
//   },
//   {
//     "cours": "Béton armé",
//     "jour": "06-03-2025",
//     "lieu": "Salle C22",
//     "debut": "10h30",
//     "fin": "12h30",
//     "enseignant": "Pr. Kouam",
//     "filiere": "genie civile",
//     "niveau": 1
//   },
//   {
//     "cours": "Géologie pétrolière",
//     "jour": "09-03-2025",
//     "lieu": "Salle D5",
//     "debut": "14h00",
//     "fin": "16h00",
//     "enseignant": "Mme. Essomba",
//     "filiere": "genie petrolier",
//     "niveau": 2
//   },
//   {
//     "cours": "Sécurité des réseaux",
//     "jour": "05-03-2025",
//     "lieu": "Salle E12",
//     "debut": "16h00",
//     "fin": "18h00",
//     "enseignant": "Dr. Talla",
//     "filiere": "reseaux et telecom",
//     "niveau": 3
//   }
// ]
// )
export default android;