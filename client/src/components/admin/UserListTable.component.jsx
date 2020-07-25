import React, { Fragment } from 'react';
import { MDBDataTable } from 'mdbreact';

import { Table } from 'reactstrap';
import Moment from 'react-moment';
import dayjs from 'dayjs';

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

const mapStateToProps = state => ({
  allUsers: state.admin.allUsers,
  error: state.error,
});

// export default connect(mapStateToProps, null)(UserListTable);
export default UserListTable;
