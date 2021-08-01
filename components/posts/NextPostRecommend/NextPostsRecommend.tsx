import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Enum_Subscription_Collectionname, Post } from '@/graphql/generated';
import cs from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import PostPreview from '../PostPreview';
import FollowButton from '@/components/FollowButton';

interface Props {
  post: Post;
}

const NextPostsRecommend = ({ post }: Props) => {
  const { nextPost, story } = post;
  const { t } = useTranslation();

  return (
    <div className={cs(styles['next-post-wrapper'], 'py-5')}>
      <Container>
        <Row>
          <Col lg={8} md={10} className="mx-auto">
            {nextPost ? (
              <>
                <strong>
                  <Link href={`/series/${story.id}`}>{story.name}</Link> -{' '}
                  {t('Next post')}
                </strong>

                <PostPreview post={nextPost as Post} />
              </>
            ) : (
              <>
                <strong>
                  {t('You read the last post but not the last in the series')}
                  {': '}
                  <Link href={`/series/${story.id}`}>{story.name}</Link>
                </strong>

                <Card className="mt-4 bg-transparent">
                  <CardBody className="text-center">
                    <div>
                      {t(
                        'Subscribe to this series to get notification for next posts',
                      )}
                    </div>

                    <FollowButton
                      collectionId={post.story.id}
                      collectionName={Enum_Subscription_Collectionname.Story}
                      className="mt-3 shadow-none"
                    />
                  </CardBody>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

NextPostsRecommend.propTypes = {
  post: {
    story: PropTypes.object.isRequired,
  },
};

export default NextPostsRecommend;
