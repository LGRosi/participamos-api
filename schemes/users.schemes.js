import yup from 'yup';

const userScheme = yup.object({
   name: yup.string().required("El nombre es requerido"),
   email: yup.string().email("El email no es válido").required("El email es requerido"),
   password: yup.string().required("La contraseña es requerida")
}).noUnknown()

const loginScheme = yup.object({
   email: yup.string().email("El email no es válido"),
   password: yup.string().required("La contraseña es requerida")
})


export {
   userScheme,
   loginScheme
}