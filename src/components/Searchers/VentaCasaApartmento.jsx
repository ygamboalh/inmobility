import { Button, Label, TextInput, Dropdown } from "flowbite-react";
import { useFormik } from "formik";

export const VentaCasaApartmento = ({ makeQueries }) => {

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      price: '',
      province: ''
    },
    onSubmit: (values) => {
      makeQueries(values)
    },
  });

  return (
    <div className=" mx-5 md:mx-40 xl:mx-auto xl:w-1/4" >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <div>
          <div className="mb-2 block">
            <Label
              htmlhtmlFor="price"
              value="Precio"
            />
          </div>
          <TextInput
            id="price"
            name="price"
            type="number"
            onChange={handleChange}
            value={values.price}
            placeholder="Precio"
          />
        </div>

        <div className="flex flex-row justify-between" >
          <select className="rounded-xl" name="province" id="province" value={values.province} onChange={handleChange} >
            <option value='' >Provincia</option>
            <option value='Alajuela' >Alajuela</option>
            <option value='Cartago' >Cartago</option>
            <option value='Heredia' >Heredia</option>
            <option value='Limón' >Limón</option>
            <option value='Puntarenas' >Puntarenas</option>
            <option value='San José' >San José</option>
          </select>
        </div>
        <Button type="submit">
          Buscar
        </Button>
      </form>
    </div>
  )
}