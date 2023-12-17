import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hello from './pages/Hello';
import Props from './pages/Props';
import UseAxios from './pages/UseAxios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// root.render(
//   <React.StrictMode>
//     <Hello></Hello>
//     <Props msg='倪裕禄' age={12}></Props>
//     <Props msg='徐朝辉'></Props>
//     <UseAxios></UseAxios>

//   </React.StrictMode>
// );

root.render( // 注释严格模式就只请求一次
  <UseAxios id={1}></UseAxios>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
