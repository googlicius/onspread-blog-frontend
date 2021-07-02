import DragSvg from '@/components/svgs/DragSvg';
import { useRef } from 'react';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import { boxImage } from './boxImage';

export interface Card {
  id: string;
  text: string;
  seq: number;
}

interface Props {
  card: Card;
  index: number;
  canDrag: boolean;
  onMoveCard: (dragIndex: number, hoverIndex: number) => void;
  onEndDrag: (index: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const CardItem = ({ card, index, canDrag, onMoveCard, onEndDrag }: Props) => {
  const ref = useRef(null);
  const [{ draggingId }, drag, dragPreview] = useDrag(
    () => ({
      type: 'post',
      item: () => ({
        id: card.id,
        index,
      }),
      collect(monitor) {
        return {
          draggingId: monitor.getItem()?.id,
        };
      },
      canDrag() {
        return canDrag;
      },
      end(item) {
        onEndDrag(item.index);
      },
    }),
    [canDrag, card, index],
  );

  const [{ handlerId }, drop] = useDrop({
    accept: 'post',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      // Don't replace items with themselves
      if (dragIndex === index) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < index && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > index && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onMoveCard(dragIndex, index);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = index;
    },
  });

  const opacity = draggingId === card.id ? 0.5 : 1;
  drag(drop(ref));

  return (
    <>
      <DragPreviewImage connect={dragPreview} src={boxImage} />
      <tr ref={ref} style={{ opacity }} data-handler-id={handlerId}>
        <td className="align-middle">
          {canDrag && (
            <button type="button" className="btn shadow-none px-0">
              <DragSvg />
            </button>
          )}
        </td>
        <td className="align-middle">{index + 1}</td>
        <td className="align-middle">{card.text}</td>
      </tr>
    </>
  );
};

export default CardItem;
