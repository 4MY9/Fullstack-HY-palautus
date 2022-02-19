import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Table, Icon } from 'semantic-ui-react';
import { useStateValue } from "../state";

const findDiagnose = (code: string) => {
  const [{ diagnosis }] = useStateValue();
      
  const result = Object.values(diagnosis).find(d => d.code === code);   
  if (result) {  
    return result.name;
  }
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
      <div>
        <Table celled>
       <Table.Body>
    <Table.Row>
      <Table.Cell>
        <h3>{entry.date} <Icon size='big' enabled="true" name='user md'/></h3>
        <i>{entry.description}</i>
        {entry.diagnosisCodes?.map(code =><li key={code}>{code} {findDiagnose(code)}</li>)}
      </Table.Cell>
      </Table.Row>
      </Table.Body>
      </Table>
      </div>
    );
  };

export default OccupationalHealthcare;