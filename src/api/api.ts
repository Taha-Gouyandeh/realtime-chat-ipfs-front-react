import axios from 'axios';
import { eraseCookie, getLocalItems } from '../redux-config/hooks';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export class Api {
  public constructor(input: {
    path: string;
    method: 'get' | 'post' | 'delete' | 'put' | 'patch';
    body?: any;
    header?: any;
    params?: any;
  }) {
    this.path = input.path;
    this.method = input.method;
    this.body = input.body;
    this.header = input.header;
    this.params = input.params;
  }
  private _uri: string = String(process.env.REACT_APP_API_URL);
  private _path: string = '';
  private _params: string = '';
  private _method: 'get' | 'post' | 'delete' | 'put' | 'patch' = 'get';
  private _body?: any;
  private _header?: any;
  public get url(): string {
    return this._uri;
  }
  public set path(path: string) {
    this._path = path;
  }
  public get path(): string {
    return this._path;
  }
  public set params(params: string) {
    this._params = params;
  }
  public get params(): string {
    return this._params;
  }

  public set method(method: 'get' | 'post' | 'delete' | 'put' | 'patch') {
    this._method = method;
  }
  public get method() {
    return this._method;
  }

  public set body(body: any) {
    this._body = body;
  }
  public get body() {
    return this._body;
  }
  public get header() {
    return this._header;
  }
  public set header(header: any) {
    this._header = header;
  }

  async call() {
    const language = getLocalItems('language');
    return new Promise((resolve, reject) => {
      axios({
        method: this.method,
        url: this.url + this.path,
        headers: this.header,
        data: this.body,
        params: this.params,
      })
        .then((data) => {
          resolve(data.data);
        })
        .catch((data) => {
          const code = data?.response?.status;

          if (code == 404) {
            window.location.replace('/404');
          } else if (code === 401) {
            eraseCookie('user');
            localStorage.clear();
            window.location.replace('/login');
          } else if (code === 429) {
            window.location.replace('/429');
          } else if (code === 403) {
            window.history.back();
          } else if (code === 422 || code === 400) {
            toast.error(data?.response?.data?.message, {
              position:
                getLocalItems('language') === 'en' ? 'top-right' : 'top-left',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
            reject(data.response);
          } else if (code === 500) {
            Swal.fire({
              icon: 'error',
              text:
                getLocalItems('language') === 'en'
                  ? 'An error has occurred on the server side, please contact support'
                  : 'مشکلی در سمت سرور رخ داده است لطفا با پشتیانی تماس بگیرید',
            });
          } else {
            reject(data.response);
          }
        });
    });
  }
}
