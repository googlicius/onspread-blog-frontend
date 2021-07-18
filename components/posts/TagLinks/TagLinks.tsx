import PropTypes from 'prop-types';
import Link from 'next/link';
import map from 'lodash/map';
import { Tag } from '@/graphql/generated';

interface Props {
  tags?: Tag[];
  className?: string;
}
const TagLinks = ({ tags = [], className = '' }: Props) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={`d-flex ${className}`}>
      {map(tags, (tag, index) => {
        return (
          <Link key={index} href={`/tag/${tag.slug}`}>
            <a className="btn btn-link pl-0 pr-3">#{tag.slug}</a>
          </Link>
        );
      })}
    </div>
  );
};

TagLinks.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
};

export default TagLinks;
