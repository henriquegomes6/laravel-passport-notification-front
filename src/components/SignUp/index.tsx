import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormComponent, IStateForm } from 'components/Abstract/FormComponent';
import Confirm from 'components/Shared/Confirm';
import { IRouteProps } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';
import { Link } from 'react-router-dom';
import authService from 'services/auth';

interface ISignUp {
  name?: string,
  email?: string,
  password?: string,
}

interface IProps extends IRouteProps {
  classes?: any,
}

interface IState extends IStateForm<ISignUp> {
  sending: boolean,
  hasMsg: boolean,
  msg: {
    title: string,
    text: string,
    buttonText: string
  },
  onClickClose?: any
}

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

export default class SignUp extends FormComponent<IProps, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      sending: false,
      hasMsg: false,
      msg: {
        title: '',
        text: '',
        buttonText: ''
      },
      model: {
        name: null,
        email: null,
        password: null,
      },
      onClickClose: () => { },

    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({
      sending: true,
    });

    authService.signUp(
      this.state.model.name,
      this.state.model.email,
      this.state.model.password
    ).then((value) => {
      this.setState({
        sending: false,
        hasMsg: true,
        msg: {
          title: 'Sucesso',
          text: 'Conta criada com sucesso, verifique seu email para confirmação',
          buttonText: 'OK',
        },
        onClickClose: this.handleRedirect,
      });
    }).catch((value) => {
      this.setState({
        sending: false,
        hasMsg: true,
        msg: {
          title: 'Erro',
          text: 'Erro ao criar a conta',
          buttonText: 'OK',
        },
        onClickClose: () => { },
      });
    });
  }

  handleRedirect = () => {
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    const { sending, hasMsg, msg, onClickClose } = this.state;
    return (
      <Container component='main' maxWidth='xs' >
        {
          hasMsg &&
          <Confirm title={msg.title} text={msg.text} buttonText={msg.buttonText} onClickClose={onClickClose} />
        }
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
                  name='name'
                  variant='outlined'
                  required
                  fullWidth
                  id='name'
                  label='Nome'
                  autoFocus
                  onChange={this.updateModel((m, v) => m.name = v)}
                  disabled={sending}
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
                  onChange={this.updateModel((m, v) => m.email = v)}
                  disabled={sending}
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
                  inputProps={{
                    minLength: 5,
                  }}
                  onChange={this.updateModel((m, v) => m.password = v)}
                  autoComplete='current-password'
                  disabled={sending}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={sending}
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