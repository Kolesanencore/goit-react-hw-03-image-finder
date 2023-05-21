import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

import css from './Loader.styled.module.css';

export const Loader = ({ visible }) => (
  <div className={css.loader}>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#7e3fb5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </div>
);

export default Loader;

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
