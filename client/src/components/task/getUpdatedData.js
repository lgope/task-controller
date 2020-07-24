exports.getUpdateData = () => {

    tasks.map(task => {
      rowsData.push({
        taskName: task.taskName,
        pro_search: task.progress,
        progress: (
          <select
            className='selectpicker'
            style={{ border: '0' }}
            data-size='10'
            data-style='btn-info'
            id={task._id}
            onChange={handleProgressChange}
          >
            <option>{task.progress}</option>
            <option value='5%'>5%</option>
            <option value='10%'>10%</option>
            <option value='15%'>15%</option>
            <option value='20%'>20%</option>
            <option value='25%'>25%</option>
            <option value='30%'>30%</option>
            <option value='35%'>35%</option>
            <option value='40%'>40%</option>
            <option value='45%'>45%</option>
            <option value='50%'>50%</option>
            <option value='55%'>55%</option>
            <option value='60%'>60%</option>
            <option value='65%'>65%</option>
            <option value='70%'>70%</option>
            <option value='75%'>75%</option>
            <option value='80%'>80%</option>
            <option value='85%'>85%</option>
            <option value='90%'>90%</option>
            <option value='95%'>95%</option>
            <option value='100%'>100%</option>
          </select>
        ),
      });
    return data;
}