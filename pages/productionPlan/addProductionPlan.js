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
import { addProductionPlan } from '../../services/productionPlanService';


const addProjectForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const createProductionPlan = useCallback(async (event) => {
    setLoading(true)
    const jsonObject = JSON.stringify({
      title: event.target.title.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value
    });

    addProductionPlan(jsonObject).then(res => {
      router.push("/productionPlan/productionPlans")
    }).catch(err => console.log(err));
   
  });

  return (
    <Layout>
      <Form onSubmit={createProductionPlan}>
        <Form.Input name="title" type="text" label="Başlık" placeholder="Başlık Giriniz" />
        <Form.Group widths='equal'>
          <Form.Input name="startDate" type="date" label="Başlangıç Tarihi" placeholder="" />
          <Form.Input name="endDate" type="date" label="Bitiş Tarihi" placeholder="" />
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
            Oluştur
        </Button>
      </Form>
    </Layout>
  );
};

export default addProjectForm;
