import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Icon, Loader, Message } from 'semantic-ui-react';
import { useState,useCallback } from 'react';
import { useRouter } from 'next/router';
import {getRawMaterials} from '../../services/rawMaterialService'

const renderBody = (data) => {
  return data.map((element) => {
    return (
      <Table.Row key={element.id}>
          <Table.Cell>{element.id}</Table.Cell>
          <Table.Cell>{element.materialName}</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
      </Table.Row>
    );
  });
  
};

function projectsTable(){
  const router = useRouter()
  const [data, setData] = useState(null);

  if(!data){
    getRawMaterials().then(res => {
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
          <Table.HeaderCell>Hammadde Adı</Table.HeaderCell>
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>{renderBody(data)}</Table.Body>
      <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              <Button floated="right" primary size="small" fluid onClick={() => {router.push('/rawMaterial/addRawMaterial');}}>
                <Icon name="plus circle" /> Yeni Hammadde
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
    </Table>
  );
};

export default projectsTable;

