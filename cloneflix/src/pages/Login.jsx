import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  //Quando logado (se existe um currentUser) faz o redirecionamento para a página inicial.
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center">
            <div className="title">
              <h3>Entrar</h3>
            </div>
            <div className="container flex column">
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

              <button onClick={handleLogIn}>Entrar</button>
            </div>
          </div>
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

    .form-container {
      .title {
        align-self: flex-start;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      .form {
        max-width: 450px;
        padding: 48px 68px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0.5rem;
        box-sizing: border-box;
        .container {
          gap: 1rem;

          input {
            width: 300px;
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
            padding: 0.8rem;
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
      }
    }
  }
`;
