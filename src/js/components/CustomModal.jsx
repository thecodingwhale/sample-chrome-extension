import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.open,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({
        toggle: nextProps.open,
      });
    }
  }

  closeModal() {
    this.setState({
      toggle: false,
    }, () => {
      this.props.onClose();
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.toggle}
        onRequestClose={this.closeModal}
        style={customStyles}
      >
        <button onClick={this.closeModal}>x</button>
        {this.props.children}
      </Modal>
    );
  }
}

export default CustomModal;
