import React from "react";
import background from "../assets/login.jpg";
import styled from "styled-components";

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="Login Background" />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  
  img {
    width: 100vw;
    height: 100vh;
  }
`;
