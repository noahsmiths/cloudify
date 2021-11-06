import '../App.css';

const ErrorMessage = (props: any) => {
  return (
    <div className="error-box --full-width">
      <p>{props.message}</p>
    </div>
  )
}

export default ErrorMessage;
