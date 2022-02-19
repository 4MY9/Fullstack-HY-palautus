import { State } from "./state";
import { Patient,  Diagnosis, HospitalEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |  {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: HospitalEntry;
    };

export const reducer = (state: State, action: Action): State => {
  
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      console.log('finding patient...');
      return {
        ...state,
        patient: {
          ...action.payload
        }
      };
    
    case "SET_DIAGNOSE_LIST":
      
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
				patients: {
					...state.patients,
				},
        
      };
    default:
    return state;
  }
};


export const setPatientList = (patients: Patient[]) => {
  return {
    type: 'SET_PATIENT_LIST' as const,
    payload: patients,
  };
};

export const setPatient = (patient: Patient) => {
  return {
    type: 'SET_PATIENT' as const,
    payload: patient,
  };
};

export const addPatient = (patient: Patient) => {
  return {
    type: 'ADD_PATIENT' as const,
    payload: patient,
  };
};

export const setDiagnoseList = (diagnosis: Diagnosis[]) => {
  return {
    type: 'SET_DIAGNOSE_LIST' as const,
    payload: diagnosis,
  };
};


export const addEntry = (entry: HospitalEntry) => {
  return {
    type: 'ADD_ENTRY' as const,
    payload: entry
  };
};


