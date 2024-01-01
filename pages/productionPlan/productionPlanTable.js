import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Icon, Loader, Modal, Message, Tab, Grid, Header } from 'semantic-ui-react';
import { useState,useCallback } from 'react';
import { useRouter } from 'next/router';
import {getProductionPlans, saveOptimizedProduction} from '../../services/productionPlanService'
import moment from 'moment';


const renderModalTableBody = (data) => {
  if(data == null) return;

  return data.map((element) => {
    return (
      <Table.Row key={element.id}>
        <Table.Cell>{element.id}</Table.Cell>
        <Table.Cell>{element.information.materialName}</Table.Cell>
        <Table.Cell>{element.quantity} kg</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    );
  });
  
}


const renderPlanDetail = (plan) => {
    return(
      <Tab.Pane>
        <Grid columns="equal" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Grid.Row>
              <Grid.Column>
              <Header as="h3">Üretim Tarihleri</Header>
              </Grid.Column>
              <Grid.Column>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</Grid.Column>
          </Grid.Row>
        </Grid>
        <Table unstackable padded>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Hammadde Adı</Table.HeaderCell>
            <Table.HeaderCell>Miktar</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
            <Table.Body>{renderModalTableBody(plan.orderPlannedProductionRawMaterials)}</Table.Body>
          </Table>
      </Tab.Pane>
    );
}

const renderModalBody = ([selectedPlan, setSelectedPlan]) => {
  const panes = []
  if(selectedPlan){
    selectedPlan.plannedProductionList.forEach((element, index) => {
      panes.push(
        {
          menuItem: index + 1,    // product title 
          render: () => renderPlanDetail(element)
        }
      )
    });

    return <Tab panes={panes}></Tab>
  }
}

const renderBody = (data, [open, setOpen], [selectedPlan, setSelectedPlan]) => {
  return data.map((element) => {
    return (
      <Table.Row key={element.id}>
          <Table.Cell>{element.id}</Table.Cell>
          <Table.Cell>{element.title}</Table.Cell>
          <Table.Cell>{formatDate(element.startDate)}</Table.Cell>
          <Table.Cell>{formatDate(element.endDate)}</Table.Cell>
          <Table.Cell>
            {element.plannedProductionList == null || element.plannedProductionList.length === 0 && <Button positive size="small" fluid onClick={() => {saveOptimizedProduction(element.id)}}> Üretimi Planla
              </Button>}
              {element.plannedProductionList && element.plannedProductionList.length > 0 &&
                <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                <Button animated='fade' primary onClick={() => {setSelectedPlan(element)}}>
                    <Button.Content visible>Planı Gör</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
                }>
                    <Modal.Header>Üretim Planı</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        {renderModalBody([selectedPlan, setSelectedPlan])}
                      </Modal.Description> 
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setOpen(false)}>Kapat</Button>
                    </Modal.Actions>
                </Modal>
              }
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
    getProductionPlans().then(res => {
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
          <Table.HeaderCell>Başlık</Table.HeaderCell>
          <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
          <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
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
              <Button floated="right" primary size="small" fluid onClick={() => {router.push('/productionPlan/addProductionPlan');}}>
                <Icon name="plus circle" /> Yeni
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
    </Table>
  );
};

export default projectsTable;

