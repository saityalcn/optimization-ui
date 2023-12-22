import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Header,
} from 'semantic-ui-react';

import RawMaterialsTable from '../rawMaterial/rawMaterialTable';
import MainLayout from '../layouts/layout';

export default () => {
  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="semantic/dist/semantic.min.css"
      ></link>
      <MainLayout>
        <Header as="h2">Üretim Planları</Header>
        <RawMaterialsTable></RawMaterialsTable>

      </MainLayout>
    </div>
  );
};
