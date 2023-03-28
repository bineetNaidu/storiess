import { FC } from 'react';
import { Formik, Form } from 'formik';
import { Input, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const SearchForm: FC = () => {
  const router = useRouter();
  return (
    <Box flex={0.4}>
      {/* <Formik
        initialValues={{ q: '' }}
        onSubmit={(values) => {
          router.push(`/user?q=${values.q}`);
        }}
      >
        {({ getFieldProps }) => (
          <Form>
            <Input
              variant="outline"
              placeholder="@username"
              {...getFieldProps('q')}
            />
            <button type="submit" hidden></button>
          </Form>
        )}
      </Formik> */}
      <Input
        variant="outline"
        placeholder="@username"
        // {...getFieldProps('q')}
      />
    </Box>
  );
};
