import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment)};
        // Because this comment is a JavaScript array, and so when I look at the length of the array, well, it contains a certain number of comments, the length of the array tells me how many comments they are. Then we are assigning the comment id in sequential order

    default:
      return state;
  }
};