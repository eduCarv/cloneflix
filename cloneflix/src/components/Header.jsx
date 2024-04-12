import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="Netflix Logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Entrar" : "Cadastrar"}
      </button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 10rem;
  .logo {
    img {
      height: 4rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    transition: all ease-in-out 0.2s;
    
    &:hover {
      background-color: rgba(229, 9, 20, 0.7);
    }
  }
`;
