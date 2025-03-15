import Admin from "../models/admin.js";
import Session from "../models/session.js";
import User from "../models/user.js";

// EXEMPLES D'UTILISATEURS ÉTUDIANTS
const sampleUsers = [
    {
      matricule: "cm-uga-23in0105",
      nom: "Kamga",
      prenom: "Sandrine",
      numero: "655781234",
      email: "s.kamga@student.uga.cm",
      password: "motdepasse123",
      filiere: "informatique",
      niveau: 2
    },
    {
      matricule: "cm-uga-22rt0087",
      nom: "Nganou",
      prenom: "Jean-Paul",
      numero: "677458912",
      email: "jp.nganou@student.uga.cm",
      password: "motdepasse123",
      filiere: "réseaux télécom",
      niveau: 3
    },
    {
      matricule: "cm-uga-24in0221",
      nom: "Fouda",
      prenom: "Mirelle",
      numero: "699876543",
      email: "m.fouda@student.uga.cm",
      password: "motdepasse123",
      filiere: "informatique",
      niveau: 1
    },
    {
      matricule: "cm-uga-21gp0056",
      nom: "Atangana",
      prenom: "Ibrahim",
      numero: "691234567",
      email: "i.atangana@student.uga.cm",
      password: "motdepasse123",
      filiere: "génie pétrolier",
      niveau: 4
    },
    {
      matricule: "cm-uga-23gc0143",
      nom: "Mbarga",
      prenom: "Patricia",
      numero: "652345678",
      email: "p.mbarga@student.uga.cm",
      password: "motdepasse123",
      filiere: "génie civil",
      niveau: 2
    },
    {
      matricule: "cm-uga-22in0179",
      nom: "Essono",
      prenom: "Franck",
      numero: "677890123",
      email: "f.essono@student.uga.cm",
      password: "motdepasse123",
      filiere: "informatique",
      niveau: 3
    },
    {
      matricule: "cm-uga-24ge0092",
      nom: "Biya",
      prenom: "Denise",
      numero: "698765432",
      email: "d.biya@student.uga.cm",
      password: "motdepasse123",
      filiere: "génie électrique",
      niveau: 1
    }
  ];
  
  // EXEMPLES D'ADMINISTRATEURS
  const sampleAdmins = [
    {
      nom: "Onana",
      prenom: "Thomas",
      numero: "677123456",
      email: "t.onana@admin.uga.cm",
      password: "adminPassword456",
      departement:"mathematique-informatique"
    },
    {
      nom: "Essomba",
      prenom: "Marguerite",
      numero: "699887766",
      email: "m.essomba@admin.uga.cm",
      password: "adminPassword789",
      departement:"physique"
    }
  ];
  
  // EXEMPLES DE SESSIONS DE COURS - INFORMATIQUE NIVEAU 1
  const sampleInformatique1Sessions = [
    {
      cours: "Introduction à la programmation",
      jour: "11-03-2025",
      lieu: "Amphi 200",
      debut: "08h00",
      fin: "10h00",
      enseignant: "Dr. Nkoulou",
      filiere: "informatique",
      niveau: 1
    },
    {
      cours: "Mathématiques discrètes",
      jour: "11-03-2025",
      lieu: "Amphi 200",
      debut: "10h30",
      fin: "12h30",
      enseignant: "Dr. Tchuente",
      filiere: "informatique",
      niveau: 1
    },
    {
      cours: "Électronique numérique",
      jour: "12-03-2025",
      lieu: "Salle B12",
      debut: "08h00",
      fin: "11h00",
      enseignant: "Dr. Fotso",
      filiere: "informatique",
      niveau: 1
    }
  ];
  
  // EXEMPLES DE SESSIONS DE COURS - INFORMATIQUE NIVEAU 2
  const sampleInformatique2Sessions = [
    {
      cours: "Programmation orientée objet",
      jour: "10-03-2025",
      lieu: "Labo Informatique 1",
      debut: "13h00",
      fin: "16h00",
      enseignant: "Dr. Mebara",
      filiere: "informatique",
      niveau: 2
    },
    {
      cours: "Architecture des ordinateurs",
      jour: "11-03-2025",
      lieu: "Amphi 300",
      debut: "07h00",
      fin: "10h00",
      enseignant: "Prof. Emvudu",
      filiere: "informatique",
      niveau: 2
    },
    {
      cours: "Systèmes d'exploitation",
      jour: "12-03-2025",
      lieu: "Labo Informatique 2",
      debut: "14h00",
      fin: "17h00",
      enseignant: "Dr. Ngatcheu",
      filiere: "informatique",
      niveau: 2
    }
  ];
  
  // EXEMPLES DE SESSIONS DE COURS - GÉNIE CIVIL NIVEAU 2
  const sampleGenieCivil2Sessions = [
    {
      cours: "Résistance des matériaux",
      jour: "10-03-2025",
      lieu: "Bloc technique",
      debut: "08h00",
      fin: "11h00",
      enseignant: "Prof. Ndam",
      filiere: "génie civil",
      niveau: 2
    },
    {
      cours: "Béton armé",
      jour: "11-03-2025",
      lieu: "Bloc technique",
      debut: "13h00",
      fin: "16h00",
      enseignant: "Dr. Abena",
      filiere: "génie civil",
      niveau: 2
    },
    {
      cours: "Mécanique des fluides",
      jour: "13-03-2025",
      lieu: "Amphi 300",
      debut: "09h00",
      fin: "12h00",
      enseignant: "Dr. Ekodeck",
      filiere: "génie civil",
      niveau: 2
    }
  ];
  
  // EXEMPLES DE SESSIONS DE COURS - RÉSEAUX TÉLÉCOM NIVEAU 3
  const sampleReseauxTelecom3Sessions = [
    {
      cours: "Réseaux mobiles",
      jour: "10-03-2025",
      lieu: "Labo Télécom",
      debut: "09h00",
      fin: "12h00",
      enseignant: "Dr. Kamdem",
      filiere: "réseaux télécom",
      niveau: 3
    },
    {
      cours: "Sécurité des réseaux",
      jour: "12-03-2025",
      lieu: "Labo Télécom",
      debut: "13h00",
      fin: "16h00",
      enseignant: "Prof. Ngono",
      filiere: "réseaux télécom",
      niveau: 3
    },
    {
      cours: "Administration système Linux",
      jour: "14-03-2025",
      lieu: "Labo Informatique 3",
      debut: "08h00",
      fin: "12h00",
      enseignant: "Dr. Balla",
      filiere: "réseaux télécom",
      niveau: 3
    }
  ];

  const free_data =[
    {
      "cours": "Algorithmique avancée",
      "jour": "04-03-2025",
      "lieu": "Salle A101",
      "debut": "08h00",
      "fin": "10h00",
      "enseignant": "Pr. Ndongo",
      "filiere": "informatique",
      "niveau": 1
    },
    {
      "cours": "Circuits électriques",
      "jour": "05-03-2025",
      "lieu": "Salle B23",
      "debut": "10h30",
      "fin": "12h30",
      "enseignant": "Dr. Kamdem",
      "filiere": "genie electrique",
      "niveau": 2
    },
    {
      "cours": "Mécanique des structures",
      "jour": "06-03-2025",
      "lieu": "Salle C12",
      "debut": "14h00",
      "fin": "16h00",
      "enseignant": "Mme. Tchinda",
      "filiere": "genie civile",
      "niveau": 3
    },
    {
      "cours": "Forage pétrolier",
      "jour": "07-03-2025",
      "lieu": "Salle D8",
      "debut": "09h00",
      "fin": "11h00",
      "enseignant": "Dr. Ngono",
      "filiere": "genie petrolier",
      "niveau": 4
    },
    {
      "cours": "Réseaux avancés",
      "jour": "08-03-2025",
      "lieu": "Salle E4",
      "debut": "08h00",
      "fin": "10h00",
      "enseignant": "Pr. Mbarga",
      "filiere": "reseaux et telecom",
      "niveau": 2
    },
    {
      "cours": "Intelligence Artificielle",
      "jour": "03-03-2025",
      "lieu": "Salle A305",
      "debut": "15h00",
      "fin": "17h00",
      "enseignant": "Dr. Fouda",
      "filiere": "informatique",
      "niveau": 4
    },
    {
      "cours": "Systèmes embarqués",
      "jour": "04-03-2025",
      "lieu": "Salle B45",
      "debut": "13h00",
      "fin": "15h00",
      "enseignant": "Dr. Kenfack",
      "filiere": "genie electrique",
      "niveau": 3
    },
    {
      "cours": "Béton armé",
      "jour": "06-03-2025",
      "lieu": "Salle C22",
      "debut": "10h30",
      "fin": "12h30",
      "enseignant": "Pr. Kouam",
      "filiere": "genie civile",
      "niveau": 1
    },
    {
      "cours": "Géologie pétrolière",
      "jour": "09-03-2025",
      "lieu": "Salle D5",
      "debut": "14h00",
      "fin": "16h00",
      "enseignant": "Mme. Essomba",
      "filiere": "genie petrolier",
      "niveau": 2
    },
    {
      "cours": "Sécurité des réseaux",
      "jour": "05-03-2025",
      "lieu": "Salle E12",
      "debut": "16h00",
      "fin": "18h00",
      "enseignant": "Dr. Talla",
      "filiere": "reseaux et telecom",
      "niveau": 3
    }
  ]
  
  
 export async function initializeData() {
    try {
      await User.bulkCreate(sampleUsers);
      console.log("Étudiants créés avec succès");
      
      await Admin.bulkCreate(sampleAdmins);
      console.log("Administrateurs créés avec succès");
      
      await Session.bulkCreate([
        ...sampleInformatique1Sessions,
        ...sampleInformatique2Sessions,
        ...sampleGenieCivil2Sessions,
        ...sampleReseauxTelecom3Sessions,
        ...free_data
      ]);
      console.log("Sessions créées avec succès");
      console.log("Initialisation des données terminée");
    } catch (error) {
      console.error("Erreur lors de l'initialisation des données:", error);
    }
  }
