import React from 'react'
import './style.css';

const Repositorio = (props) => <h1 key={props.id} className="nome-do-repositorio">{props.name}</h1>;

export default Repositorio;