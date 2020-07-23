import React from 'react';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import dayjs from 'dayjs';

const DailyWorksTable = ({ dailyWorks }) => {
  let rowsData = [];

  dailyWorks.map(da => {
    rowsData.push({
      date: dayjs(da.date).format('MMMM DD YYYY'),
      title: da.title,
      description: da.description,
    });
  });

  const data = {
    columns: [
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Daily work Title',
        field: 'title',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Des',
        field: 'description',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: rowsData,
  };

  //   console.log('table: ', dailyWorks);

  return <MDBDataTable striped bordered small hover data={data} />;
};

export default DailyWorksTable;
