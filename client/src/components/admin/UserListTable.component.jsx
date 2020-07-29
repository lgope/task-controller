import React from 'react';
import { MDBDataTable } from 'mdbreact';

function UserListTable({ users }) {
  let rowsData = [];

  users.map(user => {
    rowsData.push({
      userName: user.name,
      designation: user.designation,
      email: user.email,
    });
  });
  const data = {
    columns: [
      {
        label: 'User Name',
        field: 'userName',
        sort: 'asc',
        width: 90,
      },
      {
        label: 'Designation',
        field: 'designation',
        sort: 'asc',
        width: 90,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 90,
      },
    ],
    rows: rowsData,
  };

  return <MDBDataTable striped bordered hover small data={data} />;
}

export default UserListTable;
