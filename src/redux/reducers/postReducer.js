import { SIGN_OUT } from 'redux-oauth';
import { POST_REQUEST_STARTED, POST_REQUEST_FINISHED, POST_REQUEST_ERROR } from 'redux/actions/postActions';

const initialState = {
  post: null,
  errors: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_REQUEST_STARTED:
      return Object.assign({}, state, { loading: true, errors: null });
    case POST_REQUEST_FINISHED:
      return {
        loading: false,
        errors: null,
        post: action.post
      };
    case POST_REQUEST_ERROR:
      return Object.assign({}, state, { loading: false, errors: action.errors });
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
