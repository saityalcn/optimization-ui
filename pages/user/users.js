import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import UserTable from './userTable';
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
              <Header as="h2">Kullanıcılar</Header>
              <UserTable></UserTable>
        </MainLayout>
    </div>
  );
};
