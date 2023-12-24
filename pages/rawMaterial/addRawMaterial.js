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

let request = false;

const addProjectForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const createRawMaterial = useCallback(async (event) => {
    setLoading(true)
    const jsonObject = JSON.stringify({
      materialName: event.target.materialName.value
    });

    addRawMaterial(jsonObject).then(res => {
      router.push("/rawMaterial/rawMaterials")
    }).catch(err => console.log(err));
   
  });

  return (
    <Layout>
      <Form onSubmit={createRawMaterial}>
        <Form.Input name="materialName" type="text" label="Hammadde Adı" placeholder="Hammadde Adı Giriniz" />
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
