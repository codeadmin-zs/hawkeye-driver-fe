const formatResponse = response => {
  console.log('success response');
  console.log(response);
  const {status} = response;
  let isError = true;
  const errorResponse: any = {
    status,
    body: {
      detail: '',
    },
  };

  switch (status) {
    case 204:
      errorResponse.body.detail =
        'This was successful but does not return anything.';
      break;
    case 401:
      errorResponse.body.detail = 'User is not currently authorised.';
      break;
    case 404:
      errorResponse.body.detail = 'Resource not found.';
      break;
    case 405:
      errorResponse.body.detail = 'Invalid build.';
      break;
    case 503:
      errorResponse.body.detail =
        'The service is currently unavailable. We apologise for the inconvenience and thank you for your patience. We’ll be back with you soon.';
      break;
    default:
      isError = false;
  }

  if (isError) {
    return errorResponse;
  } else {
    // SUCCESSFUL JSON RESPONSE
    return response.json().then((body: any) => {
      const jsonResponse: any = {status, body};
      console.log('Full jsonResponse');
      console.log(jsonResponse);
      return jsonResponse;
    });
  }
  //   })
  //   .catch(error => {
  //     const errorResponse: any = {
  //       status: 500,
  //       body: {
  //         detail: error.message,
  //       },
  //     };
  //     console.log('error response');
  //     console.log(error);

  //     return errorResponse;
  //   });
};
