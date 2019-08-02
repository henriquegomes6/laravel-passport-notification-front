import { AxiosResponse } from 'axios';
import { enLocalStorageKeys } from 'enums/enLocalStorageKeys';
import { localStorageSetItem } from 'helpers';

import apiService from './api';

class AuthService {

  public async login(email: string, password: string) {
    return await this.makeLogin(
      await apiService.post('/api/login', { email, password })
    );
  }

  public async verifyToken(token: string) {
    const result = await apiService.post(`/api/verify/${token}`, { token })

    if (result.status === 200) {
      return true;
    }

    return false;
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