import * as Yup from 'yup';

export default Yup.object().shape({
  fullname: Yup.string().required('tidak boleh kosong'),
  address: Yup.string().required('tidak boleh kosong'),
  phone_number: Yup.string().required('tidak boleh kosong'),
  email: Yup.string().email('email tidak valid').required('tidak boleh kosong'),
  password: Yup.string().min(6, 'harus lebih dari 6 karakter').required('tidak boleh kosong'),
});