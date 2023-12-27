import { React, useCallback, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Form,
  Icon,
  Loader
} from 'semantic-ui-react';
import Layout from '../layouts/layout';
import { useRouter } from 'next/router';
import { addRawMaterial } from '../../services/rawMaterialService';
import { getRawMaterialInformations } from '../../services/rawMaterialInformationService'
import { getProductionPlans } from '../../services/productionPlanService';

let request = false;
let selectedPlanId;
let selectedInformationId;

const addProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const [informations, setInformations] = useState(null);
  const [plans, setPlans] = useState(null);

  const router = useRouter();

  const createRawMaterial = useCallback(async (event) => {
    setLoading(true)
    const jsonObject = JSON.stringify({
      quantity: event.target.materialQuantity.value,
      productionPlan: plans.find(element => element.id === selectedPlanId),
      information: informations.find(element => element.id === selectedInformationId)
    });

    addRawMaterial(jsonObject).then(res => {
      router.push("/rawMaterial/rawMaterials")
    }).catch(err => console.log(err));
   
  });

  if(!informations)
    getRawMaterialInformations().then(res => {setInformations(res.data)}).catch(err => console.log(err));

  if(!plans)
    getProductionPlans().then(res => {setPlans(res.data)}).catch(err => console.log(err));


  if(!informations){
    return (    
      <Loader active/>
      );
  }

  if(!plans){
    return (    
      <Loader active/>
      );
  }

  return (
    <Layout>
      <Form onSubmit={createRawMaterial}>
        <Form.Select label="Üretim Planı" placeholder='Üretim Planı Seçiniz' options={plans.map(element => {return { key: element.id, value: element.title, text: element.title }})} onChange={(e,data) => {selectedPlanId = (data.options.find(element => (element.value === data.value)).key);}}></Form.Select>
        <Form.Select label="Hammadde Türü" placeholder='Hammadde Türü Seçiniz' options={informations.map(element => {return { key: element.id, value: element.materialName, text: element.materialName }})} onChange={(e,data) => {selectedInformationId = (data.options.find(element => (element.value === data.value)).key);}}></Form.Select>
        <Form.Input name="materialQuantity" type="number" label="Hammadde Miktarı (kg)" placeholder="Hammadde Miktarı Giriniz" />
        <Button
          floated="right"
          icon
          labelPosition="left"
          style={{ marginBottom: '2rem' }}
          positive
          type="submit"
        >
          <Icon name="plus"></Icon>
            Oluştur
        </Button>
      </Form>
    </Layout>
  );
};

export default addProjectForm;
