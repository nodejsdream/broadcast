import { fetch, parseResponse } from 'redux-oauth';
import { isUserSignedIn } from 'redux/models/user';

export const POST_REQUEST_STARTED = 'POST_REQUEST_STARTED';
export const POST_REQUEST_FINISHED = 'POST_REQUEST_FINISHED';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

function postRequestStarted() {
  return { type: POST_REQUEST_STARTED };
}

function postRequestFinished(post) {
  return { type: POST_REQUEST_FINISHED, post };
}

function postRequestError(errors) {
  return { type: POST_REQUEST_ERROR, errors };
}

export function postRequest() {
  return (dispatch, getState) => {
    if (!isUserSignedIn(getState())) {
      return Promise.resolve();
    }

    dispatch(postRequestStarted());

    return dispatch(fetch('/api/posts/following'))
      .then(parseResponse)
      .then(({ payload }) => dispatch(postRequestFinished(payload.post)))
      .catch(({ errors }) => dispatch(postRequestError(errors)));
  };
}
