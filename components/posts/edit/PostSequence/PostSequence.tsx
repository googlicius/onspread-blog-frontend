import { useCallback, useEffect, useMemo, useState } from 'react';
import { Table } from 'reactstrap';
import { DndProvider } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import sortBy from 'lodash/sortBy';
import CardItem, { Card } from './CardItem';
import { Post, usePostsByStoryQuery } from '@/graphql/generated';
import Option from '@/types/Option';
import { FormData } from '../interface';
import { useFormContext } from 'react-hook-form';

interface Props {
  post: Post;
  selectedStoryOption: Option;
  onSequenceChanged: (seq: number) => void;
}

const PostSequence = ({
  post,
  selectedStoryOption,
  onSequenceChanged,
}: Props) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<Card[]>([]);
  const { setValue, getValues } = useFormContext<FormData>();

  const { data: postsByStoryData, loading } = usePostsByStoryQuery({
    variables: {
      story: selectedStoryOption?.value,
    },
    skip: !selectedStoryOption?.value,
    fetchPolicy: 'network-only',
  });

  const postsByStory = postsByStoryData?.posts || [];

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!selectedStoryOption) {
      setValue('storySeq', null);
      return;
    }

    const seq =
      postsByStory.length > 0
        ? postsByStory[postsByStory.length - 1].storySeq
        : 0;
    setValue('storySeq', seq + 1);
  }, [selectedStoryOption, postsByStory, loading]);

  const postCards: Card[] = useMemo(() => {
    const cards: Card[] = [];

    if (postsByStory.length > 0) {
      cards.push(
        ...postsByStory.map(({ id, title, storySeq }) => ({
          id: id,
          text: title,
          seq: storySeq,
          canDrag: post && post.id === id,
        })),
      );
    }

    // Add card for current post that doesn't exists in
    if (post && !postsByStory.find(({ id }) => id === post.id)) {
      cards.push({
        id: post.id,
        text: post.title,
        seq: null,
        canDrag: true,
      });
    }

    // Add card for new post.
    if (!post) {
      cards.push({
        id: post?.id,
        text: getValues('title'),
        seq: null,
        canDrag: true,
      });
    }

    return cards;
  }, [postsByStory]);

  useEffect(() => {
    setCards(sortBy(postCards, ['seq']));
  }, [postCards]);

  const handleMoveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      const newCards = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });
      setCards(newCards);
    },
    [cards],
  );

  const handleEndDrag = (index: number) => {
    // First post in series
    if (index === 0) {
      onSequenceChanged(cards[index].seq - 1);
      return;
    }

    // Last post in series
    if (cards[index + 1] === undefined) {
      onSequenceChanged(cards[index].seq + 1);
      return;
    }

    // In the middle of series.
    onSequenceChanged((cards[index - 1].seq + cards[index + 1].seq) / 2);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Table>
        <thead>
          <tr>
            <th style={{ width: '10px' }}></th>
            <th>#</th>
            <th>{t('Title')}</th>
          </tr>
        </thead>

        <tbody>
          {cards.map((card, index) => (
            <CardItem
              key={index}
              index={index}
              card={card}
              canDrag={card.canDrag}
              onMoveCard={handleMoveCard}
              onEndDrag={handleEndDrag}
            />
          ))}
        </tbody>
      </Table>
    </DndProvider>
  );
};

export default PostSequence;
