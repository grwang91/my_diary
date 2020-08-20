import React from "react";
import styled from "styled-components";
import { trySignupAndLogin } from "../actions/loadActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled.div`
  width: 30%;
  height: 50%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  input {
    margin: 5px;
  }

  button {
    margin: 5px;
  }

  div {
    display: flex;
    justify-content: center;
    margin: 5px 0 5px 0;
    font-size: 16px;
    font-weight: bold;
  }
`;

const StyledLink = styled(Link)`
  width: 10vh;
  display: flex;
  justify-content: right;
  color: black;
  font-size: 10px;
  text-decoration: none;
  margin-left: 20px;
`;

class Signup extends React.Component {
  state = {
    loginID: null,
    password: null,
    passwordCheck: null,
  };

  render() {
    let { trySignupAndLogin } = this.props;
    let trySignup = () => {
      if (this.state.password !== this.state.passwordCheck) {
        alert("비밀번호 확인하세요");
        return;
      }

      trySignupAndLogin(this.state.loginID, this.state.password);
    };

    return (
      <Wrapper>
        <Box>
          <div>회원가입</div>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ loginID: e.target.value });
            }}
            placeholder="아이디"
          />
          <input
            type="password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
            placeholder="password"
          />
          <input
            type="password"
            onChange={(e) => {
              this.setState({ passwordCheck: e.target.value });
            }}
            placeholder="password 확인"
          />
          <button onClick={trySignup}>확인</button>
          <StyledLink to="/login">로그인</StyledLink>
        </Box>
      </Wrapper>
    );
  }
}

let mapDispatchToProps = (dispatch) => ({
  trySignupAndLogin: (loginID, password) => {
    return trySignupAndLogin(dispatch)(loginID, password);
  },
});

export default connect(null, mapDispatchToProps)(Signup);
