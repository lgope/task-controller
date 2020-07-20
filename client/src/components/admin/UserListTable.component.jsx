import React, { Fragment } from 'react';
// import { connect } from 'react-redux';

import { Table } from 'reactstrap';
import Moment from 'react-moment';
import dayjs from 'dayjs';

function UserListTable({ users }) {
  console.log('all users 22 : ', users);
  let count = 1;
  return (
    <Fragment>
      <Table size='sm' bordered hover>
        <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        {users.map(user => (
          <tbody key={user._id}>
            <tr className='text-center'>
              <th scope='row'>{count++}</th>
              <td>
                {/* <TaskDiscussPage id={task._id} btnName={task.taskName} /> */}
                <p>{user.name}</p>
              </td>
              <td>{user.email}</td>
              <td>
                {dayjs(user.createdAt).format('h:mm a, MMMM DD, YYYY')} |{' '}
                <Moment fromNow>{user.createdAt}</Moment>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  allUsers: state.admin.allUsers,
  error: state.error,
});

// export default connect(mapStateToProps, null)(UserListTable);
export default UserListTable;
