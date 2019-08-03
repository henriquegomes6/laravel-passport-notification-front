import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormComponent, IStateForm } from 'components/Abstract/FormComponent';
import { IRouteProps } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';
import { Link } from 'react-router-dom';
import authService from 'services/auth';

interface ISignIn {
  email?: string,
  password?: string,
}
interface IProps extends IRouteProps {
  classes?: any,
}
interface IState extends IStateForm<ISignIn> { }

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default class SignIn extends FormComponent<IProps, IState> {
  componentDidMount() {
    this.setState({
      model: {
        email: null,
        password: null,
      }
    });
  }

  handleSubmit = async (event: any) => {
    event.preventDefault();
    const result = await authService.login(
      this.state.model.email,
      this.state.model.password
    );

    if (result) {
      window.location.reload();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Entrar
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
              onChange={this.updateModel((m, v) => m.email = v)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Senha'
              type='password'
              id='password'
              inputProps={{
                minLength: 5,
              }}
              autoComplete='current-password'
              onChange={this.updateModel((m, v) => m.password = v)}

            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Entrar
          </Button>
            <Grid container>
              <Grid item>
                <Link to='signup'>
                  Não tem uma conta? Crie agora!!!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
