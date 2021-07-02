import { Container, Row, Col } from 'reactstrap';

export const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <Container>
        <Row>
          <Col lg={8} md={10} className="mx-auto">
            <p className="copyright text-light">
              Copyright &copy; Onspread 2021
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
