import { useCallback, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { DndProvider } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import sortBy from 'lodash/sortBy';
import { Post } from '@/graphql/generated';
import CardItem, { Card } from './CardItem';

interface Props {
  posts: Post[];
  editingPost: Post;
  onSequenceChanged: (seq: number) => void;
}

const PostSequence = ({
  posts = [],
  editingPost,
  onSequenceChanged,
}: Props) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    setCards(
      sortBy(
        posts.map((post) => ({
          id: post.id,
          text: post.title,
          seq: post.storySeq,
        })),
        ['seq'],
      ),
    );
  }, [posts]);

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
      onSequenceChanged(cards[1].seq - 86400000);
      return;
    }

    // Last post in series
    if (cards[index + 1] === undefined) {
      onSequenceChanged(cards[index - 1].seq + 86400000);
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
              canDrag={card.id === editingPost.id}
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
