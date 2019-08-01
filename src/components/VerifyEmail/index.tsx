import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, Theme } from '@material-ui/core/styles';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import React, { Component } from 'react';

interface IProps extends IStyledProps { }

interface IState { }

@WithStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
    alignCenter: {
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      '-ms-transform': 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
  }),
)

export default class VerifyEmail extends Component<IProps, IState> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.alignCenter}>
        <CircularProgress className={classes.progress} size={68} />
        <Typography component='h1' variant='h5'>
          Verificando email
        </Typography>
      </div>
    );
  }
}