import React, { useState } from 'react';
import './App.css';
import $ from 'jquery';
import github from './github.png';
import linkedin from './linkedin.png';
import spotify from './spotify.png';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

class App extends React.Component{

  state = {
    items : [],
    top : "",
    url : ""
  }
  constructor(props){
    super(props);
    const parametros = this.getHashParams();
    this.token = parametros.access_token;
   
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
      url:"https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/top-tracks?country=US",
      headers: {
      Authorization: `Bearer ${this.token}`
      }
    })
    .then(dados => {
      console.log(dados.tracks[0].name)
      this.setState({top: dados.tracks[0].name})
    })
  }

  topAlbum = () =>{
    $.ajax({
      method: "GET",
      dataType: "Json",
      url:"https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/albums?country=US",
      headers: {
      Authorization: `Bearer ${this.token}`
      }
    })
    .then(dados => {
      dados.items.forEach(item => {
        console.log(item.name)
      });
      const items = dados.items
      this.setState({items:items })
    })
  }

  getArtist = () =>{
    $.ajax({
      method: "GET",
      dataType: "Json",
      url:"https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4",
      headers: {
      Authorization: `Bearer ${this.token}`
      }
    })
    .then(dados => {
      console.log(dados.images[0].url)
      this.setState({url: dados.images[0].url})
    })
  }

   render() {
    return(
      <body>
        <h1>API SPOTIFY <img src={spotify} id='logo'></img></h1>

        <div className="App">
          <button><a href="http://localhost:8888"> Logar com o Spotify</a></button>
          <button onClick={this.getArtist}>Mostrar artista</button>
          <button onClick={this.topTracksLorde}>Buscar Top Tracks do Ludacris</button>
          <button onClick={this.topAlbum}>Buscar lista de álbums</button>
        </div>

        <h2>Artista:</h2>
        <div id="profile">
          <img src={this.state.url} id="foto"></img>
        </div>        

        <h2>Música mais tocada de Ludacris:</h2>
        <p id='toptrack'>{this.state.top}</p>

        <h2>Álbums de Ludacris:</h2>
        <p id='lista'>
          {this.state.items.map(item => {
            return <div>{item.name}</div>
          })}
        </p>

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