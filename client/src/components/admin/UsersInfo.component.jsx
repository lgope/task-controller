import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getAllUsers } from '../../actions/adminActions';
import UserListTable from './UserListTable.component';
import AddUserForm from './AddUserForm.component';

function UsersInfo({ isAuthenticated, user, getAllUsers, allUsers }) {
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [isDataChanged]);

  if ((user && user.role === 'user') || isAuthenticated === false) {
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
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  allUsers: state.admin.allUsers,
  tasks: state.userRoutes.tasks,
});

export default connect(mapStateToProps, { getAllUsers })(UsersInfo);

// TODO: add user check any error
