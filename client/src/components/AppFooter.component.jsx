import React from 'react';

const AppFooter = () => {
  return (
    <footer
      className='page-footer font-small white pt-4 text-info'
      style={{ position: 'fixed', height: '65px', bottom: 0, width: '100%' }}
    >
      <div className='container text-center text-md-left'>
        <div className='row d-flex align-items-center'>
          <div className='col-md-7 col-lg-8'>
            <p className='text-center text-md-left text-info'>
              © {new Date().getFullYear()} Copyright:
              <a href='https://lakshmandev.netlify.app/' target='blank'>
                <strong className='text-success'> Lakshman</strong>
              </a>
            </p>
          </div>

          <div className='col-md-5 col-lg-4 ml-lg-0'>
            <div className='text-center text-md-right'>
              <ul className='list-unstyled list-inline'>
                <li className='list-inline-item'>
                  <a
                    href='https://twitter.com/LakshmanGope'
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                    target='blank'
                  >
                    <i className='fab fa-twitter text-info'></i>
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                    href='https://github.com/lgope'
                    target='blank'
                  >
                    <i className='fab fa-github text-info'></i>
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                    href='https://www.linkedin.com/in/lakshman-gope-ba8847154/'
                    target='blank'
                  >
                    <i className='fab fa-linkedin-in text-info'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
