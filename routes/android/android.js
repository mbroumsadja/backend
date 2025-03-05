import express from 'express';
import { information } from '../../middlewares/details.js';
import User from '../../models/user.js';
import Session from '../../models/session.js';
import { startOfWeek, endOfWeek } from 'date-fns';

const android = express.Router();

android.get('/', (req, res) => {
    res.status(200).send({ message: "Bienvenue dans schedule" });
});

android.post('/:matricule', async (req, res) => {
    try {
        const { matricule } = req.params;
        const info = information(matricule);
        if (info == "Matricule Invalide") {
            return res.status(404).send({ message: info });
        }

        const UserExist = await User.findOne({ where: { matricule: matricule } });

        if (!UserExist) {
            return res.status(404).send({ message: false });
        }

        const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Lundi
        const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 }); // Dimanche

        const seances = await Session.findAll({
            where: {
                jour: {
                    [Op.between]: [startOfWeekDate, endOfWeekDate]
                },
                filiere: UserExist.filiere,
                niveau: UserExist.niveau
            },
            order: [['jour', 'ASC']]
        });

        res.status(200).send({ student:{
            nom:UserExist.nom,
            prenom:UserExist.prenom,
            numero:UserExist.numero,
            niveau:UserExist.niveau + UserExist.filiere,
            faculte:UserExist.faculte,
            universite:info.universite,
        },seances });

    } catch (error) {
        res.status(500).send({ message: 'Erreur interne du serveur', error: error.message });
    }
});

export default android;