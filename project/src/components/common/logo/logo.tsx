import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const';

type LogoProps = {
  isHeader?: boolean;
}

function Logo({isHeader = false} : LogoProps): JSX.Element {
  return (
    <Link
      className={isHeader ? 'header__logo-link' : 'footer__logo-link'}
      to={AppRoute.Root}
    >
      <img
        className={isHeader ? 'header__logo' : 'footer__logo'}
        src="img/logo.svg"
        alt="6 cities logo"
        width={isHeader ? '81' : '64'}
        height={isHeader ? '41' : '33'}
      />
    </Link>
  );
}

export default Logo;
