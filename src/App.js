import Header from "./components/Header/Header";
import { useState } from "react";
import axios from "axios";
import Repositorio from "./components/Repositorio/Repositorio";
import Starred from "./components/Starred/Starred";
import { Button, Container, Avatar } from "@material-ui/core";
import "./index.css";

function App() {
  const [user, setUser] = useState("");

  const [userGithub, setUserGithub] = useState({});
  const [repositorios, setRepositorios] = useState({});
  const [starred, setStarred] = useState({});
  const URL_GITHUB = "https://api.github.com/users/";

  const getRepos = async () => {
    const res = await axios.get(URL_GITHUB + user + "/repos");
    setRepositorios(res);
    console.log(res);
  };

  const getStarreds = async () => {
    const res = await axios.get(URL_GITHUB + user + "/starred");
    setStarred(res);
    console.log(res);
  };

  const getAllData = async () => {
    //e.preventDefault();
    const res = await axios.get(URL_GITHUB + user);
    setUserGithub(res);

    setRepositorios({}); //limpa tudo
    setStarred({}); // limpa limpa
    console.log(res);
  };

  const getData = (e) => {
    setUser(e.target.value);
  };

  const getKey = (e) => {
    // função que roda quando aperta enter na pesquisa
    if (e.keyCode === 13) {
      getAllData();
    }
  };

  return (
    <Container maxWidth="lg" className="container">
      <Header sendData={getData} sendKey={getKey} />

      <div className="conteudo-principal">
        {userGithub.data && (
          <div className="user-info">
            <Avatar
              className="img-user"
              src={userGithub.data.avatar_url}
              alt="Imagem"
            />
            <h1>Nome: {userGithub.data.login}</h1>
            <a href="{userGithub.data.html_url}" target="_blank" rel="noreferrer">{userGithub.data.html_url}</a>
            <p>Sobre: {userGithub.data.bio} </p>
            <p>Companhia: {userGithub.data.company} </p>
            <p>Localização: {userGithub.data.location} </p>
            <p>E-mail: {userGithub.data.email} </p>
            <p>Repositorios Públicos: {userGithub.data.public_repos} </p>
            <p>Seguidores: {userGithub.data.followers} </p>
            <p>Seguindo: {userGithub.data.following} </p>
          </div>
        )}

        <div className="repositorios-container">
          {repositorios.data &&
            repositorios.data.map((repositorio, index) => {
              return <Repositorio key={index} name={repositorio.name} />;
            })}
        </div>

        <div className="starred-container">
          {starred.data &&
            starred.data.map((repositorio) => {
              return <Starred name={repositorio.name} />;
            })}
        </div>
      </div>

      <form className="buttons">
        <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={() => getRepos()}
        >
          Repos
        </Button>

        <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={() => getStarreds()}
        >
          Starred
        </Button>
      </form>
    </Container>
  );
}

export default App;
