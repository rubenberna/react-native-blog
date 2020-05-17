import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogpost) =>
        blogpost.id === action.payload.id ? action.payload : blogpost
      );
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const res = await jsonServer.get("/blogposts");
    dispatch({
      type: "get_blogposts",
      payload: res.data,
    });
  };
};

const addBlogPost = (dispatch) => {
  // we're passing the dispatch as an argument from within 'CreateDataContext'
  // the title, content, etc is called from inside the component
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", {
      title,
      content,
    });

    if (callback) {
      callback(); // this callback is passed from the action in createScreen to navigate back to Index
    }
  };
};

const deleteBlogPost = (dispatch) => {
  // the return function is what we call inside our different components and where we have access to arguments
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);

    //after deleting in the db, we're just deleting it from our local state
    dispatch({
      type: "delete_blogpost",
      payload: id,
    });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {
      title,
      content,
    });

    dispatch({
      type: "edit_blogpost",
      payload: {
        id,
        title,
        content,
      },
    });
    if (callback) {
      callback();
    }
  };
};

// We're using an automated Context Provider and passing the only things that actually change (in case we need to create different contexts): the reducer, the actions and the initial state
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
