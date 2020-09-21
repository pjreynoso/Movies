import React, { useState } from 'react'
import { Button, Space, Table, Popconfirm, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMovie,
  removeMovieById
} from './movieSlice';
import {
  EditOutlined,
  MenuUnfoldOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import './styles.css'
import UpsertMovie from './UpsertMovie'
import InsertInning from './InsertInning'


function Movies() {
  const movies = useSelector(selectMovie);

  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleInsert, setVisibleInsert] = useState(false)

  const [movie, setMovie ] = useState({})

  const dispatch = useDispatch();

  const onClickDelete = (e,record) => {
    dispatch(
      removeMovieById(record.id)
    )
    message.success('Eliminado correctamente');
    console.log('Eliminado', record)
  }

  const cancelDelete = e => {
    console.log(e);
    message.error('Click on No');
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'F. Publicación',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        return text === 'A' ? 'Activo' : 'Inactivo'
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const Lock = () => record.state === 'A' ? <LockOutlined className='space__icon' /> : <UnlockOutlined className='space__icon' />

        return (
          <Space className='space'>
            <EditOutlined className='space__icon' 
              onClick={() => {
                setMovie(record)
                setVisibleModal(true)}}
            />
            <MenuUnfoldOutlined className='space__icon'
              onClick={() =>{
                setMovie(record)
                setVisibleInsert(true)
              }}
            />
            <Lock />
              <Popconfirm
                title='Desea eliminar esta pelicula?'
                onConfirm={(e) => onClickDelete(e, record)}
                onCancel={cancelDelete}
                okText="Yes"
                cancelText="No">
                <DeleteOutlined className='space__icon' />
              </Popconfirm>
          </Space>
        )
      },
    },
  ];

  const dataSource = movies.map(e => ({ ...e, key: e.id}))
  return (
    <div>
      <div className='container'>
        <span className='container__title'>Pel&iacute;culas</span>
        <Button 
          onClick={() => {
            setVisibleModal(true)
            setMovie({})
          }}
          >
            Agregar pel&iacute;cula
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
      <div>
        <UpsertMovie 
          visible={visibleModal} 
          movie={movie}
          handleCancel={() => { 
            setVisibleModal(!visibleModal) 
            setMovie({})
          }} 
          />
      </div>
      <div>
        <InsertInning 
          visible={visibleInsert} 
          movie={movie}
          handleCancel={() => { 
            setMovie({})
            setVisibleInsert(!visibleInsert)
          }} 
        />
      </div>
    </div>
  );
}

export default Movies
