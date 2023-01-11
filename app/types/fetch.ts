export interface RawResponse {
  type: string;
  status: number;
  ok: boolean;
  statusText: string;
  headers: any;
  url: string;
  bodyUsed: boolean;
  blob: any;
  json: any;
}

export interface RawHeaders {
  server: string;
  connection: string;
  'transfer-encoding': string;
  'access-control-max-age': string;
}

export interface RawError {
  body: {
    code: string;
    detail: string;
    id: string;
    meta: {
      timestamp: number;
    };
    status: string;
  };
}

export interface BasicResponse {
  status: number;
}

export type Params = {
  method: string;
  headers: ParamHeaders;
  body: any;
};

export interface ParamHeaders {
  Authorization: string;
  'Content-Type'?: string;
  'API-KEY': string;
}

export interface Error extends BasicResponse {
  body: {
    detail: string;
  };
}
export interface Json extends BasicResponse {
  body: any;
}
export interface Blob extends BasicResponse {
  body: {
    detail: string;
  };
}

export type Responses = Error | Json | Blob;
