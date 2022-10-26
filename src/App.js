import './App.css';

import React, { useState } from "react";

import EquationEditor from "equation-editor-react";
import Button from '@mui/material/Button';
import Geogebra from 'react-geogebra';
Geogebra.defaultProps = {
  appName: 'classic',
  width: 800,
  height: 600,
  showToolBar: false,
  showAlgebraInput: false,
  showMenuBar: false,
};

const App = () => {
  const [equation, setEquation] = useState("2x^3-3x^2+4x^1");
  const [mibunResultHTML, setMibunResultHTML] = useState("");
  const [mibunResult, setMibunResult] = useState("");

  const derive = () => {
    var result = '';
    var hang = equation.replace('+', ',+').replace('-', ',-').split(',');
    for (var i = 0; i < hang.length; i++) {
      var data = hang[i].split('x');
      if (data.length != 1) { // 상수인 경우 제외(항상 0)
        data[1] = data[1].replace('^', '');
        if (data[0].length === 0) data[0] = 1;
        if (data[1].length === 0) data[1] = 1;
        if (data[0] >= 0) { //양수이면 + 부호 붙이기
          result = result + '+' + calculate(data[0], data[1]).toString();
        } else {
          result = result + calculate(data[0], data[1]).toString();
        }
      }
    }
    if (result.charAt(0) === '+') result = result.substring(1);
    if (result.charAt(result.length - 1) === '+' || result.charAt(result.length - 1) === '-') result = result.substring(0, result.length - 1);
    setMibunResult(result);
    setMibunResultHTML(result.replaceAll('^', '<sup>').replaceAll('x', '</sup>x'));

    const app = window.ggbApplet;
    app.reset();
    app.evalCommand(equation);
    app.evalCommand(result);
  }

  const calculate = (a, b) => { //ax^b
    if (a * b === 0) {
      return ''
    } else if (b - 1 === 1) {
      return (a * b) + 'x';
    } else if (b - 1 === 0) {
      return (a * b);
    } else {
      return (a * b) + 'x^' + (b - 1);
    }
  }

  return (
    <>
      <EquationEditor
        className="editor"
        value={equation}
        onChange={setEquation}
        autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
        autoOperatorNames="sin cos tan"
      ></EquationEditor>
      <br></br><br></br>
      <Button className="btn" variant="contained" sx={{ borderRadius: '10px' }} onClick={derive}>해줘</Button>

      <div className="resultText" dangerouslySetInnerHTML={{ __html: mibunResult }} />
      <br></br>
      <Geogebra
        width="800"
        height="600"
        showMenuBar
        showToolBar
        showAlgebraInput
      />
    </>
  );

};

export default App;