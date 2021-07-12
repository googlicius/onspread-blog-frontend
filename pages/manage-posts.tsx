import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Column } from 'react-table';
import { PostConnection, usePostsConnectionQuery } from '@/graphql/generated';
import Navigation from '@/components/layout/Navigation/Navigation';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PencilSvg from '@/components/svgs/PencilSvg';
import Link from 'next/link';
import useAuthGuard from '@/hooks/auth-guard';
import TogglePublish from './posts/TogglePublish';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Loading from '@/components/Loading/Loading';

const ManagePosts = () => {
  const me = useAuthGuard();
  const [postsConnection, setPostsConnection] = useState<PostConnection>(null);
  const router = useRouter();
  const { page = 1 } = router.query;
  const sort = router.query.sort as string;
  const { t } = useTranslation();
  const { data: postsConnectionData } = usePostsConnectionQuery({
    variables: {
      start: (+page - 1) * +process.env.NEXT_PUBLIC_PER_PAGE,
      where: {
        user: me.value?.id,
        _publicationState: 'preview',
      },
      ...(sort && { sort }),
    },
    skip: me.status !== 'idle',
  });

  useEffect(() => {
    if (!postsConnectionData) {
      return;
    }
    setPostsConnection(postsConnectionData.postsConnection as PostConnection);
  }, [postsConnectionData]);

  const columns: Column<any>[] = React.useMemo(
    () => [
      {
        Header: t('ID'),
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: t('Title'),
        accessor: 'title',
      },
      {
        Header: t('Created at'),
        accessor: 'createdAt',
      },
      {
        Header: t('Publication'),
        accessor: 'published_at',
        disableSortBy: true,
        Cell: function TogglePublishCell({ cell }) {
          return (
            <TogglePublish
              key={cell.row.values.id}
              id={cell.row.values.id}
              published_at={cell.row.values.published_at}
            />
          );
        },
      },
      {
        Header: t('Action'),
        accessor: null,
        disableSortBy: true,
        Cell: function AcctionCell({ cell }) {
          return (
            <Link href={`/posts/${cell.row.original.slug}/edit`}>
              <a>
                <PencilSvg />
              </a>
            </Link>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(() => {
    if (!postsConnection) {
      return;
    }
    return postsConnection.values.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      createdAt: post.createdAt,
      published_at: post.published_at,
    }));
  }, [postsConnection]);

  return (
    <>
      <Head>
        <title>{t('Manage Posts')} - Onspread</title>
      </Head>

      <Navigation noHide />

      <Container>
        <h1 className="mt-7 mb-5">{t('Manage Posts')}</h1>

        {data ? <Table columns={columns} data={data} /> : <Loading />}

        <Pagination
          className="my-5"
          currentPage={+page}
          totalCount={postsConnection?.aggregate?.count || 0}
        />
      </Container>
    </>
  );
};

export default ManagePosts;
