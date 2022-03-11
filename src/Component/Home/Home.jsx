import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getStarredRepos } from "../Redux/Index";
import TableComp from "../Table/Table";
import { Button } from "@mui/material";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

function Home(props) {
  const [first, setfirst] = useState([]);
  const [apiParams, setApiParams] = useState({
    date: "2020-10-22",
    page: 1,
  });
  const [count, setCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    props.getStarredRepos(apiParams);
  }, [apiParams]);

  useEffect(() => {
    if (props?.data?.items && first?.length) {
      const newData = first.concat(props?.data?.items);
      setfirst(newData);
    } else {
      setfirst(props.data.items);
    }
  }, [props?.data?.items]);

  const oneWeek = () => {
    var prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
    const dateTime2 = moment(prevMonday).format("YYYY-MM-DD");
    setfirst([]);
    setApiParams({ date: dateTime2, page: 1 });
  };

  const twoWeek = () => {
    var d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    d.setDate(d.getDate() - 7);
    var sunday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
    const dateTime2 = moment(sunday).format("YYYY-MM-DD");
    setfirst([]);
    setApiParams({ page: 1, date: dateTime2 });
  };

  const oneMonth = () => {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    setfirst([]);
    setApiParams({ page: 1, date: startOfMonth });
  };

  const fetchMoreData = () => {
    if (first >= 1000) {
      setHasMore(false);
      return;
    }
    const cc = count + 1;
    setCount(cc);
    const apiNewParams = apiParams;
    apiNewParams.page = cc;
    setApiParams({ ...apiParams, page: cc });
    props.getStarredRepos(apiNewParams);
  };

  return (
    <div>
      <Button onClick={() => oneWeek()}>1 week</Button>
      <Button onClick={() => twoWeek()}>2 week</Button>
      <Button onClick={() => oneMonth()}>1 Month</Button>
      <h1>Date :{apiParams.date}</h1>

      <InfiniteScroll
        dataLength={first?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <TableComp data={first} />
      </InfiniteScroll>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStarredRepos: function (defaultDate) {
      dispatch(getStarredRepos(defaultDate));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
