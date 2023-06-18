import * as Yup from 'yup';

export default Yup.object().shape({
  fullname: Yup.string().required('tidak boleh kosong'),
  address: Yup.string().required('tidak boleh kosong'),
  phone_number: Yup.string().required('tidak boleh kosong'),
});