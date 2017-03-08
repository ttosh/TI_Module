import React from 'react';
import Button from 'react-bootstrap/lib/Button'

const AppButton = ({onClick, loading, editMode, buttonText, buttonProcessText}) => {

  return (
    <Button
      bsStyle="primary"
      bsSize="small"
      disabled={loading}
      onClick={onClick}>
      {loading ? buttonProcessText : buttonText}
    </Button>
  );
};

export default AppButton;
