import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { useBoardContext } from '../../../context/boardsContext';
import { useModalContext } from '../../../context/modalsContext';
import * as yup from 'yup';
import { Spinner } from '../../index';
import style from '../boardModals/BoardModals.module.scss';
import { ReactComponent as DeleteIcon } from '../../../assets/icon-cross.svg';
import { useUserContext } from '../../../context/userContext';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, 'Name need to be at least 3 chars')
    .max(20, 'Name cant be more than 20 chars')
    .required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
});

const EditAccountModal = () => {
  const { isLoading } = useBoardContext();
  const { user, updateUser, isLoading: loading } = useUserContext();
  const { closeModals } = useModalContext();

  const valuesForEdit = {
    name: user.name,
    email: user.email,
  };

  return (
    <article className={style.modal}>
      <div className={style['modal__title-container']}>
        <h2 className={[style['modal__title'], 'heading-L'].join(' ')}>
          Edit Account
        </h2>
        <button
          className="button--del-icon"
          type="button"
          onClick={closeModals}
        >
          <DeleteIcon />
        </button>
      </div>
      <Formik
        initialValues={valuesForEdit}
        validationSchema={schema}
        onSubmit={updateUser}
      >
        {({ touched, errors }) => (
          <FormikForm className={style['modal__form']}>
            <div className={style['modal__controller']}>
              <label
                className={[style['modal__label'], 'body-M '].join(' ')}
                htmlFor="name"
              >
                Name
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

            {/* EMAIL */}

            <div className={style['modal__controller']}>
              <label
                className={[style['modal__label'], 'body-M '].join(' ')}
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className={[
                  style[
                    touched.email && errors.email
                      ? 'modal__input--error'
                      : 'modal__input'
                  ],
                  'body-L-dark',
                ].join(' ')}
                type="email"
                name="email"
                id="email"
              />
              <div
                className={[
                  style['modal__error-container'],
                  'body-L-dark--error',
                ].join(' ')}
              >
                <ErrorMessage name="email" component="div" />
              </div>
            </div>
            <button className="button button--primary-S" type="submit">
              {loading ? <Spinner /> : 'Save Changes'}
            </button>
          </FormikForm>
        )}
      </Formik>
    </article>
  );
};

export default EditAccountModal;
