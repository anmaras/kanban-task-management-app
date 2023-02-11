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
import Spinner from '../../spinner/Spinner';

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

const BoardModals = ({ type }) => {
  const { createBoard, isLoading, activeBoard, editBoard } = useBoardContext();

  const valueEdit = {
    name: activeBoard?.name,
    columns: activeBoard?.columns,
  };

  return (
    <article>
      <h2>{type === 'create' ? 'Add New Board' : 'Edit Board'}</h2>
      <Formik
        initialValues={type === 'create' ? initialValues : valueEdit}
        validationSchema={validationCreateBoard}
        onSubmit={type === 'create' ? createBoard : editBoard}
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

            <button type="submit">
              {isLoading ? (
                <Spinner />
              ) : type === 'create' ? (
                'Create New Board'
              ) : (
                'Save Changes'
              )}
            </button>
          </FormikForm>
        )}
      </Formik>
    </article>
  );
};

export default BoardModals;
