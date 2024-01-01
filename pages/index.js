import React from 'react';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import 'semantic-ui-css/semantic.min.css';
import {
  Segment,
  Grid,
  Form,
  Divider,
  Button,
  Card,
  Icon,
  Header,
  PopupContent,
  Message,
} from 'semantic-ui-react';

import {login} from "../services/userService"

const description = 'Lütfen Sistem Yöneticinizle İletişime Geçiniz.';

let wrongInfoError = false;


function Home() {
const [isSending, setIsSending] = useState(false);
const router = useRouter();
const sendLoginRequest = useCallback(async (event) => {
  if (isSending) return

  setIsSending(true);
  const email = event.target.email.value;
  const password = event.target.password.value;
  const jsonObject = {email: email, password: password};

  login(jsonObject).then(res => {
    console.log(res);
    if(res.data && res.data.email){
      jsCookie.set('email', res.data.email);
  
      return router.push('/home/home');
    }
  
    else
      wrongInfoError = true;
  }).catch(err => console.log(err));

  setIsSending(false)
}, []);

  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="semantic/dist/semantic.min.css"
      ></link>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            {wrongInfoError && (
              <Message
                icon="exclamation circle"
                header="Şifre veya E-Posta Yanlış"
                content="Girdiğiniz şifre veya e-posta yanlış. Tekrar deneyiniz"
                error
              />
            )}
            <Form onSubmit={sendLoginRequest}>
              <Form.Input
                icon="mail"
                iconPosition="left"
                name="email"
                label="E-Posta"
                placeholder="E-Posta"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                name="password"
                label="Şifre"
                type="password"
              />

              <Button primary loading={isSending} fluid type="submit">
                Giriş
              </Button>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Card centered>
              <Card.Content header="Kayıt İçin" />
              <Card.Content description={description} />
            </Card>
          </Grid.Column>
        </Grid>

        <Divider vertical>VEYA</Divider>
      </Segment>
    </div>
  );
}

export default Home;
