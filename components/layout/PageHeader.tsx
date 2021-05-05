import { FC } from 'react';
import PropTypes from 'prop-types';

interface Props {
  heading: string;
  subHeading?: string;
  imageUrl?: string;
}

export const PageHeader: FC<Props> = ({
  heading,
  subHeading,
  imageUrl = '/assets/img/home-bg.jpg',
}) => {
  return (
    <header
      className="masthead"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="site-heading">
              <h1>{heading}</h1>
              <span className="subheading">{subHeading}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default PageHeader;
