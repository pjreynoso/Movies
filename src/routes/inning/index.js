import React, { useState } from 'react'
import moment from 'moment'
import { TimePicker, Table, Space, Button, Form, Checkbox, Popconfirm, message } from 'antd';
import { maxBy } from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import {  
  createInning,
  editInningById,
  removeInningById,
  selectInning
} from './inningSlice';
import {
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const Inning = props => {
  const innings = useSelector(selectInning);
  const dispatch = useDispatch();
  const [ form ] = Form.useForm()
  const [isVisible, setIsVisible] = useState(false)
  const [inning, setInning] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  console.log(innings,'DATA')


  const handleButtonNew = e => {
    setIsVisible(!isVisible)
    setIsEdit(false)
    form.resetFields()
  }

  const onClickEdit = record => {
    form.setFieldsValue({ ...record, hour: moment(record.hour, 'DD-MM-YYYY HH:mm:ss') })
    setIsEdit(true)
    setIsVisible(true)
    setInning(record)

    console.log("EDITAAA",record)
  }

  const onClickDelete = (e,record) => {
    dispatch(
      removeInningById(record.id)
    )
    message.success('Eliminado correctamente');
    console.log('Eliminado', record)
  }

  const cancelDelete = e => {
    console.log(e);
    message.error('Click on No');
  }

  const tailLayout = {
    wrapperCol: { offset: 2, span: 22 },
  };

  const onFinish = values => {
    if(!isEdit) {
      const { id } = maxBy(innings, 'id') || { id: 0 }

      dispatch(
        createInning({
          id: id + 1,
          hour: moment(values.hour).format('DD-MM-YYYY HH:mm:ss'),
          state: !!values.state
        })
      )
    message.success('Creado correctamente');
    } else {
      dispatch(
        editInningById({
          id: inning.id,
          hour: moment(values.hour).format('DD-MM-YYYY HH:mm:ss'),
          state: values.state
        })
      )
    message.success('Editado correctamente');
    }
    setIsVisible(!isVisible)
    console.log('finish')
  }

  const onFinishFailed = () => {}

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Turno',
      dataIndex: 'hour',
      key: 'hour',
      render : (hour) => {
        console.log(hour,'hola')
        return moment(hour, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')
      }
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        return state === true ? 'Activo' : 'Inactivo'
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const Lock = () => record.state ? <LockOutlined className='space__icon' /> : <UnlockOutlined className='space__icon' />

        return (
          <Space className='space'>
            <EditOutlined className='space__icon' onClick={() => onClickEdit(record)} />
            <Lock />
            <Popconfirm
              title='Desea eliminar este turno?'
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

    return (
      <div>
        <div className='container'>
          <span className='container__title'>Turnos</span>
          <Button onClick={handleButtonNew}>{!isVisible ? 'Nuevo Turno' : 'Regresar'}</Button>
        </div>
        {
          isVisible ? (
              <Form
                style={{ marginTop:'30px'}}
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Hora"
                  name="hour"
                  rules={[{ required: true, message: 'Porfavor ingrese el turno' }]}
                >
                  <TimePicker style={{ width: '200px'}} format='HH:mm'/>
                </Form.Item>
                <Form.Item
                  label="Activo?"
                  name="state"
                  valuePropName='checked'
                >
                  <Checkbox />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    {isEdit ? 'Editar': 'Guardar'}
              </Button>
                </Form.Item>
              </Form>
          ) : (
              <div>
                <Table columns={columns} dataSource={innings} />
              </div>
            )
        }
      </div>
    )
  }

export default Inning 