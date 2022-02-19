import express from 'express';
import patientService from '../services/patientService';
import { Entry } from '../types';
import toNewPatientEntry from '../utils';
import { toNewEntry, } from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/:id/entries', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient.entries);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body) as Entry;
    const patientId = req.params.id;
    if (patientId) {
      const addedEntry = patientService.addEntry(newEntry, patientId);
      res.json(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});




router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;