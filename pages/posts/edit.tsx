import Navigation from '@/components/layout/Navigation';
import Head from 'next/head';

const PostEdit = () => {
  return (
    <>
      <Head>
        <title>Post Edit</title>
      </Head>

      <Navigation isDark={true} />

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">EDIT</div>
        </div>
      </div>
    </>
  );
};

export default PostEdit;
