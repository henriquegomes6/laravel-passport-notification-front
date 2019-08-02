import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';

interface IState {
  opened: boolean,
}
interface IProps {
  title: string,
  text: string,
  buttonText: string
  onClickClose: (ok: boolean) => void;
}

export default class Confirm extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      opened: true
    };
  }

  handleClose = () => {
    this.setState({
      opened: false
    });
    this.props.onClickClose(true);
  }

  render() {
    const { title, text, buttonText } = this.props;
    const { opened } = this.state;
    return (
      <Dialog
        open={opened}
        onClose={this.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='primary' autoFocus>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}