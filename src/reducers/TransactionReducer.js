export const FETCH_TRANSACTION = 'FETCH_TRANSACTION ';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
function TransactionReducer(state, action) {
  switch (action.type) {
    case FETCH_TRANSACTION: {
      return action.value.transactions;
    }
    case DELETE_TRANSACTION: {
      const idx = state.findIndex((el) => el.id === action.value.id);
      if (idx !== -1) {
        const cloneState = [...state];
        cloneState.splice(idx, 1);
        return cloneState;
      }
      return state;
    }
    default:
      return state;
  }
}
export { TransactionReducer };
