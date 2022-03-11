import React, { useEffect } from "react";
import ChartsComp from "./ChartsComp";
import { connect } from "react-redux";
import {
  getWeeklyAdditionDdeletionsActivity,
  getWeeklyCommitsActivity,
} from "../Redux/TableActions/Actions";
import { useParams } from "react-router-dom";
import { get } from "lodash";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
const GraphComp = (props) => {
  const params = useParams();

  const [value, setValue] = React.useState("1");
  const [toggle, setToggle] = React.useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
    setToggle(false);
    if (event.target.value === "3") {
      props.getWeeklyCommitsActivity(params);
      setToggle(true);
    }
  };
  useEffect(() => {
    props.getWeeklyAdditionDdeletionsActivity(params);
  }, []);

  const commitsDataFor = props?.commitsData?.map((item) => {
    return item.total;
  });
  const commitLabels = props?.commitsData?.map((item) => {
    var dateString = moment.unix(get(item, "week", "")).format("MM/DD/YYYY");
    return dateString;
  });
  const newData = props?.totalWeeklyActivity?.map((item, key) => {
    return Object.assign({}, item);
  });

  const labelsForAdd = newData?.map((item) => {
    var dateString = moment.unix(get(item, "0", "")).format("MM/DD/YYYY");
    return dateString;
  });

  const addDeleData = newData.map((item, key) => {
    return get(item, value, "");
  });
  const data3 = {
    labels: toggle ? commitLabels : labelsForAdd,
    datasets: [
      {
        label:
          value === "1"
            ? "addition"
            : value === "2"
            ? "deletion"
            : value === "3"
            ? "Commits"
            : "",
        data: toggle ? commitsDataFor : addDeleData,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <br></br>
      <FormControl>
        <InputLabel id="demo-simple-select-label">select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="please select"
          onChange={handleChange}
        >
          <MenuItem value={"1"}>Addition</MenuItem>
          <MenuItem value={"2"}>Deletions</MenuItem>
          <MenuItem value={"3"}>Commit</MenuItem>
        </Select>
      </FormControl>
      <ChartsComp data={data3} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    totalWeeklyActivity: state.totalWeeklyActivity,
    data: state.data,
    commitsData: state.commitsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWeeklyAdditionDdeletionsActivity: function (data) {
      dispatch(getWeeklyAdditionDdeletionsActivity(data));
    },
    getWeeklyCommitsActivity: function (data) {
      dispatch(getWeeklyCommitsActivity(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphComp);
