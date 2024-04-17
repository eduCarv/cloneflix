import React, { useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.webp";
import MovieLogo from "../assets/homeTitle.webp";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);

  /**Ativa ou desativa a classe que vai deixar o nav opaco. */
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="Plano de fundo"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Capa do Filme" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center"><FaPlay />Assistir</button>
            <button className="flex j-center a-center"><AiOutlineInfoCircle /> Mais informações</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
      object-fit: contain;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border-radius: 0.2rem;
          border: none;
          cursor: pointer;
          transition: all .3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109,109,110,0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;