import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class CustomModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
    };

    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  close() {
    this.setState({
      open: false,
    }, () => {
      this.props.onClose();
    });
  }

  render() {
    const { open } = this.state;
    return (
      <Modal
        basic
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        dimmer="blurring"
        open={open}
        onClose={this.close}
        size='small'
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default CustomModal;
