import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  //Quando logado (se existe um currentUser) faz o redirecionamento para a página inicial.
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container $showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column a-center">
            <h1>
              Os maiores sucessos do Brasil e do mundo. As melhores histórias.
              Tudo na Netflix.
            </h1>
            <h4>Assista onde quiser. Cancele quando quiser.</h4>
            <h6>
              Quer assistir? Informe seu email para criar ou reiniciar sua
              assinatura.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email"
              name="email"
              minLength="5"
              maxLength="50"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Senha"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>
                Vamos lá {">"}
              </button>
            )}
          </div>
          <button onClick={handleSignIn}>Quero Assistir</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
    background-color: rgb(0 0 0 / 40%);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
  }

  .body {
    gap: 1rem;

    .text {
      gap: 1rem;
      text-align: center;
      font-size: 1.6rem;
      h1 {
        padding: 0 25rem;
      }
    }
    .form {
      display: grid;
      width: 40%;
      grid-template-columns: ${({ $showPassword }) =>
        $showPassword ? "1fr 1fr" : "2fr 1fr"};
      gap: 0.5rem;

      input {
        line-height: 1.5;
        font-size: 1rem;
        padding: 1rem;
        border: 1px solid lightgreen;
        border-radius: 0.25rem;
        background-color: rgba(70, 90, 126, 0.4);
        color: white;
        &::placeholder {
          color: white;
        }
        &:focus {
          border: 2px solid white;
          outline: none;
        }
      }
      button {
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bolder;
        font-size: 1.2rem;
        transition: all ease-in-out 0.2s;
        &:hover {
          background-color: #b80811;
        }
      }
    }

    button {
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;
      font-weight: bolder;
      font-size: 1.2rem;
      transition: all ease-in-out 0.2s;
      &:hover {
        background-color: #b80811;
      }
    }
  }
`;
