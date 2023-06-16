import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().email('email tidak valid').required('tidak boleh kosong'),
  password: Yup.string().min(6, 'harus lebih dari 6 karakter').required('tidak boleh kosong'),
});