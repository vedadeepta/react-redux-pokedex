export default function setPageCount(count) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PAGE_COUNT',
      value: {
        count
      }
    });
  };
}
