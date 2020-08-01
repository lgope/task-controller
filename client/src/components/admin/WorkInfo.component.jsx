import React from 'react';
import { MDBDataTable } from 'mdbreact';

import dayjs from 'dayjs';

const DailyWorksTable = ({ dailyWorks }) => {
  let rowsData = [];

  // storing daily works data in rows data
  dailyWorks.forEach(da =>
    rowsData.push({
      userName: da.userName,
      date: dayjs(da.date).format('MMMM DD YYYY'),
      title: da.title,
      description: da.description,
    })
  );

  const data = {
    columns: [
      {
        label: 'User Name',
        field: 'userName',
        sort: 'asc',
        width: 90,
        height: 40,
        overflowY: 'scroll',
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 90,
        height: 40,
        overflowY: 'scroll',
      },
      {
        label: 'Daily work Title',
        field: 'title',
        sort: 'asc',
        width: 100,
        height: 40,
        overflowY: 'scroll',
      },
      {
        label: 'Des',
        field: 'description',
        sort: 'asc',
        width: 270,
      },
    ],
    rows: rowsData,
  };

  return (
    <MDBDataTable
      striped
      bordered
      hover
      small
      scrollY
      maxHeight='550px'
      data={data}
    />
  );
};

export default DailyWorksTable;
