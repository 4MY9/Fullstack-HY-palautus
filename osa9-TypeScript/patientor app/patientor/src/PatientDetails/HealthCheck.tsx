
import React from 'react';

import { HealthCheckEntry,  } from '../types';
import { Table, Icon } from 'semantic-ui-react';
import { useStateValue } from "../state";

const findDiagnose = (code: string) => {
  const [{ diagnosis }] = useStateValue();
      
  const result = Object.values(diagnosis).find(d => d.code === code);   
  if (result) {  
    return result.name;
  }
};

const rating = (healthCheckRating: number) => {
  if (healthCheckRating === 0) {
  return (
    <div>
    <Icon color='green' enabled="true" name='heart' />
    </div>
  );
  }
  if (healthCheckRating === 1) {
    return (
      <div>
      <Icon color='yellow' enabled="true" name='heart' />
      </div>
    );
    }
  if (healthCheckRating === 2) {
    return (
      <div>
      <Icon color='orange' enabled="true" name='heart' />
      </div>
    );
    }
    if (healthCheckRating === 2) {
      return (
        <div>
        <Icon color='red' enabled="true" name='heart' />
        </div>
      );
      }
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <Table celled>
       <Table.Body>
    <Table.Row>
      <Table.Cell>
        <h3>{entry.date} <Icon size='big' enabled='true' name='stethoscope'/></h3>
        <i>{entry.description}</i>
        {rating(entry.healthCheckRating)}
        <ul>{entry.diagnosisCodes?.map(code =><li key={code}>{code} {findDiagnose(code)}</li>)}</ul>
      </Table.Cell>
      </Table.Row>
      </Table.Body>
      </Table>
    </div>
  );
  };

export default HealthCheck;