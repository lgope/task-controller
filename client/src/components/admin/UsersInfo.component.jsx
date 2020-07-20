import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';

import { getAllUsers } from '../../actions/adminActions';
import UserListTable from './UserListTable.component';
import AddUserForm from './AddUserForm.component';

function UsersInfo({ auth, user, getAllUsers, allUsers, error }) {
  console.log('all users : ', allUsers);
  useEffect(() => {
    getAllUsers();
  }, ['']);

  if (user && user.role === 'user') {
    swal(
      'Oops!',
      'This route is only for ADMIN! You are Not allowed ✋',
      'error'
    );
    return <Redirect to='/' />;
  }
  return (
    <div>
      <AddUserForm buttonLabel={'Add New User'} />
      {allUsers.users ? (
        <UserListTable users={allUsers.users} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  allUsers: state.admin.allUsers,
  tasks: state.userRoutes.tasks,
  error: state.error,
});

export default connect(mapStateToProps, { getAllUsers })(UsersInfo);
