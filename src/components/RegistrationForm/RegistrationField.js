import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Row, FormControl, ErrorContainer } from './RegistrationForm.style';

const RegistrationField = ({ fieldLabel, type, name }) => (
  <Row>
    <FormControl>
      {/* {fieldLabel} */}
      <Field type={type} name={name} placeholder={fieldLabel} />
    </FormControl>
    <ErrorContainer>
      <ErrorMessage name={name} />
    </ErrorContainer>
  </Row>
);

export default RegistrationField;
