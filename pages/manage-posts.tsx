import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostConnection, usePostsConnectionQuery } from '@/graphql/generated';
import Navigation from '@/components/layout/Navigation/Navigation';
import PencilSvg from '@/components/svgs/PencilSvg';
import useAuthGuard from '@/hooks/auth-guard';
import TogglePublish from './posts/TogglePublish';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TrashSvg from '@/components/svgs/TrashSvg';

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
    skip: !me.value,
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
        Header: t('Status'),
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
            <div className="d-flex align-items-center">
              <Link href={`/posts/${cell.row.original.slug}/edit`}>
                <a>
                  <PencilSvg title={t('Edit')} />
                </a>
              </Link>

              <button type="button" className="btn ml-2">
                <TrashSvg title={t('Delete')} />
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(() => {
    if (!postsConnection) {
      return [];
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

        <Table columns={columns} data={data} />

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
