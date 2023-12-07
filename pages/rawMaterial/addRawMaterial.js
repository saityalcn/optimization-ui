import {React, useEffect, useState, useCallback} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
    Form,
    Loader,
    Message,
    TextArea
} from 'semantic-ui-react';
import MainLayout from '../layouts/layout';
import { useRouter } from 'next/router';
import {addWorker, assignWorkerToPosition} from '../../services/employeeService'
import {getPositions} from '../../services/positionService'


let selectedPositionId;
let request = false;

export default () => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const router = useRouter();

  const sendAddRawMaterialRequest = useCallback(async (event) => {
    setLoading(true)
    const jsonObject = {
      name: event.target.quantity.value,
      surname: event.target.deliveryDate.value,
    }  
    console.log(jsonObject)
    if(!request){
      addWorker(jsonObject).then(res => {
        console.log(res);
        assignWorkerToPosition(res.data.id).then(res => {
          if(res.data.message === "Worker is not added to project"){
            setLoading(false);
            setShowErrorMessage(true)
          }
          
          else
            router.push('/rawMaterial/rawMaterials');
          
          console.log(res)
        });
      }).catch(err => {
        setLoading(false)
        console.log(err)}
    )}}, []);
  
  /*
  if(!positions)
    getPositions().then(res => setPositions(res.data)).catch(err => console.log(err));
      

  if(loading || positions == null)
    return (<Loader active/>)
    */

  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="semantic/dist/semantic.min.css"
      ></link>
      <MainLayout>
      <Message
      error
      hidden={!showErrorMessage}>Çalışanın ünvanına uygun bir proje bulunamadığı için çalışana proje atanamadı.</Message>
      <Form onSubmit={sendAddRawMaterialRequest}>
        <Form.Select label="Hammadde" placeholder='Hammadde Seçiniz' /*options={positions.map(element => {return { key: element.id, value: element.name, text: element.name }})} onChange={(e,data) => {selectedPositionId = (data.options.find(element => (element.value === data.value)).key);}}*/ ></Form.Select>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Miktar' type="number" placeholder='Miktar Giriniz' name="quantity"/>
          <Form.Input fluid label='Teslim Tarihi' type="date" placeholder='' name="deliveryDate"/>
        </Form.Group>
        <Form.Button type='submit' primary>Ekle</Form.Button>
      </Form>
      </MainLayout>
    </div>
  );
};
