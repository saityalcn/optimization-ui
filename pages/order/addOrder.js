import { React, useCallback, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Form,
  Icon,
  Loader
} from 'semantic-ui-react';
import Layout from '../layouts/layout';
import {addOrder} from '../../services/orderService'
import { getProducts } from '../../services/productService';
import { useRouter } from 'next/router';
import { getProductionPlans } from '../../services/productionPlanService';

let request = false;
let selectedPlanId;
let selectedProductId;


const addProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null)
  const [plans, setPlans] = useState(null)
  
  const router = useRouter();
  if(!products)
    getProducts().then(res => {setProducts(res.data)}).catch(err => console.log(err));

  if(!plans)
    getProductionPlans().then(res => {setPlans(res.data)}).catch(err => console.log(err));

  const createOrder = useCallback(async (event) => {
    setLoading(true)

    const jsonObject = JSON.stringify({
      orderQuantity: event.target.quantity.value,
      orderTitle: event.target.title.value,
      product: products.find(element => element.id === selectedProductId),
      productionPlan: plans.find(element => element.id === selectedPlanId)
    });

    if(!request){
      request = true
      addOrder(jsonObject).then(res => {
        router.push("/order/orders");
        console.log(res);
      }).catch(err => console.log(err));
   }
  });

  
  if(!products){
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
      <Form onSubmit={createOrder}>
        <Form.Select label="Üretim Planı" placeholder='Üretim Planı Seçiniz' options={plans.map(element => {return { key: element.id, value: element.title, text: element.title }})} onChange={(e,data) => {selectedPlanId = (data.options.find(element => (element.value === data.value)).key);}}></Form.Select>
        <Form.Select label="Ürün Tipi" placeholder='Ürün Tipi Seçiniz' options={products.map(element => {return { key: element.id, value: element.title, text: element.title }})} onChange={(e,data) => {selectedProductId = (data.options.find(element => (element.value === data.value)).key);}}></Form.Select>
        <Form.Group widths='equal'>
          <Form.Input name="title" type="text" label="Sipariş Başlığı" />
          <Form.Input fluid label='Miktar (m&#x00B3;)' type="number" placeholder='Miktar Giriniz' name="quantity"/>
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
            Olustur
        </Button>
      </Form>
    </Layout>
  );
};

export default addProjectForm;
