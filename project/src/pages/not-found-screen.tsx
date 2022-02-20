import {Link} from 'react-router-dom';
import {AppRoute} from '../const';

const NotFoundHeaderStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '38px',
  fontWeight: 700,
  fontStyle: 'italic',
  textAlign: 'center',
};


function NotFoundScreen(): JSX.Element {
  return (
    <div>
      <h1 style={NotFoundHeaderStyle}>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      <hr />
      <div className="container">
        <Link className="arrow-circle" to={AppRoute.Root}>Go to main page
          <svg className="arrow-circle-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <g fill="none" stroke="#337AB7" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
              <circle className="arrow-circle-iconcircle" cx="16" cy="16" r="15.12"></circle>
              <path className="arrow-circle-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
