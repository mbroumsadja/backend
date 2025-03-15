import {fr} from 'date-fns/locale'
import { startOfWeek, endOfWeek ,format} from 'date-fns';

export const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Lundi
    const end = endOfWeek(currentDate, { weekStartsOn: 1 }); // Dimanche
    
    return {
      start: format(start, "dd-MM-yyyy", { locale: fr }),
      end: format(end, "dd-MM-yyyy", { locale: fr })
    };
  };