import TransactionForm from '../components/TransactionForm';
import { useParams } from 'react-router-dom';
function TransactionAction() {
  const params = useParams();
  return <TransactionForm></TransactionForm>;
}
export default TransactionAction;
