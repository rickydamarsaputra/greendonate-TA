import * as Yup from 'yup';

export default Yup.object().shape({
  resi: Yup.string().required('tidak boleh kosong'),
  desc: Yup.string().required('tidak boleh kosong'),
});