import React, { useReducer } from "react";

// automate context creation for different data
export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addBlogPost: (dispatch) => { return () => {} }}
    // we loop through all the actions that have, add it to an object ('boundActions') and pass it the dispatch to the reducer we received

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider
        value={{
          state,
          ...boundActions,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

// re-usable function for setting up a context provider
