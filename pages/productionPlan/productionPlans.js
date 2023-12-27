import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import ProductionPlanTable from './productionPlanTable';
import {
  Header,
} from 'semantic-ui-react';
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
              <ProductionPlanTable></ProductionPlanTable>
        </MainLayout>
    </div>
  );
};
