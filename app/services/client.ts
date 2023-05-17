import axios from "axios";
import ApiConfig from "app/config/api-config";
import { storeHelpers } from "../store";
import { FetchTypes } from "../types";

const FetchApi = async ({
  auth = true,
  blob = false,
  isAuthReq = false,
  isGtrackit = false,
  apiOverride = ApiConfig.BASE_URL_API,
  endpoint = "",
  payload = {},
  headers = {},
  method = "POST",
  contentType = "application/json",
}) => {
  const body =
    contentType === "multipart/form-data" ? payload : JSON.stringify(payload);
  apiOverride = isAuthReq ? ApiConfig.BASE_URL_AUTH : ApiConfig.BASE_URL_API;
  apiOverride = isGtrackit ? ApiConfig.GTRACKIT_BASE_URL_API : apiOverride;
  apiOverride += ApiConfig.SUB_URL

  const consolidatedHeaders: FetchTypes.ParamHeaders = {
    Authorization: auth ? `Bearer ${storeHelpers.getAccessToken()}` : "",
    "Content-Type": contentType,
    "API-KEY": ApiConfig.KEY,
    ...headers,
  };
  const params: FetchTypes.Params = {
    method,
    headers: consolidatedHeaders,
    body: method !== "GET" ? body : null,
  };

  return fetch(`${apiOverride}${endpoint}`, params)
    .then((response: FetchTypes.RawResponse): FetchTypes.Responses => {
      const { status } = response;
      let isError = true;
      const errorResponse: FetchTypes.Error = {
        status,
        body: {
          detail: "",
        },
      };

      switch (status) {
        case 204:
          errorResponse.body.detail =
            "This was successful but does not return anything.";
          break;
        case 401:
          errorResponse.body.detail = "User is not currently authorised.";
          break;
        case 404:
          errorResponse.body.detail = "Resource not found.";
          isError = false;
          break;
        case 405:
          errorResponse.body.detail = "Invalid build.";
          break;
        case 503:
          errorResponse.body.detail =
            "The service is currently unavailable. We apologise for the inconvenience and thank you for your patience. We’ll be back with you soon.";
          break;
        default:
          isError = false;
      }

      if (isError) {
        return errorResponse;
      } else if (blob) {
        // SUCCESSFUL BLOB RESPONSE
        return response.blob().then((body: FetchTypes.Responses) => {
          const blobResponse: FetchTypes.Blob = {
            status,
            body: {
              ...body,
              detail: "This is a blob",
            },
          };
          return blobResponse;
        });
      } else {
        if (
          response.headers.get("content-type")?.match(/application\/json/)
        ) {
          // SUCCESSFUL JSON RESPONSE
          return response?.json()?.then((body: FetchTypes.Responses) => {
            const jsonResponse: FetchTypes.Json = { status, body };
            return jsonResponse;
          });
        } else {
          return { status, body: "success" };
        }
      }
    })
    .then((result: any) => {
      return result;
    })
    .catch((error) => {
      const errorResponse: FetchTypes.Error = {
        status: 500,
        body: {
          detail: error.message,
        },
      };

      return errorResponse;
    });
};

export default FetchApi;
