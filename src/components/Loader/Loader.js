import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

function Spinner() {
  return (
    <div className={s.loaderContainer}>
      <Loader
        className="Loader"
        type="Plane"
        color="#5F5FF6"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Spinner;
