import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Icon, Loader, Modal, Message, Tab, Grid, Header } from 'semantic-ui-react';
import { useState,useCallback } from 'react';
import { useRouter } from 'next/router';
import {getUsers} from '../../services/userService'
import moment from 'moment';

const renderBody = (data) => {
  return data.map((element) => {
    return (
      <Table.Row key={element.id}>
          <Table.Cell>{element.id}</Table.Cell>
          <Table.Cell>{element.email}</Table.Cell>
          <Table.Cell>{formatDate(element.registrationDate)}</Table.Cell>
          <Table.Cell>{formatDate(element.lastLoginDate)}</Table.Cell>
          <Table.Cell>
          </Table.Cell>
          <Table.Cell>
          </Table.Cell>
      </Table.Row>
    );
  });
  
}


function formatDate(date){
  return moment(date).format('DD.MM.yyyy HH:mm:ss');
}

function projectsTable(){
  const router = useRouter()
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  if(!data){
    getUsers().then(res => {
      setData(res.data);
    }).catch(err => console.log(err))
  }

  if(data == null){
    return (    
      <Loader active/>
      );
  }
  
  return (
    <Table unstackable padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>E-Posta</Table.HeaderCell>
          <Table.HeaderCell>Kayıt Tarihi</Table.HeaderCell>
          <Table.HeaderCell>Son Giriş Tarihi</Table.HeaderCell>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>{renderBody(data, [open, setOpen], [selectedPlan, setSelectedPlan])}</Table.Body>
      <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              <Button floated="right" primary size="small" fluid onClick={() => {router.push('/user/addUser');}}>
                <Icon name="plus circle" /> Yeni
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
    </Table>
  );
};

export default projectsTable;

