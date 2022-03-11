import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPerContributor } from "../Redux/TableActions/Actions";
import { useParams } from "react-router-dom";
import ChartsComp from "./ChartsComp";
import { get } from "lodash";
import moment from "moment";
const ContributorComp = (props) => {
  const params = useParams();

  useEffect(() => {
    props.getPerContributor(params);
  }, []);

  const labels = props?.perContri[0]?.weeks.map((item) => {
    var dateString = moment.unix(item.w).format("MM/DD/YYYY");
    return dateString;
  });

  const totalActive = props?.perContri[0]?.weeks?.map((item, key) => {
    return get(item, "a", "");
  });

  const totalcommit = props?.perContri[0]?.weeks?.map((item, key) => {
    return get(item, "c", "");
  });

  const totalDeletion = props?.perContri[0]?.weeks?.map((item, key) => {
    return get(item, "d", "");
  });

  const data3 = {
    labels: labels,
    datasets: [
      {
        label: "addition",
        data: totalActive,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Commits",
        data: totalcommit,
        borderColor: "rgba(255,255,0)",
        backgroundColor: "rgba(255,255,0)",
      },
      {
        label: "Deletions",
        data: totalDeletion,
        borderColor: "rgba(66, 163, 235, 1)",
        backgroundColor: "rgba(100, 162, 235, 1)",
      },
    ],
  };

  return (
    <div>
      {" "}
      <br></br>
      <h1>Owner : - {params.owner}</h1>
      <ChartsComp data={data3} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    perContri: state.perContri,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPerContributor: function (data) {
      dispatch(getPerContributor(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContributorComp);
