import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';

import { getAllUsers } from '../../actions/adminActions';
import UserListTable from './UserListTable.component';
import AddUserForm from './AddUserForm.component';
// import Loading from '../loading/Loading.component';

function UsersInfo({ auth, user, getAllUsers, allUsers, loading, error }) {
  const [isDataChanged, setIsDataChanged] = useState(false);
  console.log('isDataChanged : ', isDataChanged);
  useEffect(() => {
    getAllUsers();
  }, [isDataChanged]);

  if (auth && !auth.user) {
    return <Redirect to='/' />;
  }

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
      {allUsers.users ? (
        <UserListTable users={allUsers.users} />
      ) : (
        <div>Loading</div>
      )}
      <AddUserForm
        buttonLabel={'Add New User'}
        isDataChanged={isDataChanged}
        setIsDataChanged={setIsDataChanged}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  allUsers: state.admin.allUsers,
  loading: state.admin.loading,
  tasks: state.userRoutes.tasks,
  error: state.error,
});

export default connect(mapStateToProps, { getAllUsers })(UsersInfo);

// TODO: add user check any error
