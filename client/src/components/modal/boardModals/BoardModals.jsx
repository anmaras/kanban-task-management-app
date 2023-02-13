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
import style from './BoardModals.module.scss';
import { ReactComponent as DeleteIcon } from '../../../assets/icon-cross.svg';

const initialValues = {
  name: '',
  columns: [{ name: '' }],
};

const validationCreateBoard = yup.object({
  name: yup.string().trim().required('Required!'),
  columns: yup.array().of(
    yup.object({
      name: yup.string().required('Required!'),
    })
  ),
});

const BoardModals = ({ type }) => {
  const { createBoard, isLoading, activeBoard, editBoard } = useBoardContext();

  const valuesForEdit = {
    name: activeBoard?.name,
    columns: activeBoard?.columns,
  };

  return (
    <article className={style.modal}>
      <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
        {type === 'create'
          ? 'Add New Board'
          : type === 'addColumn'
          ? 'Add New Column'
          : 'Edit Board'}
      </h2>

      <Formik
        initialValues={type === 'create' ? initialValues : valuesForEdit}
        validationSchema={validationCreateBoard}
        onSubmit={type === 'create' ? createBoard : editBoard}
      >
        {({ touched, errors, values }) => (
          <FormikForm className={style['modal__form']}>
            {type === 'addColumn' ? null : (
              <div className={style['modal__controller']}>
                <label
                  className={[style['modal__label'], 'body-M '].join(' ')}
                  htmlFor="name"
                >
                  Board Name
                </label>
                <Field
                  className={[
                    style[
                      touched.name && errors.name
                        ? 'modal__input--error'
                        : 'modal__input'
                    ],
                    'body-L-dark',
                  ].join(' ')}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g Web Design"
                />
                <div
                  className={[
                    style['modal__error-container'],
                    'body-L-dark--error',
                  ].join(' ')}
                >
                  <ErrorMessage name="name" component="div" />
                </div>
              </div>
            )}

            <FieldArray
              name="columns"
              render={(arrayHelpers) => (
                <section className={style['modal__list-section']}>
                  <h3 className="body-M">Board Columns</h3>
                  <ul className={style['modal__list-container']}>
                    {values.columns.map((column, index) => {
                      //check if there is any error at array fields
                      let error = errors?.columns?.[index];
                      let touch = touched?.columns?.[index];

                      return (
                        <li className={style['modal__list-item']} key={index}>
                          <div className={style['modal__list-item-controller']}>
                            <Field
                              name={`columns[${index}].name`}
                              placeholder="Column Name"
                              className={[
                                style[
                                  error && touch
                                    ? 'modal__list-item-input--error'
                                    : 'modal__list-item-input'
                                ],
                                'body-L-dark',
                              ].join(' ')}
                            />
                            <div
                              className={[
                                style['modal__list-item-error-container'],
                                'body-L-dark--error',
                              ].join(' ')}
                            >
                              <ErrorMessage
                                name={`columns[${index}].name`}
                                component="div"
                              />
                            </div>
                          </div>
                          {values.columns.length > 1 ? (
                            <button
                              className="button--del-icon"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <DeleteIcon />
                            </button>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    className="button button--secondary"
                    type="button"
                    onClick={() => arrayHelpers.push({ name: '' })}
                  >
                    add new column
                  </button>
                </section>
              )}
            />

            <button className="button button--primary-S" type="submit">
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
