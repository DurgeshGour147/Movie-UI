import { ReactElement, useEffect, useState } from "react";
import { AuthReponseDetail, AuthRequestDetail } from "../../models/authModel";
import Cookies from "js-cookie";
import { Alert, Button, Col, Form, Input, Row } from "antd";
import { useHistory } from "react-router-dom";
import SendRequest from "../../service/sendRequest.service";
import { APIendpoints, APIUrl, routerPath } from "./../../models/constant";

const Auth = (): ReactElement => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null as any);
  useEffect(() => {
    if (Cookies.get("token")) history.push(routerPath.MovieStore);
  }, []);

  const onFinish = async (values: any) => {
    const url = APIUrl + APIendpoints.fetchToken;
    const reqpayload: AuthRequestDetail = {
      password: values.password,
      userName: values.username,
    };
    const result: any = await SendRequest.instance.post<
      AuthRequestDetail,
      AuthReponseDetail
    >(url, reqpayload);
    if (result && result.isSuccess && result.accessToken) {
      Cookies.set("token", result.accessToken);
      history.push(routerPath.MovieStore);
    } else {
      if (result.httpStatusCode === 401)
        setErrorMsg({ isValid: false, msg: "User not present." });
      else setErrorMsg({ isValid: false, msg: result.errorMessage });
    }
  };

  return (
    <div style={{ padding: "5%" }}>
      {errorMsg != undefined && errorMsg != null && errorMsg.isValid === false && (
        <div style={{ padding: "5px" }}>
          <Row>
            <Col md={8}></Col>
            <Col md={8}>
              <Alert message={errorMsg.msg} type="error" showIcon />
            </Col>
            <Col md={8}></Col>
          </Row>
        </div>
      )}
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <div style={{ border: "3px groove", padding: "3%" }}>
          <Row>
            <Col md={6}> </Col>
            <Col md={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}> </Col>
          </Row>
          <Row>
            <Col md={6}> </Col>
            <Col md={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col md={6}> </Col>
          </Row>
          <Row>
            <Col md={8}> </Col>
            <Col md={8}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {" "}
                  Submit{" "}
                </Button>
              </Form.Item>
            </Col>
            <Col md={8}> </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
export default Auth;
