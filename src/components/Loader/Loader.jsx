import { Puff } from 'react-loader-spinner';
// import PropTypes from 'prop-types';

export const Loader = () => (
  <div className="loader">
    <Puff
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      wrapperStyle={{ margin: '0 auto' }}
      // visible={visible}
    />
  </div>
);

export default Loader;

// Loader.propTypes = {
//   visible: PropTypes.bool.isRequired,
// };
