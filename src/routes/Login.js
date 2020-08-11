import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { tryLoginAndDispatch } from "../actions/loadActions";
import { Redirect } from "react-router-dom";

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

  a {
    display: flex;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  width: 10vh;
  display: flex;
  justify-content: right;
  color: black;
  font-size: 10px;
  text-decoration: none;
`;

class Login extends React.Component {
  render() {
    if (this.props.authorization) {
      return <Redirect to="/"></Redirect>;
    }

    let { tryLoginAndDispatch } = this.props;
    const tryLogin = () => {
      tryLoginAndDispatch(this.state.loginID, this.state.password);
    };

    return (
      <Wrapper>
        <Box>
          <div>로그인</div>
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
          <button onClick={tryLogin}>로그인</button>
          <StyledLink to="/signup">회원가입</StyledLink>
        </Box>
      </Wrapper>
    );
  }
}

let mapStateToProps = (state) => ({
  authorization: state.loginReducer.authorization,
});

let mapDispatchToProps = (dispatch) => ({
  tryLoginAndDispatch: (loginID, password) => {
    return tryLoginAndDispatch(dispatch)(loginID, password);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
