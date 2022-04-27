import { formatThaiCurrency } from '../utils/Currency';
import { formatMonthAndYear, formatDate } from '../utils/Date';
import { useNavigate } from 'react-router-dom';
function Transaction({ transaction }) {
  const {
    id,
    payee,
    amount,
    category: { name, type },
    date,
  } = transaction;
  const navigate = useNavigate();
  return (
    <li
      className={`list-group-item d-flex align-items-center bd-callout bd-callout-${
        type === 'EXPENSE' ? 'danger' : 'success'
      }`}
      onClick={() => navigate('/transaction/' + id, { state: transaction })}
    >
      <div className="d-flex flex-fill" role="button">
        <div className="border border-1 border-dark rounded-2 bg-warning p-2 text-center w-15">
          <p className="p-0 m-0 text-black-50 text-3">
            {formatMonthAndYear(date)}
          </p>
          <p className="p-0 m-0">{formatDate(date)}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center ps-4 flex-fill">
          <div>
            <p className="mb-1 fw-bold">{payee}</p>
            <p className="mb-0 text-3 text-black-50">{name}</p>
          </div>
          <span
            className={`badge bg-${type === 'EXPENSE' ? 'danger' : 'success'}`}
          >
            {formatThaiCurrency(amount)}
          </span>
        </div>
      </div>
    </li>
  );
}
export default Transaction;
