export function validateMatriculeFormat(matricule) {
    const regex = /^[A-Za-z]{2}-[A-Za-z]{3}-\d{2}[A-Za-z]{2}\d{4}$/i;
  
    if (!matricule || !regex.test(matricule)) {
        return { isValid: false, message: "Format de matricule invalide" };
    }
  
    return { isValid: true };
  }