import AdnyRequest from '../index'

enum LoginApi {
  AccountLogin = '/login',
  AccountUserInfo = '/users',
  AccountUserMenus = '/role'
}

export function accountLoginRequest(account: any) {
  return AdnyRequest.post({
    url: LoginApi.AccountLogin,
    data: account
  })
}

export function accountUserInfoRequest(id: number) {
  return AdnyRequest.get({
    url: `${LoginApi.AccountUserInfo}/${id}`
  })
}

export function accountUserMenusRequest(id: number) {
  return AdnyRequest.get({
    url: `${LoginApi.AccountUserMenus}/${id}/menu`
  })
}
