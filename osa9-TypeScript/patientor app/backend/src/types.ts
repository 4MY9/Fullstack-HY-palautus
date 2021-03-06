export enum Gender {
  Female = 'female',
  Male = 'male',
  Other= 'other'
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string
  
  }

  export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries: Entry[]
  }

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries'>;


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
export type NewEntry = Omit<Entry, 'id'>;


export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: object;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  
    
  
    
    