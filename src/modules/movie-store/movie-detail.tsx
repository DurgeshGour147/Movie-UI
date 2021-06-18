import { Button, Col, Descriptions, Row, Skeleton } from "antd";
import Cookies from "js-cookie";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { APIendpoints, APIUrl, routerPath } from "../../models/constant";
import {
  fetchMovieDetailRequest,
  fetchMovieDetailResponse,
} from "../../models/movieModel";
import SendRequest from "../../service/sendRequest.service";
import { ArrowLeftOutlined } from "@ant-design/icons";

const MovieDetail = ({
  match: {
    params: { id: title },
  },
}: any): ReactElement => {
  const history = useHistory();
  const [movieDetail, setMovieDetail] = useState(null as any);

  useEffect(() => {
    if (
      Cookies.get("token") == "" ||
      Cookies.get("token") == null ||
      Cookies.get("token") == undefined
    )
      history.push("/");
    else {
      getMovieDetail(Cookies.get("token"), title);
    }
  }, [title]);

  const getMovieDetail = async (token: any, title: any) => {
    const url = APIUrl + APIendpoints.fetchMovieDetail;
    const reqpayload: fetchMovieDetailRequest = {
      accessToken: token,
      title: title,
    };
    const result: any = await SendRequest.instance.post<
      fetchMovieDetailRequest,
      fetchMovieDetailResponse
    >(url, reqpayload);
    if (result && result.isSuccess && result.movieDetail) {
      setMovieDetail(result.movieDetail);
    } else {
    }
  };

  const onClickBackbtn = () => {
    history.push(routerPath.MovieStore);
  };

  return (
    <>
      {movieDetail ? (
        <>
          <div></div>
          <div style={{ padding: "50px" }}>
            <Row gutter={24}>
              <Col md={4}>
                <div className="text-left">
                  <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => {
                      onClickBackbtn();
                    }}
                  >
                    Back
                  </Button>
                </div>
              </Col>
            </Row>
            <Col>
              <Descriptions
                title={movieDetail.title}
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Movie Title">
                  {movieDetail.title}
                </Descriptions.Item>
                <Descriptions.Item label="Language">
                  {movieDetail.language}
                </Descriptions.Item>
                <Descriptions.Item label="Location">
                  {movieDetail.location}
                </Descriptions.Item>
                <Descriptions.Item label="IMDBRating">
                  {movieDetail.imdbRating}
                </Descriptions.Item>
                <Descriptions.Item label="Listing Type">
                  {movieDetail.listingType}
                </Descriptions.Item>
                <Descriptions.Item label="Sound Effects">
                  {movieDetail.soundEffects}
                </Descriptions.Item>
                <Descriptions.Item label="Plot">
                  {movieDetail.plot}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </div>
        </>
      ) : (
        <>
          <Skeleton active={true} paragraph={{ rows: 6 }} />
        </>
      )}
    </>
  );
};

export default MovieDetail;
