import { AxiosResponse } from 'axios';
import { enLocalStorageKeys } from 'enums/enLocalStorageKeys';
import { localStorageGetItem, localStorageSetItem } from 'helpers';

import apiService from './api';

class AuthService {

  public async login(email: string, password: string) {
    return await this.makeLogin(
      await apiService.post('/api/login', { email, password })
    );
  }

  public async signUp(name: string, email: string, password: string) {
    const password_confirmation = password;
    return await this.makeLogin(
      await apiService.post('/api/register', { name, email, password, password_confirmation })
    );
  }

  public async verifyToken(token: string) {
    const result = await apiService.post(`/api/verify/${token}`, { token })

    if (result.status === 200) {
      return true;
    }

    return false;
  }

  public async updateName(name: string) {
    return await apiService.put('/api/user', { name });
  }

  public async getUser() {
    return await apiService.get('/api/user');
  }

  public async deleteUser() {
    await apiService.delete('/api/user');
    localStorageSetItem(enLocalStorageKeys.token, {});
    return;
  }

  public checkIsLogin() {
    const token = localStorageGetItem(enLocalStorageKeys.token);

    if (!token.access_token) {
      return false;
    }

    return true;
  }

  private async makeLogin(values: AxiosResponse) {
    if (values.status !== 200) {
      return false;
    }
    localStorageSetItem(enLocalStorageKeys.token, values.data);
    return true;
  }
}

const authService = new AuthService();
export default authService;