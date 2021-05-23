import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ReactSVG } from 'react-svg';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const MediaLib = ({ isOpen, toggle }: Props) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader
        close={
          <button type="button" className="close" onClick={toggle}>
            <ReactSVG src="/assets/icon/close.svg" />
          </button>
        }
      >
        <form>
          <input type="text" className="form-control" />
        </form>
      </ModalHeader>

      <ModalBody>Hello</ModalBody>
    </Modal>
  );
};

export default MediaLib;
