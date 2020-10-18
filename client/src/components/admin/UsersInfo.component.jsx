import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getAllUsers } from '../../redux/actions/adminActions';
import UserListTable from './UserListTable.component';
import AddUserForm from './AddUserForm.component';

function UsersInfo({ getAllUsers, allUsers }) {
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [isDataChanged, getAllUsers]);


  return (
    <div className='admin-userinfo'>
      <div className='container'>
        {allUsers ? <UserListTable users={allUsers} /> : <div>Loading...</div>}
        <AddUserForm
          buttonLabel={'Add New User'}
          isDataChanged={isDataChanged}
          setIsDataChanged={setIsDataChanged}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  allUsers: state.admin.allUsers,
});

export default connect(mapStateToProps, { getAllUsers })(UsersInfo);

// TODO: add user check any error
