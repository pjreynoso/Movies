import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { maxBy } from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import { DatePicker, Modal, Button, Form, Input, Select, message } from 'antd';
import {  
  createMovie,
  editMovieById,
  selectMovie
} from './movieSlice';

const { Option } = Select;

const UpsertMovie = props => {
  const movies = useSelector(selectMovie);
  const { visible, handleOk, handleCancel, movie } = props
  const closeModal = () => {
    form.resetFields()
    handleCancel()
  }
  const [ titleModal, setTitleModal ] = useState('Nueva Pelicula')

  const [ form ] = Form.useForm()

  const dispatch = useDispatch();

  const onFinish = values => {
    const { id } = maxBy(movies, 'id') || { id: 0 }
    if(isEmpty(movie)) {
    dispatch(
      createMovie({
        id: id + 1,
        name: values.name,
        releaseDate: values.releaseDate.format('DD-MM-YYYY'),
        state: values.state
      })
    )
     message.success('Creado correctamente');
    } else {
      dispatch(
        editMovieById({
          id: movie.id,
          name: values.name,
          releaseDate: values.releaseDate.format('DD-MM-YYYY'),
          state: values.state
        })
      )
     message.success('Editado correctamente');
    }
    form.resetFields()
    closeModal()
  }

  const onFinishFailed = () => { }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    if (!isEmpty(movie)) {
      form.setFieldsValue({ ...movie, releaseDate: moment(movie.releaseDate || new Date(), 'DD-MM-YYYY') })
      setTitleModal('Editando Pelicula')
    } else {
      form.resetFields()
      setTitleModal('Creando Pelicula')
    }
  }, [movie])

  return (
    <Modal
      title={titleModal}
      visible={visible}
      onOk={handleOk}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        {...layout}
        name="basic"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nombre de Película"
          name="name"
          rules={[{ required: true, message: 'Porfavor ingrese nombre' }]}
        >
          <Input placeholder="Ingrese nombre" />
        </Form.Item>

        <Form.Item
          label="Fecha de Publicación"
          name="releaseDate"
          rules={[{ required: true, message: 'Porfavor ingrese fecha de publicación' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format={'DD-MM-YYYY'}
            placeholder="Ingrese fecha de publicación"
          />
        </Form.Item>

        <Form.Item name="state" label="Estado" rules={[{ required: true, message: 'Porfavor seleccione estado' }]}>
          <Select
            placeholder="Seleccione"
            allowClear
          >
            <Option value="A">Activo</Option>
            <Option value="I">Inactivo</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Guardar
            </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpsertMovie