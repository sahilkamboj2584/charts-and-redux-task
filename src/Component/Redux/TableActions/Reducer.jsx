import {
  get_Data,
  get_TotalWeekly,
  get_PerContri,
  get_Commits,
} from "./constraints";

const initialvalues = {
  data: [],
  totalWeeklyActivity: [],
  perContri: [],
  commitsData: [],
};

const Reducer = (state = initialvalues, action) => {
  switch (action.type) {
    case get_Data:
      return {
        ...state,
        data: action.payload,
      };
    case get_TotalWeekly:
      return {
        ...state,
        totalWeeklyActivity: action.payload,
      };
    case get_PerContri:
      return {
        ...state,
        perContri: action.payload,
      };
    case get_Commits:
      return {
        ...state,
        commitsData: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
