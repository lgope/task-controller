import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';
import dayjs from 'dayjs';
import ScrollableFeed from 'react-scrollable-feed';

import { connect } from 'react-redux';
import { getTask } from '../../actions/taskActions';
import { submitDiscuss } from '../../actions/discussActions';

const TaskDiscussPage = ({
  id,
  btnName,
  task,
  getTask,
  submitDiscuss,
  discusses,
  error,
}) => {
  const [modal, setModal] = useState(false);
  const [disBody, setDisBody] = useState('');
  const [getNewDis, setGetNewDis] = useState('');
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // todays day
  const day = weekdays[new Date().getDay()];
  // setGetNewDis(task);

  console.log('ddiscusses: ', discusses);

  const callOnClick = () => {
    console.log('on clicked');
    getTask(id);
    toggle();
    setGetNewDis(task);
  };

  // TODO:
  // useEffect(() => {
  //   console.log('useEffect Called!');
  //   getTask(id);
  // }, [discusses]);

  const toggle = () => setModal(!modal);
  const txtBodyChange = e => setDisBody(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const newDiscuss = {
      taskId: id,
      body: disBody,
    };
    submitDiscuss(newDiscuss);

    setDisBody('');

    setGetNewDis(task);
  };

  return (
    <Fragment>
      <Button color='link' onClick={callOnClick}>
        {btnName}
      </Button>
      {task.task ? (
        <Modal isOpen={modal} toggle={toggle} className={'className'}>
          <ModalHeader toggle={toggle}>Discuss Page.</ModalHeader>
          <ModalBody>
            <div className=''>
              <div className='card mt-4' key={task.task._id}>
                <div className='card-body'>
                  <h4 className='card-title'>{task.task.taskName}</h4>

                  <span>Assigned To : {task.task.user}</span>

                  <div className='card-subtitle text-muted mb-2'>
                    <p>
                      Created At :{' '}
                      {dayjs(task.task.createdAt).format(
                        'h:mm a, MMMM DD, YYYY'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          {/* style="overflow-y:auto; height: 850px;" */}

          <div
            className='discusses'
            style={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            <ScrollableFeed>
              {task.discusses.map(dis => (
                <div className='card-body' key={dis._id}>
                  <small>{dis.userEmail}</small>
                  <small>
                    {' '}
                    <Moment fromNow>{dis.createdAt}</Moment>
                  </small>
                  <div className='card-subtitle text-muted mb-0'>
                    <h5>{dis.body}</h5>
                  </div>
                  <hr />
                </div>
              ))}
            </ScrollableFeed>
          </div>
          <ModalFooter>
            <div className='form text-form'>
              {day === 'Fri' ? (
                <textarea rows='4' cols='64' readOnly>
                  It's Friday. Enjoy your Holiday!🎉
                </textarea>
              ) : (
                <form className='pb-4' onSubmit={handleSubmit}>
                  <textarea
                    id='body'
                    name='body'
                    rows='4'
                    cols='64'
                    value={disBody}
                    onChange={txtBodyChange}
                    placeholder='Start Discuss!'
                    required
                  ></textarea>
                  <br />
                  <button type='submit' className='btn btn-primary'>
                    Save
                  </button>
                </form>
              )}
            </div>
          </ModalFooter>
        </Modal>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  task: state.task.task,
  discusses: state.discusses.discusses,
  error: state.error,
});

export default connect(mapStateToProps, { getTask, submitDiscuss })(
  TaskDiscussPage
);

// TODO: Task | discuss delete option
