import React from "react";
import { conReduce } from "./ConReduce";

const initialState = [];

export const ExpTrackCon = React.createContext(initialState);

export const Context = (props) => {
  const [transaction, dispatch] = React.useReducer(conReduce, initialState);

  const deleteTrans = (id) =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });

  const addTrans = (trans) =>
    dispatch({ type: "ADD_TRANSACTION", payload: trans });

  const removeAll = () => 
  dispatch({ type: "REMOVE_ALL" })

  return (
    <div>
      <ExpTrackCon.Provider value={{ deleteTrans, addTrans, removeAll, transaction }}>
        {props.children}
      </ExpTrackCon.Provider>
    </div>
  );
};
