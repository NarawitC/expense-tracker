import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
function App() {
  return (
    <div>
      <Header></Header>
      <TransactionForm></TransactionForm>
      <TransactionList></TransactionList>
    </div>
  );
}

export default App;
