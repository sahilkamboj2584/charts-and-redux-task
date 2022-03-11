import axios from "axios";
import {
  get_Commits,
  get_Data,
  get_PerContri,
  get_TotalWeekly,
} from "./constraints";

export const getStarredRepos = (data) => async (dispatch) => {
  try {
    const result = await axios.get(
      `https://api.github.com/search/repositories?q=created:%3E${data.date}&sort=stars&order=desc&page=${data.page}`
    );
    dispatch({ type: get_Data, payload: result.data });
  } catch (error) {
    console.log("error", error);
  }
};

export const getWeeklyAdditionDdeletionsActivity =
  (data) => async (dispatch) => {
    try {
      const result = await axios.get(
        `https://api.github.com/repos/${data.owner}/${data.repo}/stats/code_frequency`
      );
      dispatch({ type: get_TotalWeekly, payload: result.data });
    } catch (error) {
      console.log("error", error);
    }
  };

export const getWeeklyCommitsActivity = (data) => async (dispatch) => {
  try {
    const result = await axios.get(
      `https://api.github.com/repos/${data.owner}/${data.repo}/stats/commit_activity`
    );

    dispatch({ type: get_Commits, payload: result.data });
  } catch (error) {
    console.log("error", error);
  }
};

export const getPerContributor = (data) => async (dispatch) => {
  try {
    const result = await axios.get(
      `https://api.github.com/repos/${data.owner}/${data.repo}/stats/contributors`
    );
    dispatch({ type: get_PerContri, payload: result.data });
  } catch (error) {
    console.log("error", error);
  }
};
