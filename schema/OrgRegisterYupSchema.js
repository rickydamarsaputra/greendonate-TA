import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('tidak boleh kosong'),
  address: Yup.string().required('tidak boleh kosong'),
  contact: Yup.string().required('tidak boleh kosong'),
  desc: Yup.string().required('tidak boleh kosong'),
});