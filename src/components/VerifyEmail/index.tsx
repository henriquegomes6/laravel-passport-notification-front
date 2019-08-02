import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme } from '@material-ui/core/styles';
import { IRouteProps } from 'decorators/withRouter';
import React, { Component } from 'react';

import { WithStyles } from '../../decorators/withStyles';
import authService from '../../services/auth';

interface IProps extends IRouteProps {
  classes?: any,
}

interface IState {
  checkEmailFail?: boolean,
  loading: boolean,
}

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
  constructor(props: any) {
    super(props);
    this.state = {
      checkEmailFail: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    authService.verifyToken(this.props.match.params.token).then((value) => {
      this.handleRedirect();
    }).catch(() => {
      this.setState({
        checkEmailFail: false,
        loading: false,
      });
    });
  }

  handleRedirect = () => {
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    const { loading, checkEmailFail } = this.state;
    console.log({ loading, checkEmailFail });
    return (
      <Grid>
        <Grid className={classes.alignCenter}>
          <CircularProgress className={classes.progress} size={68} />
          <Typography component='h1' variant='h5'>
            Verificando email
          </Typography>
        </Grid>

        {
          !loading &&
          <Dialog
            open={!checkEmailFail}
            onClose={this.handleRedirect}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'Erro ao verificar o token'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                token não esta valido
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRedirect} color='primary' autoFocus>
                OK
            </Button>
            </DialogActions>
          </Dialog>
        }
      </Grid>
    );
  }
}