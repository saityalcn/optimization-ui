import React from 'react';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import 'semantic-ui-css/semantic.min.css';
import {
  Checkbox,
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
const [isChecked, setChecked] = useState(false);
const [isSubmitted, setSubmitted] = useState(false);


const sendLoginRequest = useCallback(async (event) => {
  if (isSending) return

  //console.log("abc");
/*
  if(!isChecked){
    setSubmitted(true);
    console.log("def");
    return;
  }
  */


  setIsSending(true);
  const email = event.target.email.value;
  const password = event.target.password.value;
  const jsonObject = {email: email, password: password};

  login(jsonObject).then(res => {
    //console.log(res);
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
            {isSubmitted && !isChecked && (
              <Message
                icon="exclamation circle"
                header="Kullanım Koşulları ve KVKK Metni"
                content="Uygulamayı kullanabilmek için kullanım koşullarını ve kvkk metinlerini kabul etmeniz gereklidir."
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
              <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "20px", marginBottom: "20px"}}>
                <Checkbox
                  label="Kullanım Koşulları ve KVKK Metnini anladım, onaylıyorum."
                  checked={isChecked}
                  onChange={() => {
                    setChecked(!isChecked);
                    setSubmitted(false);
                  }}
                />
              </div>

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

      <Grid columns={2} relaxed="very" stackable style={{marginTop: "300px"}}>
          <Grid.Column>
            <div>
              <header>
                  <h1>Kullanım Koşulları</h1>
              </header>

              <section>
                  <h2>1. Hizmet Şartları</h2>
                  <p>Üretim Optimizasyonu Şirketi, Platform üzerinden sağlanan hizmetleri kendi takdirine bağlı olarak değiştirme veya sonlandırma hakkına sahiptir.</p>
              </section>

              <section>
                  <h2>2. Hesap Oluşturma ve Güvenlik</h2>
                  <p>Kullanıcılar, hesaplarına yetkisiz erişimi önlemek için gerekli güvenlik önlemlerini almalıdır. Hesap güvenliği konusundaki sorumluluk kullanıcıya aittir.</p>
              </section>

              <section>
                  <h2>3. Fikri Mülkiyet Hakları</h2>
                  <p>Platform üzerindeki tüm içerikler (metinler, görseller, logolar, vb.) Üretim Optimizasyonu Şirketi'nin mülkiyetindedir veya lisans alınmıştır. İzinsiz kullanımı yasaktır.</p>
              </section>

              <section>
                  <h2>4. Gizlilik Politikası</h2>
                  <p>Kullanıcılar, Platformun gizlilik politikasını okumalı ve anlamalıdır. Gizlilik politikası, kullanıcı verilerinin nasıl toplandığı, işlendiği ve paylaşıldığı konusunda bilgi sağlar.</p>
              </section>

              <section>
                  <h2>5. Sorumluluk Reddi</h2>
                  <p>Üretim Optimizasyonu Şirketi, kullanım koşullarının ihlalinden veya Platformun kullanımından kaynaklanan hiçbir zarar veya kayıptan sorumlu değildir.</p>
              </section>

              <section>
                  <h2>6. Değişiklikler ve Güncellemeler</h2>
                  <p>Üretim Optimizasyonu Şirketi, kullanım koşullarını dilediği zaman değiştirme hakkını saklı tutar. Değişiklikler, Platform üzerinden yayımlandığı anda yürürlüğe girer.</p>
              </section>
            </div>
          </Grid.Column>

          <Grid.Column>
            <header>
                <h1>Üretim Optimizasyonu Şirketi - KVKK Bilgilendirme Metni</h1>
            </header>

            <section>
                <h2>1. Veri Sorumlusu</h2>
                <p>Üretim Optimizasyonu Şirketi</p>
            </section>

            <section>
                <h2>2. İletişim Bilgileri</h2>
                <p>Adres: Davutpaşa Mah. Davutpaşa Caddesi 34220, Esenler / İSTANBUL E-posta: sait.yalcin@std.yildiz.edu.tr</p>
            </section>

            <section>
                <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
                <p>Ürün ve üretim bilgileri: Şirketimizin ürün ve üretim süreçleriyle ilgili kayıtların tutulması.Kullanıcı bilgileri (e-posta, hashli şifre): Sisteme giriş ve kimlik doğrulama amaçlarıyla kullanıcı bilgilerinin saklanması.</p>
            </section>

            <section>
                <h2>4. Kişisel Verilerin Toplanma Yöntemleri</h2>
                <p>Ürün ve üretim bilgileri: Şirket içi kaynaklardan ve iş süreçlerinden elde edilen bilgiler.Kullanıcı bilgileri: Kullanıcı tarafından sağlanan e-posta ve şifre bilgileri.</p>
            </section>

            <section>
                <h2>5. İlgili Kişilerin Hakları</h2>
                <p>Kişisel veri sahipleri, KVKK kapsamında kendilerine tanınan haklara sahiptir. Bu haklar arasında kişisel veri talep etme, düzeltme, silme ve işleme itiraz etme gibi haklar bulunmaktadır.</p>
            </section>

            <section>
                <h2>6. Kişisel Verilerin İşlenme Süresi</h2>
                <p>Kişisel veriler, işleme amaçları doğrultusunda gerekli olan süre boyunca saklanacaktır.</p>
            </section>

            <section>
                <h2>7. Kişisel Verilerin Güvenliği</h2>
                <p>Şirketimiz, kişisel verilerin güvenliğini sağlamak için gerekli teknik ve organizasyonel önlemleri almaktadır.</p>
            </section>

            <section>
                <h2>8. KVKK İletişim Yetkilisi</h2>
                <p>Adı Soyadı: Sait Yalçın E-posta: sait.yalcin@std.yildiz.edu.tr </p>
            </section>

          </Grid.Column>
        </Grid>
 
    </div>
  );
}

export default Home;
