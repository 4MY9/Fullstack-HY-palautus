import patientData from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Patient, NewEntry  } from '../types';
import {v1 as uuid} from 'uuid';
const id:string = uuid();

const patients: Array<PatientEntry> = patientData;

const getPatients = () => {
  return patients;
};


const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
		return undefined;
	} if (!('entries' in patient)) {
		const entries = { ...(patient), entries: [] };
		return entries;
	}
	return patient;
};


const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
        occupation
      }));
};


const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
      id: id,
      ...entry
    };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( entry: NewEntry, patientId: string ): NewEntry | undefined => {
  const newEntry = {
    id: id,
    ...entry
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patientToUpdate: any = patients.find(p => p.id === patientId);
  if(patientToUpdate && newEntry) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    patientToUpdate.entries.push(newEntry);
    
  return newEntry;
 }
 return undefined;
};



export default {
  getPatients,
  findById,
  getNonSensitiveEntries,
  addPatient,
  addEntry
  
  
};