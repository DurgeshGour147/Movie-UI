import { ReactElement, useEffect, useState } from "react";
import { Table, Tag, Space, Input, Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "../../../src/index.css";
import { APIendpoints, APIUrl, routerPath } from "../../models/constant";
import {
  userDetailRequest,
  userDetailResponse,
} from "../../models/userDetailModel";
import SendRequest from "../../service/sendRequest.service";
import {
  fetchMovieListRequest,
  fetchMovieListResponse,
} from "../../models/movieModel";

const MovieStore = (): ReactElement => {
  const history = useHistory();
  const [userRoleName, setUserRoleName] = useState(null as any);
  const [userDetail, setUserDetail] = useState(null as any);
  const [errorMsg, setErrorMsg] = useState(null as any);
  const [token, setToken] = useState(null as any);
  const [movieList, setMovieList] = useState(null as any);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  useEffect(() => {
    if (
      Cookies.get("token") == "" ||
      Cookies.get("token") == null ||
      Cookies.get("token") == undefined
    )
      history.push("/");
    else {
      setToken(Cookies.get("token"));
      getUserDetails(Cookies.get("token"));
      getMovieList(Cookies.get("token"), "", "", "");
    }
  }, []);

  const getUserDetails = async (token: any) => {
    const url = APIUrl + APIendpoints.fetchUserDetail;
    const reqpayload: userDetailRequest = {
      accessToken: token,
    };
    const result: any = await SendRequest.instance.post<
      userDetailRequest,
      userDetailResponse
    >(url, reqpayload);
    if (result && result.isSuccess) {
      setUserDetail(result);
      if (result.roles) {
        setUserRoleName(result.roles[0].roleName);
      }
    } else {
      setErrorMsg({
        isValid: false,
        msg: "API call isn't working or Internal Server Error",
      });
    }
  };

  const getMovieList = async (
    token: any,
    title: any,
    language: any,
    location: any
  ) => {
    const url = APIUrl + APIendpoints.fetchMovieList;
    const reqpayload: fetchMovieListRequest = {
      accessToken: token,
      language: language,
      location: location,
      title: title,
    };
    const result: any = await SendRequest.instance.post<
      fetchMovieListRequest,
      fetchMovieListResponse
    >(url, reqpayload);
    if (result && result.isSuccess && result.movies) {
      setMovieList(result.movies);
    } else {
      setErrorMsg({ isValid: false, msg: result.errorMessage });
    }
  };

  const columns = [
    {
      title: "Movie title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "IMDB Rating",
      key: "imdbRating",
      dataIndex: "imdbRating",
    },
  ];

  const data = [] as any;

  if (movieList) {
    movieList.forEach((item: any, index: any) => {
      data.push({
        key: index,
        name: item.title,
        language: item.language,
        location: item.location,
        imdbRating: item.imdbRating,
      });
    });
  }

  const FilterMovieList = (event: any) => {
    setSelectedFilter(event.target.value);
  };

  const OnFilterInput = (event: any) => {
    var inputValue = event.target.value;
    if (inputValue.length == 0 || inputValue == null || inputValue == "") {
      getMovieList(Cookies.get("token"), "", "", "");
    } else if (inputValue.length >= 3) {
      if (selectedFilter === "language")
        getMovieList(Cookies.get("token"), "", inputValue, "");

      if (selectedFilter === "location")
        getMovieList(Cookies.get("token"), "", "", inputValue);

      if (selectedFilter === "title")
        getMovieList(Cookies.get("token"), inputValue, "", "");
    }
  };

  const onRowClick = (item: any) => {
    history.push(routerPath.MovieDetail + "/" + item.name);
  };

  const onLogout = (): any => {
    Cookies.remove("token");
    history.push("/");
  };

  return (
    <div style={{ padding: "50px" }}>
      <div>
        <Row gutter={24}>
          {userDetail && (
            <Col md={8}>
              <p> Welcome: {userRoleName} User</p>
            </Col>
          )}
          <Col md={6}>
            <select
              style={{ width: "100%" }}
              name="Filter"
              id="filter"
              onChange={(event: any) => {
                FilterMovieList(event);
              }}
            >
              <option selected={true} value="Filter">
                FilterBy
              </option>
              <option value="language">Language</option>
              <option value="location">Location</option>
              <option value="title">Title</option>
            </select>
          </Col>
          <Col md={6}>
            {selectedFilter != "Filter" && (
              <Input
                placeholder="Search"
                style={{ width: "100%" }}
                onChange={(e: any): void => OnFilterInput(e)}
              />
            )}
          </Col>
          <Col md={4}>
            <div className="text-right">
              <Button type="primary" onClick={() => onLogout()}>
                Log Out
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ cursor: "pointer", padding: "50px;" }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event: any) => {
                onRowClick(record);
              }, // click row
            };
          }}
        />
      )}
    </div>
  );
};

export default MovieStore;
