import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <span>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/dashboard" activeClassName="active">Dashboard</Link>
      {" | "}
      <Link to="/stdItems" activeClassName="active">Standard Items</Link>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </span>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
