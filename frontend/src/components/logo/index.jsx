import ButtonBase from '@mui/material/ButtonBase';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// project imports
import { APP_DEFAULT_PATH } from '../../config';
import LogoIcon from './LogoIcon';
import Logo from './LogoMain';

export default function LogoSection({ reverse, isIcon, sx, to }) {
  return (
    <ButtonBase disableRipple component={Link} to={to || APP_DEFAULT_PATH} sx={sx}>
      {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
    </ButtonBase>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
