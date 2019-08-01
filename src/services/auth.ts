import apiService from './api';


class AuthService {

  public login(email: string, password: string) {
    return apiService.post('/api/login', { email, password });
  }
}

const authService = new AuthService();
export default authService;