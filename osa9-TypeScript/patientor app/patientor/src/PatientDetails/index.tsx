
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Patient, HospitalEntry } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import { Icon } from "semantic-ui-react";
import { Button } from 'semantic-ui-react';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";



import { useStateValue, addEntry } from "../state";


const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ , dispatch] = useStateValue();

  const [patient, setPatient] = React.useState<Patient>();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

  

    React.useEffect(() => {
      void axios.get<void>(`${apiBaseUrl}/ping`);
      const fetchPatientList = async () => {
        try {
          const patient = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
            
          );
          setPatient(patient.data);
          
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientList();
    }, [dispatch]);


  const gender = (patientGender: string) =>{
    if (patientGender === 'female') {
      return <Icon enabled="true" name='venus'/>;
    }
    if (patientGender === 'male') {
      return <Icon enabled="true" name='mars'/>;
    } 
    return <Icon enabled="true" name='neuter'/>;
    };
  
    
    
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<HospitalEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      if (patient){
      patient.entries.push(newEntry);
      }
      closeModal();
    } catch (e) {
      console.error('Unknown Error');
      setError('Unknown error');
    }
  };
  
  if (patient) {
    return (
      <div>
        <h1>{patient.name} {gender(patient.gender)}</h1>
        
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h2>entries</h2>
          <div>{patient.entries.map(entry => EntryDetails({entry}))}</div>
          <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Hospital Entry</Button>
      
          
      </div>
    );
  }
  return <div>loading</div>;
};
export default PatientDetails;


