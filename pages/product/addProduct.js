import { React, useCallback, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Form,
  Icon,
  Loader
} from 'semantic-ui-react';
import Layout from '../layouts/layout';
import {addProduct} from '../../services/productService'
import { useRouter } from 'next/router';
import { getPositions } from '../../services/positionService';
import { getFreeWorkers } from '../../services/employeeService';
import { addProjectPosition } from '../../services/projectPositionService';

let request = false;

const addProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([])
  const [workers, setWorkers] = useState([])

  const router = useRouter();
  if(!positions)
    getPositions().then(res => {setPositions(res.data)}).catch(err => console.log(err));

  if(!workers)
    getFreeWorkers().then(res => {
      setWorkers(res.data)
    }).catch(err => console.log(err));

  const createProduct = useCallback(async (event) => {
    setLoading(true)
    const jsonObject = JSON.stringify({
      title: event.target.title.value,
      strengthMin: event.target.strengthMin.value,
      strengthMax: event.target.strengthMax.value,
    });

    if(!request){
      request = true
      addProduct(jsonObject).then(res => {
        router.push("/product/products")
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
      <Form onSubmit={createProduct}>
        <Form.Input name="title" type="text" label="Ürün Adı" placeholder="Ürün Adı Giriniz" />
        <Form.Group widths='equal'>
          <Form.Input fluid label='Minimum Dayanım' type="number" placeholder='Min' name="strengthMin"/>          
          <Form.Input fluid label='Maximum Dayanım' type="number" placeholder='Max' name="strengthMax"/>
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
