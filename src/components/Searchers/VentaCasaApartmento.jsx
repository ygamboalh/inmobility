import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";

export const VentaCasaApartmento = ({ makeQueries }) => {

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      precio: '',
    },
    onSubmit: (values) => {
      makeQueries(values)
    },
  });

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="precio"
              value="Precio"
            />
          </div>
          <TextInput
            id="precio"
            name="precio"
            type="number"
            onChange={handleChange}
            value={values.precio}
            placeholder="Precio"
          />
        </div>
        <Button type="submit">
          Buscar
        </Button>
      </form>
    </div>
  )
}