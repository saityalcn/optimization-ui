import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Icon, Loader, Message } from 'semantic-ui-react';
import { useState,useCallback } from 'react';
import { useRouter } from 'next/router';
import {getOrders} from '../../services/orderService'

const renderProjects = (orders) => {
  return orders.map((order) => {
    return (
      <Table.Row key={order.id}>
          <Table.Cell>{order.id}</Table.Cell>
          <Table.Cell>{order.orderTitle}</Table.Cell>
          <Table.Cell>{order.orderQuantity}</Table.Cell>
          <Table.Cell>{!order.projectValid && order.projectActive && (
              <Message
                compact
                content="Yetersiz Çalışan"
                error
              />)}{
                (order.projectValid && order.projectActive && (<Message
                  compact
                  content="Uygun"
                  success
                />))}
                {
                (order.projectValid && !order.projectActive && (<Message
                  compact
                  content="Tamamlandı"
                  info
                />))}
          </Table.Cell>
      </Table.Row>
    );
  });
  
};

function projectsTable(){
  const router = useRouter()
  const [data, setData] = useState(null);

  if(!data){
    getOrders().then(res => {
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
          <Table.HeaderCell>Sipariş Başlığı</Table.HeaderCell>
          <Table.HeaderCell>Miktar</Table.HeaderCell>
          <Table.HeaderCell> </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{renderProjects(data)}</Table.Body>
      <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              <Button floated="right" primary size="small" fluid onClick={() => {router.push('/order/addOrder');}}>
                <Icon name="plus circle" /> Yeni Sipariş
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
    </Table>
  );
};

export default projectsTable;

