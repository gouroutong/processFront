import ReactDOM from 'react-dom';
import React, {ReactElement} from 'react';

let renderReactDOM = (child, options= {}) => {
  let div = document.createElement('div');
  let {id} = options;
  if (id) {
    let e = document.getElementById(id);
    if (e) {
      document.body.removeChild(e);
    }
    div.setAttribute('id', id);
  }

  document.body.appendChild(div);
  ReactDOM.render(child, div);
};
const createModalContainer = (id_div) => {
  //强制清理同名div，render会重复创建modal
  closeModalContainer(id_div);
  let div = document.createElement('div');
  div.setAttribute('id', id_div);
  document.body.appendChild(div);
  return div;
};

const closeModalContainer = (id_div) => {
  let e = document.getElementById(id_div);
  if (e) {
    document.body.removeChild(e);
  }
};


export {
  renderReactDOM,
  createModalContainer,
  closeModalContainer,

};
