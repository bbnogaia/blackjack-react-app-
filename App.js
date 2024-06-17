import './App.css';

import React from 'react';
import Configurazione from './components/Configurazione';
import Credito from './components/Credito';
import Gioco from './components/Gioco';
function App() {
  
    //Imposto il credito iniziale come stato
    const [creditoIniziale, setCreditoIniziale] = React.useState(0);
    const [creditoAttuale, setCreditoAttuale] = React.useState(0);

    //Funzione che risponde al click del bottone nel componente Configurazione
    const handleCredito = (credito) => {
      console.log('Credito:', credito);
      setCreditoIniziale(credito);
      setCreditoAttuale(credito);
    };

    
    const vittoria = (isWinning,puntata) => {
      
      puntata = parseInt(puntata);

      if(isWinning){
        setCreditoAttuale(creditoAttuale + puntata);
      }
      else{
        setCreditoAttuale(creditoAttuale - puntata);
      }

    }


    //Rendering condizionale
    //Se il credito è impostato allora viene mostrato anche il componente Credito
    //Altrimenti viene mostrato solo il componente Configurazione
  if(creditoIniziale > 0){
      return(
        <>
          <Configurazione handleCredito={handleCredito} />
          <Gioco creditoResiduo={creditoAttuale} vittoria={vittoria}/>
          <Credito creditoAttuale={creditoAttuale} creditoIniziale={creditoIniziale} />
        </>
      );

    }else {
      return(
        <>
          <Configurazione handleCredito={handleCredito} />
        </>
      );
    }


}

export default App;
