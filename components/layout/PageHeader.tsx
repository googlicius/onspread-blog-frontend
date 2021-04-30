import { FC } from 'react';

interface IProps {
  heading: string;
  subHeading?: string;
}

export const PageHeader: FC<IProps> = ({ heading, subHeading }) => {
  return (
    <header
      className="masthead"
      style={{ backgroundImage: "url('/assets/img/home-bg.jpg')" }}
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

export default PageHeader;
