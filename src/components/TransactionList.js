import Transaction from './Transaction';
import { useContext } from 'react';
import { transactionContext } from '../contexts/TransactionContext';
function TransactionList() {
  const { transactions } = useContext(transactionContext);
  return (
    <ul className="list-group">
      {transactions.map((el) => (
        <Transaction key={el.id} transaction={el}></Transaction>
      ))}
    </ul>
  );
}
export default TransactionList;
