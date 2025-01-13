import css from './ErrorMessage.module.css';
const ErrorMessage = () => {
  return (
    <>
      <h3 className={css.error}>Something went wrong!!! Try again</h3>
    </>
  );
};

export default ErrorMessage;
