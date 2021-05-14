import { Post } from '@/graphql/generated';
import Link from 'next/link';

interface Props {
  post: Post;
}

const HomeFeaturePosPreview = ({ post }: Props) => {
  const imageUrl = post.image?.url || '/assets/img/home-bg.jpg';

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
              <h1>{post.title}</h1>
              <h2 className="subheading">{post.description}</h2>

              <div className="mt-5">
                <Link href={`/posts/${encodeURIComponent(post.slug)}`}>
                  <a className="btn btn-link btn-read-continue px-0">
                    Continue Reading
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeFeaturePosPreview;
