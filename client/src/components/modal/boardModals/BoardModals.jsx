import React from 'react';
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  FieldArray,
} from 'formik';
import { useBoardContext } from '../../../context/boardsContext';
import * as yup from 'yup';

const initialValues = {
  name: '',
  columns: [{ name: '' }],
};

const validationCreateBoard = yup.object({
  name: yup.string().trim().required('Required'),
  columns: yup.array().of(
    yup.object({
      name: yup.string().required('Required'),
    })
  ),
});

const BoardModals = () => {
  const { createBoard } = useBoardContext();

  return (
    <article>
      <h2>Add New Board</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationCreateBoard}
        onSubmit={createBoard}
      >
        {({ touched, errors, values }) => (
          <FormikForm>
            <div className="form-control">
              <label htmlFor="name">Board Name</label>
              <Field type="text" name="name" id="name" />
              <div>
                <ErrorMessage name="name" component="div" />
              </div>
            </div>
            <FieldArray
              name="columns"
              render={(arrayHelpers) => (
                <div>
                  {values.columns.map((column, index) => {
                    return (
                      <div key={index}>
                        <Field name={`columns[${index}].name`} />
                        <ErrorMessage
                          name={`columns[${index}].name`}
                          component="div"
                        />
                        {values.columns.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            delete
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ name: '' })}
                  >
                    add
                  </button>
                </div>
              )}
            />

            <button type="submit">Create New Board</button>
          </FormikForm>
        )}
      </Formik>
    </article>
  );
};

export default BoardModals;
