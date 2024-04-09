import React from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

export default function Signup() {
  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login/>
        <div className="body flex column a-center j-center">
          <div className="text flex column a-center t-center gap-1">
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
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Senha" name="senha" />
            <button>Vamos lá</button>
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
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;        
    h1 {
      max-width: 800px;            
    }    
  }  
  .form {
    margin-top: 1rem;
  }
`;
