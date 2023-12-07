import { React, useCallback, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Form,
  Icon,
  Loader
} from 'semantic-ui-react';
import Layout from '../layouts/layout';
import {addProject} from '../../services/projectService'
import { useRouter } from 'next/router';
import { getPositions } from '../../services/positionService';
import { getFreeWorkers } from '../../services/employeeService';
import { addProjectPosition } from '../../services/projectPositionService';

let selectedManagerId
let request = false;

const generateBoundInputs = (data) => {
  if(data != undefined)
    return data.map(element => 
        (<div><div className="custom-label">{element.name} Sayısı</div>
          <Form.Group widths='equal'>
            <Form.Input fluid name={'minNumberOf' + element.id} type="number" label="" placeholder="min"/>
            <Form.Input fluid name={'maxNumberOf' + element.id} type="number" label="" placeholder="max"/>
          </Form.Group>
      </div>))     
}

const addProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState(null)
  const [workers, setWorkers] = useState(null)

  const router = useRouter();
  if(!positions)
    getPositions().then(res => {setPositions(res.data)}).catch(err => console.log(err));

  if(!workers)
    getFreeWorkers().then(res => {
      setWorkers(res.data)
    }).catch(err => console.log(err));

  const createProject = useCallback(async (event) => {
    setLoading(true)
    const name = event.target.name.value;
    const plannedStartDate = event.target.plannedStartDate.value;
    const plannedDeliveryDate = event.target.plannedDeliveryDate.value;

    const minMaxValues = [];

    if(positions){
      const target = event.target
      positions.forEach(element => {
        minMaxValues.push({
          key: element.id,
          max: target["maxNumberOf" + element.id].value,
          min: target["minNumberOf" + element.id].value
        })
      });
    }

    const jsonObject = JSON.stringify({
      name: name,
      managerId: selectedManagerId,
      plannedStartDate: plannedStartDate,
      plannedDeliveryDate: plannedDeliveryDate,
      valid: false,
      active: true,
    });
    if(!request){
      request = true
      addProject(jsonObject).then(res => {
        
        minMaxValues.forEach(element => {
          const map = {
            projectId: res.data.id,
            positionId: element.key,
            minWorker: element.min,
            maxWorker: element.max,
          }
          addProjectPosition(map).then(response => {
            request = false; 
            router.push('/project/projects')
          }).catch(err => console.log(err))
        })
      }).catch(err => console.log(err));
   }
  });

  /*
  if(!workers){
    return (    
      <Loader active/>
      );
  }
  */

  return (
    <Layout>
      <Form onSubmit={createProject}>
        <Form.Select label="Ürün Tipi" placeholder='Ürün Tipi Seçiniz' /*options={positions.map(element => {return { key: element.id, value: element.name, text: element.name }})} onChange={(e,data) => {selectedPositionId = (data.options.find(element => (element.value === data.value)).key);}}*/ ></Form.Select>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Miktar (m&#x00B3;)' type="number" placeholder='Miktar Giriniz' name="quantity"/>
          <Form.Input name="plannedDeliveryDate" type="date" label="Planlanan Teslim Tarihi" />
        </Form.Group>
        <Button
          floated="right"
          icon
          labelPosition="left"
          style={{ marginBottom: '2rem' }}
          positive
          type="submit"
        >
          <Icon name="plus"></Icon>
            Projeyi Olustur
        </Button>
      </Form>
    </Layout>
  );
};

export default addProjectForm;
