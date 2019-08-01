import apiService from './api';


export default class AuthService {

  public login(email: string, password: string) {
    return apiService.post('/api/login', { email, password });
  }
}