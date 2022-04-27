import Home from './pages/Home';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import TransactionAction from './pages/TransactionAction';
import Layout from './components/Layout';
import { TransactionContextProvider } from './contexts/TransactionContext';
function App() {
  return (
    <TransactionContextProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="home" element={<Home></Home>}></Route>
          <Route
            path="new"
            element={<TransactionAction></TransactionAction>}
          ></Route>
          <Route
            element={<TransactionAction></TransactionAction>}
            path="transaction/:transactionId"
            // * path="transaction/:firstId/notId/:secondId"
            // * http://localhost:3000/transaction/sad/notId/5151
          ></Route>
          <Route
            index
            element={
              // <div className="text-white text-center">THIS IS DEFAULT PAGE</div>
              <Navigate to="/home"></Navigate>
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to="home"></Navigate>}></Route>
      </Routes>
    </TransactionContextProvider>
    // <Home></Home>
    // <TransactionForm></TransactionForm>
  );
}

export default App;
