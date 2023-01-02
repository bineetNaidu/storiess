import { FC } from 'react';
import { Formik, Form } from 'formik';
import { Input, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const SearchForm: FC = () => {
  const navigate = useNavigate();
  return (
    <Box flex={0.4}>
      <Formik
        initialValues={{ q: '' }}
        onSubmit={(values) => {
          navigate(`/u?q=${values.q}`);
        }}
      >
        {({ getFieldProps }) => (
          <Form>
            <Input
              variant="outline"
              placeholder="@username"
              {...getFieldProps('q')}
            />
            <button type="submit"></button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
