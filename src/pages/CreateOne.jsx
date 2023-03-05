import React from 'react'
import { useFormik } from 'formik'
import Input from '../components/Input';

const CreateOne = () => {
  const formik = useFormik({
    initialValues: {
      // userId: null,
      province: '',
      price: null,
      footage: null,
      advertiserName: '',
      advertiserPhone: '',
      characteristics: '',
      canton: null,
      district: '',
      maintainingPrice: null,
      advertirserType: null,
      code: null,
      type: null,
      parkingNumber: null,
      law7600: null,
      advertiserEmail: null,
      link: null,
      details: null,
      images: null,
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  })

  return (
    <div className='max-w-[600px] mx-auto' >
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit} >
        <Input
          fieldProp={'province'}
          fieldType={'text'}
          label='Provincia'
          handleChange={formik.handleChange}
          value={formik.values.province}
        />
        <Input
          fieldProp={'price'}
          fieldType={'text'}
          label='Precio'
          placHlder='Precio'
          handleChange={formik.handleChange}
          value={formik.values.price}
        />
        <Input
          fieldProp={'footage'}
          fieldType={'text'}
          label='Área del terreno'
          handleChange={formik.handleChange}
          value={formik.values.footage}
        />
        <Input
          fieldProp={'advertiserName'}
          fieldType={'text'}
          label='Nombre del Anunciante'
          handleChange={formik.handleChange}
          value={formik.values.advertiserName}
        />
        <Input
          fieldProp={'advertiserPhone'}
          fieldType={'text'}
          label='Número telefónico del Anunciante'
          handleChange={formik.handleChange}
          value={formik.values.advertiserPhone}
        /><Input
          fieldProp={'characteristics'}
          fieldType={'text'}
          label='characteristics'
          handleChange={formik.handleChange}
          value={formik.values.characteristics}
        /><Input
          fieldProp={'canton'}
          fieldType={'text'}
          label='Cantón'
          handleChange={formik.handleChange}
          value={formik.values.canton}
        /><Input
          fieldProp={'district'}
          fieldType={'text'}
          label='Distrito'
          handleChange={formik.handleChange}
          value={formik.values.district}
        /><Input
          fieldProp={'maintainingPrice'}
          fieldType={'text'}
          label='Monto de mantenimiento'
          handleChange={formik.handleChange}
          value={formik.values.maintainingPrice}
        /><Input
          fieldProp={'advertirserType'}
          fieldType={'text'}
          label='Tipo de anunciante'
          handleChange={formik.handleChange}
          value={formik.values.advertirserType}
        /><Input
          fieldProp={'code'}
          fieldType={'text'}
          label='Código de Propiedad'
          handleChange={formik.handleChange}
          value={formik.values.code}
        /><Input
          fieldProp={'type'}
          fieldType={'text'}
          label='Tipo de inmueble'
          handleChange={formik.handleChange}
          value={formik.values.type}
        /><Input
          fieldProp={'parkingNumber'}
          fieldType={'text'}
          label='parkingNumber'
          handleChange={formik.handleChange}
          value={formik.values.parkingNumber}
        /><Input
          fieldProp={'law7600'}
          fieldType={'text'}
          label='Ley 7600'
          handleChange={formik.handleChange}
          value={formik.values.law7600}
        /><Input
          fieldProp={'advertiserEmail'}
          fieldType={'text'}
          label='Correo electrónico del Anunciante'
          handleChange={formik.handleChange}
          value={formik.values.advertiserEmail}
        /><Input
          fieldProp={'link'}
          fieldType={'text'}
          label='URL del Sitio Web o página del Anunciante'
          handleChange={formik.handleChange}
          value={formik.values.link}
        /><Input
          fieldProp={'details'}
          fieldType={'text'}
          label='Apuntes especiales para Asesores Inmobiliarios'
          handleChange={formik.handleChange}
          value={formik.values.details}
        /><Input
          fieldProp={'images'}
          fieldType={'text'}
          label='URL del álbum de fotos'
          handleChange={formik.handleChange}
          value={formik.values.images}
        />
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Registrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateOne