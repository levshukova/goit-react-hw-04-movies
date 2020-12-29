import errorImage from '../../images/empty-search.svg';
import s from './NotFoundView.module.css';

export default function NotFoundView() {
  return (
    <div className={s.wrapper}>
      <img
        src={errorImage}
        width="250"
        alt="nothing-found"
        style={{ marginTop: 50, width: 400 }}
      ></img>
    </div>
  );
}
