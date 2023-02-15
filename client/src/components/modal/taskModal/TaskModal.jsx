import React, { useState } from 'react';
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
import style from '../boardModals/BoardModals.module.scss';
import { ReactComponent as DeleteIcon } from '../../../assets/icon-cross.svg';
import { ReactComponent as ArrowUp } from '../../../assets/icon-chevron-down.svg';

const validationCreateBoard = yup.object({
  title: yup.string().trim().required('Required!'),
  subtasks: yup.array().of(
    yup.object({
      title: yup.string().required('Required!'),
    })
  ),
});

const BoardModals = ({ type }) => {
  const { isLoading, activeBoard, addNewTask } = useBoardContext();
  const [selectListVisible, setSelectVisible] = useState(false);
  const [status, setStatus] = useState(activeBoard?.columns[0].name);

  const initialValues = {
    title: '',
    description: '',
    subtasks: [{ title: '' }],
    status: status,
    columnId: activeBoard?.columns[0]._id,
  };

  // Toggle custom options list visibility

  const handleSelectList = () => {
    setSelectVisible(!selectListVisible);
  };

  // const valuesForEdit = {
  //   title: activeBoard?.name,
  //   columns: activeBoard?.columns,
  // };

  return (
    <article className={style.modal}>
      {/* MODAL TITLE */}

      <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
        Add New Task
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationCreateBoard}
        onSubmit={addNewTask}
      >
        {/*TITLE AND DESCRIPTION FIELDS  */}

        {({ touched, errors, values, setValues }) => (
          <FormikForm className={style['modal__form']}>
            {/* TITLE FIELD */}

            <>
              <div className={style['modal__controller']}>
                <label
                  className={[style['modal__label'], 'body-M '].join(' ')}
                  htmlFor="title"
                >
                  Title
                </label>
                <Field
                  className={[
                    style[
                      touched.title && errors.title
                        ? 'modal__input--error'
                        : 'modal__input'
                    ],
                    'body-L-dark',
                  ].join(' ')}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="e.g Take a coffee break"
                />
                <div
                  className={[
                    style['modal__error-container'],
                    'body-L-dark--error',
                  ].join(' ')}
                >
                  <ErrorMessage name="title" component="div" />
                </div>
              </div>

              {/* TEXTAREA */}

              <div className={style['modal__controller']}>
                <label
                  className={[style['modal__label'], 'body-M '].join(' ')}
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  component="textarea"
                  className={[style['modal__textarea'], 'body-L-dark'].join(
                    ' '
                  )}
                  type="text"
                  name="description"
                  id="description"
                  rows="3"
                />
              </div>
            </>

            {/* SUBTASKS ARRAY FIELDS */}

            <FieldArray
              name="subtasks"
              render={(arrayHelpers) => (
                <section className={style['modal__list-section']}>
                  <h3 className="body-M">SubTasks</h3>
                  <ul className={style['modal__list-container']}>
                    {values.subtasks.map((column, index) => {
                      //check if there is any error at array fields
                      let error = errors?.subtasks?.[index];
                      let touch = touched?.subtasks?.[index];

                      return (
                        <li className={style['modal__list-item']} key={index}>
                          <div className={style['modal__list-item-controller']}>
                            <Field
                              name={`subtasks[${index}].title`}
                              placeholder="Subtask name"
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
                                name={`subtasks[${index}].title`}
                                component="div"
                              />
                            </div>
                          </div>

                          <button
                            className="button--del-icon"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <DeleteIcon />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    className="button button--secondary"
                    type="button"
                    onClick={() => arrayHelpers.push({ title: '' })}
                  >
                    add new subtask
                  </button>
                </section>
              )}
            />

            {/* DROPDOWN  SELECT*/}

            <section className={style['modal__dropdown-container']}>
              <div className={style['modal__controller']}>
                <label
                  htmlFor="status"
                  className={[style['modal__label'], 'body-M '].join(' ')}
                >
                  Status
                </label>
                <div
                  onClick={handleSelectList}
                  tabIndex="0"
                  className={[style['modal__select-input'], 'body-L-dark'].join(
                    ' '
                  )}
                >
                  {status}
                  <span
                    className={
                      selectListVisible
                        ? style['modal__arrowUp']
                        : style['modal__arrowDown']
                    }
                  >
                    <ArrowUp />
                  </span>
                </div>

                {/* DROPDOWN  OPTION LIST*/}

                {selectListVisible ? (
                  <ul className={style['modal__select-list']}>
                    {activeBoard?.columns.map((column) => {
                      const { name, _id } = column;
                      return (
                        <li
                          //field values are passed through formik setValues
                          //otherwise status field cannot be updated with custom select and options
                          onClick={() => {
                            setValues({
                              ...values,
                              status: name,
                              columnId: _id,
                            });
                            setStatus(name);
                            handleSelectList();
                          }}
                          className={style['modal__option']}
                          key={_id}
                        >
                          {name}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </section>

            {/* SUBMIT BUTTON */}

            <button className="button button--primary-S" type="submit">
              {isLoading ? (
                <Spinner />
              ) : type === 'addTask' ? (
                'Create New Task'
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
