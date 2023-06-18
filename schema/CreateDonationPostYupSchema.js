import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('tidak boleh kosong'),
  desc: Yup.string().required('tidak boleh kosong'),
  required_amount: Yup.string().required('tidak boleh kosong'),
  goods_criteria: Yup.string().required('tidak boleh kosong'),
});