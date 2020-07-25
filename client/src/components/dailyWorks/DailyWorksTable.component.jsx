import React from 'react';
import { MDBDataTable } from 'mdbreact';

import dayjs from 'dayjs';

const DailyWorksTable = ({ dailyWorks }) => {
  let rowsData = [];

  const handleProgressChange = e => {
    console.log('pro value 🔔🔔', e.target.value);
    console.log('pro id 🔔', e.target.id);
  };

  dailyWorks.map(da => {
    rowsData.push({
      another: '5%',
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

  return <MDBDataTable striped bordered hover data={data} />;
};

export default DailyWorksTable;
