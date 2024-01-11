import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Icon, Loader, Message } from 'semantic-ui-react';
import { useState,useCallback } from 'react';
import { useRouter } from 'next/router';
import {getProducts} from '../../services/productService'

const renderProjects = (products) => {
  return products.map((product) => {
    return (
      <Table.Row key={product.id}>
          <Table.Cell>{product.id}</Table.Cell>
          <Table.Cell>{product.title}</Table.Cell>
          <Table.Cell>{product.strengthMin}</Table.Cell>
          <Table.Cell>{product.strengthMax}</Table.Cell>
      </Table.Row>
    );
  });
  
};

function projectsTable(){
  const router = useRouter()
  const [data, setData] = useState(null);

  if(!data){
    getProducts().then(res => {
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
          <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
          <Table.HeaderCell>Minimum Dayanım</Table.HeaderCell>
          <Table.HeaderCell>Maximum Dayanım</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{renderProjects(data)}</Table.Body>
      <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              <Button floated="right" primary size="small" fluid onClick={() => {router.push('/product/addProduct');}}>
                <Icon name="plus circle" /> Yeni Ürün
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
    </Table>
  );
};

export default projectsTable;

