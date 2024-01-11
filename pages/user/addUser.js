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
import { registerUser } from '../../services/userService';


const addProjectForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const createUser = useCallback(async (event) => {
    setLoading(true)
    const jsonObject = JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value
    });

    registerUser(jsonObject).then(res => {
      router.push("/user/users")
    }).catch(err => console.log(err));
   
  });

  return (
    <Layout>
      <Form onSubmit={createUser}>
        <Form.Input name="email" type="email" label="E-Posta" placeholder="E-Posta Giriniz" />
        <Form.Input name="password" type="password" label="Şifre" placeholder="Şifre Giriniz" />
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
