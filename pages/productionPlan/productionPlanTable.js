import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Icon, Loader, Modal, Message, Tab, Grid, Header, Form, Confirm } from 'semantic-ui-react';
import { useState,useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import {getProductionPlans, saveOptimizedProduction} from '../../services/productionPlanService'
import {getMethods} from '../../services/methodService'

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

const renderModalBody = ([selectedPlan, setSelectedPlan], [selectedAlgorithmKey, setSelectedAlgorithmKey], [methods, setMethods]) => {
  const filteredPanes = []

  if(selectedPlan){
    selectedPlan.plannedProductionList.filter(element => element.method.id === selectedAlgorithmKey).forEach((element, index) => {
      filteredPanes.push(
        {
          menuItem: index + 1,    // product title 
          render: () => renderPlanDetail(element)
        }
      )
    });
  }

    return <div>
      <Form.Select label="Algoritma " placeholder='Algoritma Seçiniz' 
      options={methods.map(element => {return { key: element.id, value: element.title, text: element.title }})} 
      onChange={(e,data) => {
        setSelectedAlgorithmKey((data.options.find(element => (element.value === data.value))).key)
      }}>

      </Form.Select>
    <Tab panes={filteredPanes}></Tab></div>

}

const renderBody = (data, [open, setOpen], [selectedPlan, setSelectedPlan], [selectedAlgorithmKey, setSelectedAlgorithmKey], [methods, setMethods], [confirmOpen, setConfirmOpen]) => {
    const showConfirm = () => setConfirmOpen(true);

    const handleConfirm = () => {
      setConfirmOpen(false);
    };
  
    const handleCancel = () => {
      setConfirmOpen(false);
    };
  return data.map((element) => {
    return (
      <Table.Row key={element.id}>
          <Table.Cell>{element.id}</Table.Cell>
          <Table.Cell>{element.title}</Table.Cell>
          <Table.Cell>{formatDate(element.startDate)}</Table.Cell>
          <Table.Cell>{formatDate(element.endDate)}</Table.Cell>
          <Table.Cell>
            {element.plannedProductionList == null || element.plannedProductionList.length === 0 && <Button positive size="small" fluid onClick={() => {
              saveOptimizedProduction(element.id)
              showConfirm();
              }}> 
              Üretimi Planla
              </Button>}
              <Confirm
                open={confirmOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                content="Planlama işlemi başlatılmıştır. Birkaç dakika içinde işlem tamamlanacak ve 'Planı Gör' butonu görülecektir."
              />
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
                        {renderModalBody([selectedPlan, setSelectedPlan], [selectedAlgorithmKey, setSelectedAlgorithmKey], [methods, setMethods])}
                      </Modal.Description> 
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => {setSelectedAlgorithmKey(null); setOpen(false)}}>Kapat</Button>
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
  const [selectedAlgorithmKey, setSelectedAlgorithmKey] = useState('')
  const [methods, setMethods] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false);

  if(!data){
    getProductionPlans().then(res => {
      setData(res.data);
    }).catch(err => console.log(err))
  }

  if(!methods){
    getMethods().then(res => {
      setMethods(res.data);
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

      <Table.Body>{renderBody(data, [open, setOpen], [selectedPlan, setSelectedPlan], [selectedAlgorithmKey, setSelectedAlgorithmKey], [methods, setMethods],[confirmOpen, setConfirmOpen])}</Table.Body>
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

