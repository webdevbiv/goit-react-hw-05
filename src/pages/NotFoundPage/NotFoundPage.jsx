import { useNavigate } from 'react-router-dom';
import s from './NotFoundPage.module.scss';
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Click the button below to go back to the homepage.</p>
      <button className={s.button} onClick={() => navigate('/')}>
        Go to Homepage
      </button>
    </div>
  );
};
export default NotFoundPage;
