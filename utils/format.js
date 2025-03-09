export const formatStudentData = (user) => ({
    nom: user.nom,
    prenom: user.prenom,
    numero: user.numero,
    niveau: `${user.niveau} année`,
    filiere: user.filiere
  });

 export  const formatSessionData = (sessions) => 
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