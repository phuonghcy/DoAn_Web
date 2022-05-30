import { Container, Row, Col } from "react-bootstrap"
import AccountSideBar from "../../components/AccountSideBar"
import AccountProfile from "../../components/AccountProfile";
import AccountAddress from "../../components/AccountAddress";
import styles from "./AccountPage.module.css"
import { useState } from "react";
function AccountPage() {

  const [content, setContent] = useState("address")

  const handleOnChangeContent = (nContent) => {
    setContent(nContent)
  }

  return (
    <div style={{ margin: "190px 0" }}>
      <Container>
        <Row>
          <Col xl={3}>
            <AccountSideBar onChangeContent={handleOnChangeContent} currentContent={content} />
          </Col>
          <Col xl={9}>
            <div className={styles.contentWrapper}>
              {content && content === "profile" ? <AccountProfile /> : <AccountAddress />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AccountPage