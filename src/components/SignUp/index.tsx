import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import Link from '@material-ui/core/Link';
interface IProps extends IStyledProps { }

interface IState { }

@WithStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default class SignUp extends Component<IProps, IState>{

  handleSubmit(event: any) {
    event.preventDefault();
    // const data = new FormData(event.target);
    alert('eeee');

  }

  render() {
    const { classes } = this.props;
    return (
      <Container component='main' maxWidth='xs' >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Cadastro
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='Nome'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  type='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Senha'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Cadastrar
          </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/'>
                  Você já tem uma conta? Entre aqui!!!
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}