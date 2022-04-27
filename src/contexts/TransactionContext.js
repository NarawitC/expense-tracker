import axios from 'axios';
import { createContext, useDeferredValue, useEffect, useReducer } from 'react';
import {
  TransactionReducer,
  FETCH_TRANSACTION,
} from '../reducers/TransactionReducer';
const transactionContext = createContext();
function TransactionContextProvider({ children }) {
  const [state, dispatch] = useReducer(TransactionReducer, []);
  // ------------------------------------ then ------------------------------------
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/transactions')
  //     .then((res) => {
  //       dispatch({
  //         type: FETCH_TRANSACTION,
  //         value: { transactions: res.data.transactions },
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
  // ---------------------------------- async ----------------------------------
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get('http://localhost:8080/transactions');
        dispatch({
          type: FETCH_TRANSACTION,
          value: { transactions: res.data.transactions },
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransaction();
  }, []);
  // ----------------------------------------------------------------------------
  return (
    <transactionContext.Provider value={{ transactions: state, dispatch }}>
      {children}
    </transactionContext.Provider>
  );
}
export { TransactionContextProvider, transactionContext };
