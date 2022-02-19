/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry, NewEntry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, HealthCheckRating} from './types';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewEntry = (object: any): NewEntry | undefined =>{
  if (object.type === "Hospital") {
    const newHospitalEntry: Omit <HospitalEntry, 'id'> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: "Hospital",
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseCriteria(object.discharge.criteria)
      }
    };
    return newHospitalEntry;
  } if (object.type === "OccupationalHealthcare") {
    const newHealthCheckEntry: Omit <HealthCheckEntry, 'id'> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return newHealthCheckEntry;
  } if (object.type === "OccupationalHealthcare") {
    const newOccupationalHealthcareEntry: Omit <OccupationalHealthcareEntry, 'id'> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: "OccupationalHealthcare",
      employerName: parseName(object.employerName),
      sickLeave: {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
      }
    };
    return newOccupationalHealthcareEntry;
  }
  return undefined;
  };
  

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};
const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing description');
  }
  return criteria;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!isArray(diagnosisCodes)) {
      throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
  }
  return diagnosisCodes;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (array: any): array is string[] => {
  return typeof array[0] === 'string';
};

 const isRating = (param: any): param is HealthCheckRating=> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
  };
  
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
  };


export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
    
  };

  return newEntry;
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing comment');
    }
    return name;
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
  };

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
  };
  
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
  };



export default toNewPatientEntry;
