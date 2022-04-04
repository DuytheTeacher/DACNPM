import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Row,
  Form,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./SuperAdminLoginPage.css";

function SuperAdminLoginPage() {
  const signInSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, "Your username is too short (2-50 characters)")
      .max(50, "Your username is too long (2-50 characters)")
      .required("Username is required"),
    password: Yup.string()
      .min(2, "Your password is too short (at least 3 characters)")
      .required("Password is required"),
  });

  const loginForm = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: { signInSchema },
      onSubmit: async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      },
    });

    return (
      <Row>
        <Col xl={12}>
          {({ errors, touched }) => (
            <form onSubmit={formik.handleSubmit}>
              <FloatingLabel
                controlId="userName"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Your username here"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                />
                {errors.userName && touched.userName ? (
                  <div>{errors.userName}</div>
                ) : null}
              </FloatingLabel>
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  placeholder="Password"
                />
              </FloatingLabel>

              <Button variant="primary" type="submit">
                Go somewhere
              </Button>
            </form>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <Container style={{ height: "100vh", overflow: "hidden" }} fluid>
      <Row className="justify-content-center h-100 align-content-center">
        <Col xs="auto">
          <Card className="text-center" style={{ width: "30rem" }}>
            <div className="CardHeader">SuperAdmin Login</div>
            <Card.Body>{loginForm()}</Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SuperAdminLoginPage;
