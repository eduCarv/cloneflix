import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function Navbar({ isScrolled }) {
  const links = [
    { name: "Início", link: "/" },
    { name: "Séries", link: "/tvshows" },
    { name: "Filmes", link: "/movies" },
    { name: "Minha Lista", link: "/mylist" },
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  /*
    TODO: Validar esta routa para ser acessível somente quando logado.
  */ 


  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map(({name, link}) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Buscar"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={()=> signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
    .scrolled {
        background-color: black;
    }
    nav {
        position: sticky;
        top: 0;
        height: 6.5rem;
        width: 100%;
        justify-content: space-between;
        position: fixed;
        z-index: 2;
        padding: 0 4rem;
        align-items: center;
        transition: all .3s ease-in-out;
        .left {
            gap: 2rem;
            .brand {
                img {
                    height: 4rem;
                }
            }
            .links {
                list-style-type: none;
                gap: 2rem;
                li {
                    a {
                        color: white;
                        text-decoration: none;
                        transition: all .2s ease-in-out;
                        &:hover {
                            opacity: .7;
                        }
                    }
                }
            }
        }
        .right {
            gap: 1rem;
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
                svg {
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }
            .search {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .4rem;             
                padding: .2rem;
                padding-left: .5rem;
                button {
                    background-color: transparent;
                    svg {
                        color: white;
                    }
                }
                input {
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s ease-in-out;
                    background-color: transparent;
                    border: none;
                    color: white;
                    &:focus {
                        outline: none;
                    }
                }
            }
            .show-search {
                border: 1px solid white;
                background-color: rgba(0,0,0, 0.6);
                input {
                    width: 100%;
                    opacity: 1;
                    visibility: visible;
                    padding: 0.3rem;
                }
            }
        }
    }
`;
