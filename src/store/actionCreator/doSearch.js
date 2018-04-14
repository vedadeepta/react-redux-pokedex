export default function search(phrase) {
  return (dispatch) => {
    dispatch({
      type: 'SEARCH',
      value: {
        phrase
      },
    });
  };
}
