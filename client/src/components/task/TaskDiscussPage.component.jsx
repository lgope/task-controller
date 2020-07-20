import React, { useState, useEffect, Fragment, useCallback } from 'react';
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
  const [disBody, setDisBody] = useState(null);
  const [getNewDis, setGetNewDis] = useState(false);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // todays day
  const day = weekdays[new Date().getDay()];

  // console.log('ddiscusses: ', discusses);
  // console.log('taskkkkkk: ', task);
  // console.log('idddddddddddddddd', id);

  const callOnClick = () => {
    // console.log('on clicked');
    // setSid(id);
    // getTask(disTaskId); // TODO: REmove for test auto call funtion
    toggle();
    // setAllTasks(task);
    // setGetNewDis(!getNewDis);
    setGetNewDis(!getNewDis);
  };

  // (function () {
  //   // do some stuff
  //   taskSetFunc = setTimeout(function () {
  //     if (disTaskId) {
  //       getTask(disTaskId);
  //     }
  //   }, 10000);
  // })();

  // const closeClick = () => {
  //   setDisTaskId(null);
  //   clearTimeout(taskSetFunc);
  //   toggle();
  // };
  // const closeAll = () => {
  //   setModal(!modal);
  // };

  // TODO:

  useEffect(() => {
    getTask(id);
  }, [getNewDis]);

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

    setGetNewDis(!getNewDis);
  };

  return (
    <Fragment>
      <Button color='link' onClick={callOnClick}>
        {btnName}
      </Button>
      {task.task ? (
        <Modal isOpen={modal} toggle={toggle}>
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
// TODO: discuss form auto update (real time discuss | comment)
