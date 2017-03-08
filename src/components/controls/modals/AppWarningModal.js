import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class AppWarningModal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.close = this.close.bind(this);
  }

  close() {
    return this.setState({showAppWarningModal: false});
  }

  render() {
    return (
      <Modal show={this.props.showAppWarningModal} onHide={this.close}>

        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.errorInfo}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>

      </Modal>

    );
  }
}

AppWarningModal.propTypes = {
  title: PropTypes.string,
  errorInfo: PropTypes.node,
  showAppWarningModal: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    showAppWarningModal: state.showAppWarningModal
  };
}

export default connect(mapStateToProps)(AppWarningModal);


