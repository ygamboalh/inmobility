import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import AxiosInstance from "../../api/AxiosInstance";
import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import { useFormik } from "formik";
import { uploadImage } from "../../api/usersApi";
import * as Yup from 'yup';



const UpLoadImage = () => {

  const { mutate: imageMutation, isLoading, isError, errors } = useMutation(uploadImage);

  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const formik = useFormik({
    initialValues: {
      files: "",
    },
    validationSchema: Yup.object({
      files: Yup.mixed()
        .required("La imagen es requerida!")
        .test(
          "fileSize",
          "Imagen demacido grande!",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Formato de imagen no soportado!",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('ref', 'plugin::users-permissions.user')
      formData.append('refid', 30)
      formData.append('field', 'photo')
      for (let value in values) {
        formData.append(value, values[value]);
      }

      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
        // imageMutation(formData, {
        //   onSuccess: () => {
        //     alert('bieeeeen!')
        //   },
        //   onError: () => {
        //     alert('malllll!');
        //   }
        // });
    }

    },
  });


    // const [image, setImage] = useState('');
    // const ref = 'plugin::users-permissions.user';
    // const refid = 30;
    // const field = 'photo';
    // const files = [];
    // function handleImage (e) {
    //   console.log(e.target.file);  
    //   setImage(e.target.files[0]);
    // }
  
    // function handleAPI () {
    //   const formData = new FormData();
    //   formData.append('image', image);
    //   const response1 = AxiosInstance.post('/upload',formData).then((response) => { 
        
    //   });
    //     //console.log(response);


    //     const response = fetch(`${API}/upload`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "form-data",
    //           Authorization: `${BEARER} ${getToken()}`,
              
    //         },
    //         data: formData,
    //         ref : 'plugin::users-permissions.user',
    //         refid : 30,
    //         field : 'photo',
    //         //files: '../../../assets/images/logo192.png',
    //     });
    //     console.log(response);
      
    // }
    return(

        <div className="profile-photo">
          <form onSubmit={formik.handleSubmit}>
            <input onChange={(event) => {
              formik.setFieldValue("files", event.target.files[0]);
            }}
            name="files" type="file" className="mt-4"/>
            {formik?.errors?.files && formik?.touched?.files && (
          formik?.errors?.files
        )}
          <button type="submit" className="mt-4 text-xl">asasas</button>
          </form>
       </div>
        /*{/* <div class="relative w-24 h-24 border rounded-full overflow-hidden">
            <img src="ruta_de_la_imagen" alt="Foto de perfil" class="w-full h-full object-cover"/>
            <button onClick={handleAPI} class="absolute bottom-0 right-0 bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            <input type="file" className="mt-4" name="image" onChange={handleImage}/>
            </button>
        </div> }*/



       
    )
  };

  export default UpLoadImage;