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
import authService from 'services/auth';

interface IUser {
  name?: string,
}

interface IProps extends IRouteProps {
  classes?: any,
}

interface IState extends IStateForm<IUser> {
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

export default class WelCome extends FormComponent<IProps, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      sending: true,
      hasMsg: false,
      msg: {
        title: '',
        text: '',
        buttonText: ''
      },
      model: {
        name: '',
      },
      onClickClose: () => { },
    };

    this.loadData();
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({
      sending: true,
    });

    authService.updateName(
      this.state.model.name,
    ).then((value) => {
      this.setState({
        sending: false,
        hasMsg: true,
        model: {
          name: value.data.name,
        },
        msg: {
          title: 'Sucesso',
          text: 'Conta atualizada com sucesso',
          buttonText: 'OK',
        },
      });
    }).catch((value) => {
      this.setState({
        sending: false,
        hasMsg: true,
        msg: {
          title: 'Erro',
          text: 'Erro ao atualizar a conta',
          buttonText: 'OK',
        },
      });
    });
  }

  loadData = () => {
    authService.getUser()
      .then((value) => {
        this.setState({
          sending: false,
          model: {
            name: value.data.name,
          },
        });
      })
      .catch((value) => {
        this.setState({
          sending: true,
          hasMsg: true,
          msg: {
            title: 'Erro',
            text: 'Erro ao pegar informações da conta',
            buttonText: 'OK',
          },
        });
      });
  }

  handleDelete = () => {
    authService.deleteUser()
      .then((value) => {
        window.location.reload();
      })
      .catch((value) => {
        this.setState({
          sending: true,
          hasMsg: true,
          msg: {
            title: 'Erro',
            text: 'Erro ao deletar',
            buttonText: 'OK',
          },
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { sending, hasMsg, msg, onClickClose, model } = this.state;
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
            Bem-vindo ao sistema!
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
                  inputProps={{
                    value: model.name
                  }}
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
              Salvar
          </Button>
            <Button
              type='button'
              fullWidth
              variant='contained'
              color='secondary'
              className={classes.submit}
              disabled={sending}
              onClick={this.handleDelete}
            >
              Deletar
          </Button>
          </form>
        </div>
      </Container>
    );
  }
}