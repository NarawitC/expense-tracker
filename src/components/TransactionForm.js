import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { transactionContext } from '../contexts/TransactionContext';
import { DELETE_TRANSACTION } from '../reducers/TransactionReducer';
import validator from 'validator';

const INCOME = 'INCOME';
const EXPENSE = 'EXPENSE';

function TransactionForm() {
  const [transaction, serTransaction] = useState({});
  const navigate = useNavigate();
  // const location = useLocation();
  const params = useParams();
  const [notFoundError, setNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(transactionContext);
  const [categoryType, setCategoryType] = useState(EXPENSE);

  const [payeeInput, setPayeeInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [dateInput, setDateInput] = useState('');

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const [error, setError] = useState({});

  useEffect(() => {
    if (params.transactionId) {
      axios
        .get('http://localhost:8080/transactions/' + params.transactionId)
        .then((res) => {
          if (res.data.transaction === null) {
            setNotFoundError(true);
          } else serTransaction(res.data.transaction);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.transactionId]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get('http://localhost:8080/categories');

      const resultExpenses = res.data.categories.filter(
        (el) => el.type === EXPENSE
      );

      const resultIncomes = res.data.categories.filter(
        (el) => el.type === INCOME
      );

      setExpenses(resultExpenses);
      setIncomes(resultIncomes);
      if (categoryType === EXPENSE) {
        setSelectedCategoryId(resultExpenses[0].id);
      } else {
        setSelectedCategoryId(resultIncomes[0].id);
      }
    };
    fetchCategory();
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    navigate('/home');
    const inputError = {};
    if (validator.isEmpty(payeeInput)) {
      inputError.payee = 'Payee is required';
    }
    if (validator.isEmpty(amountInput)) {
      inputError.amount = 'Amount is required';
    } else if (!validator.isNumeric(amountInput)) {
      inputError.amount = 'Amount must be numeric';
    }
    if (validator.isEmpty(dateInput)) {
      inputError.date = 'Date is required';
    }
    if (Object.keys(inputError).length > 0) {
      setError(inputError);
    } else {
      setError({});
    }
  };

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        'http://localhost:8080/transactions/' + params.transactionId
      );
      dispatch({
        type: DELETE_TRANSACTION,
        value: { id: params.transactionId },
      });
      setLoading(false);
      navigate('home');
    } catch (err) {
      console.log(err);
    }
  };

  if (notFoundError)
    return <h1 className="text-white">404 !!! Transaction is not found</h1>;
  return (
    <>
      <div className="border bg-white rounded-2 p-3">
        <form className="row g-3" onSubmit={handleSubmitForm}>
          <div className="col-6">
            <input
              type="radio"
              className="btn-check"
              id="cbx-expense"
              name="type"
              defaultChecked
              onChange={() => {
                setCategoryType(EXPENSE);
                setSelectedCategoryId(expenses[0].id);
              }}
            />
            <label
              htmlFor="cbx-expense"
              className="btn btn-outline-danger rounded-0 rounded-start"
            >
              EXPENSE
            </label>
            <input
              type="radio"
              className="btn-check"
              id="cbx-income"
              name="type"
              onChange={() => {
                setCategoryType(INCOME);
                setSelectedCategoryId(incomes[0].id);
              }}
            />
            <label
              htmlFor="cbx-income"
              className="btn btn-outline-success rounded-0 rounded-end"
            >
              INCOME
            </label>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <i className="fa-solid fa-xmark" role="button"></i>
          </div>
          <div className="col-sm-6 ">
            <label className="form-label">Payee</label>
            <input
              type="text"
              className="form-control"
              value={payeeInput}
              onChange={(event) => setPayeeInput(event.target.value)}
            />
          </div>
          <div className="col-sm-6 ">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              defaultValue={selectedCategoryId}
              onChange={(event) => setSelectedCategoryId(event.target.value)}
            >
              {(categoryType === EXPENSE ? expenses : incomes).map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-6 ">
            <label className="form-label">Amount</label>
            <input
              type="text"
              className="form-control"
              value={amountInput}
              onChange={(event) => setAmountInput(event.target.value)}
            />
          </div>
          <div className="col-sm-6 ">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={dateInput}
              onChange={(event) => setDateInput(event.target.value)}
            />
          </div>
          <div className="col-12">
            <div className="d-grid mt-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
      {params.transactionId && (
        <div className="d-grid mt-5">
          <button
            className="btn btn-danger"
            onClick={handleClickDelete}
            disabled={loading}
          >
            Delete Transaction
          </button>
        </div>
      )}
    </>
  );
}
export default TransactionForm;
