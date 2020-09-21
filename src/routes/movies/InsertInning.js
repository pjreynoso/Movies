import React, { useState, useEffect } from 'react'
import { isEmpty, includes } from 'lodash'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Transfer, Modal } from 'antd'
import { selectInning } from '../inning/inningSlice'
import { editMovieById } from './movieSlice';

const InsertInning = props => {
  const { visible, handleOk, handleCancel, movie } = props
  const innings = useSelector(selectInning)
  const dispatch = useDispatch()

  const dataInnings = innings.map(e=> {
    return {
      key: e.id,
      id: e.id,
      title: moment(e.hour, 'DD-MM-YYYY HH:mm:ss').format('HH:mm'),
      disabled: !e.state
    }
  })

  const movieInnings = movie.innings
  const movieInningsMap = dataInnings.filter(e => includes(movieInnings, e.id))

  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectKeys] = useState([])

  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);

    if(direction === 'right') {
      let { innings = [] } = movie
      
      if (isEmpty(innings)) {
        innings = innings.concat(nextTargetKeys)
      }

      dispatch(
        editMovieById({ ...movie, innings })
      )
    } else if (direction === 'left') {
      let { innings = [] } = movie
      
      innings = innings.filter(e => includes(moveKeys, e.id))

      dispatch(
        editMovieById({ ...movie, innings })
      )
    }
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  useEffect(() => {
    setTargetKeys(movieInningsMap.map(e => e.key))
  }, [movie])

  return (
    <Modal
      title='Agregando turnos a pelicula'
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        handleCancel()
        setTargetKeys([])
        setSelectKeys([])
      }}
      footer={null}
    >
      <Transfer
        titles={['Turnos', 'Mis Turnos']}
        dataSource={dataInnings}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        render={item => item.title}
        listStyle={{
          width: 300,
          height: 300,
        }}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
      />
    </Modal>
  );
}

export default InsertInning 