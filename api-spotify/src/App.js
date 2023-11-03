import React, { useState } from 'react';
import './App.css';
import $ from 'jquery';
import github from './github.png';
import linkedin from './linkedin.png';
import spotify from './spotify.png';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

class App extends React.Component{
  constructor(props){
    super(props);
    const parametros = this.getHashParams();
    const token = parametros.access_token;
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
    }
    return hashParams;
   }

   topTracksLorde = () =>{
    $.ajax({
      method: "GET",
      dataType: "Json",
      url:"https://api.spotify.com/v1/artists/3ipn9JLAPI5GUEo4y4jcoi/top-tracks",
      headers: {
      Authorization: `Bearer ${this.token}`
      }
    })
    .then(dados => {
      console.log(dados.tracks[0].name)
    })
  }

   render() {
    return(
      <body>
        <h1>API SPOTIFY <img src={spotify} id='logo'></img></h1>

        <div className="App">
          <button><a href="http://localhost:8888"> Logar com o Spotify</a></button>
          <button onClick={this.topTracksLorde}>Buscar top tracks do Ludacris</button>
        </div>

        <h2>Lista de músicas:</h2>
        <p id='lista'></p>

        <footer>
          <p id='credits'>Desenvolvido por João Paulo &copy; 2023</p>

          <div id="conta">
            <a href="https://github.com/joaoparqum">
                <img src={github}></img>
                <p>Github</p>
            </a>   
            <a href="https://linkedin.com/joao-arquim">
                <img src={linkedin}></img>
                <p>Linkedin</p>
            </a>
          </div>
        </footer>

      </body>
    );
   }
}

export default App;