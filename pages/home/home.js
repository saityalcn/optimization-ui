import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Header,
} from 'semantic-ui-react';


import EmployeeTable from '../employee/employeeTable';
import ProjectsTable from '../project/projectsTable';
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
        <Header as="h2">Teslim Tarihi Geçen Projeler</Header>
        <ProjectsTable></ProjectsTable>

      </MainLayout>
    </div>
  );
};
