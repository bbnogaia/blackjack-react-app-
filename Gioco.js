import React from 'react';

import Tavolo from './Tavolo';

export default function Gioco({creditoResiduo, vittoria}){

    const [punteggioBanco, setPunteggioBanco] = React.useState(0);
    const [punteggioGiocatore, setPunteggioGiocatore] = React.useState(0);
    const [carteGiocatore, setCarteGiocatore] = React.useState([]);
    const [carteBanco, setCarteBanco] = React.useState([]);
    const [puntata, setPuntata] = React.useState(0);
    //Stato che indica se la partita è terminata
    const [isFinished, setIsFinished] = React.useState(false);

    //Inizializzo un array di 2 elementi a false
    const [blackjack, setBlackjack] = React.useState([false,false]);

    function pescaCarta(){
        //Pesco un numero casuale tra 1 e 13
        let valore = Math.floor(Math.random() * 13) + 1;
        //Se il valore è 11, 12 o 13 allora lo imposto a 10
        if(valore > 10){
            valore = 10;
        }

        return valore;
    }

    function pescaGiocatore(){
        //Pesco una carta per il giocatore
        let valore = pescaCarta();
        console.log("GIOCATORE : Carta estratta: ", valore);

        let carte = [...carteGiocatore, valore];
        console.log("Carte Banco : ",carte)
        setCarteGiocatore(carte);

        let punteggio = punteggioGiocatore + valore;

        
        //Controllo blackjack
        if(carte.length === 2 && punteggio === 21){
            let newBlackjack = [...blackjack];
            newBlackjack[0] = true;
            setBlackjack(newBlackjack);

            passaTurno();
        }


        
        //Se il punteggio del giocatore è maggiore di 21 allora ha perso
        if(punteggio > 21){
            vittoria(false,puntata);
            setIsFinished(true);
        }

        //Aggiorno il punteggio del giocatore
        setPunteggioGiocatore(punteggio);
        
    }

    function passaTurno(){

        //Ciclo finchè il punteggio del banco è minore di 17

        let punteggio = punteggioBanco;
        let carte = [...carteBanco];
        while(punteggio < 17){

            //Pesco una carta per il banco
            let valore = pescaCarta();
            console.log("BANCO : Carta estratta: ", valore);

            carte.push(valore);

            
            console.log("Carte Banco : ",carte)
            
            punteggio += valore;
            
        }
        setCarteBanco(carte);
        setPunteggioBanco(punteggio);

        
        //Controllo blackjack
        if(carte.length === 2 && punteggio === 21){
            let newBlackjack = [...blackjack];
            newBlackjack[1] = true;
            setBlackjack(newBlackjack);
        }
        
        
        //Verifico se il banco ha perso
        let win = false;
        if(punteggio > 21 || punteggioGiocatore > punteggio || (blackjack[0] && !blackjack[1]) ){
            win = true;
        }
        setIsFinished(true);

        //Verifico il pareggio (punteggi uguali)
        //Se entrambi non hanno fatto blackjack o se entrambi lo hanno fatto

        if((punteggio === punteggioGiocatore) && (blackjack[0] === blackjack[1])){
            return;
        }

        vittoria(win,puntata);
        
        
    }

    //Funzione che resetta il gioco
    function reset(){

        //Verifico se il giocatore dispone ancora di credito

        if(creditoResiduo <= 0){
            alert("Hai finito il credito!");
            return;
        }

        setPunteggioBanco(0);
        setPunteggioGiocatore(0);
        setCarteGiocatore([]);
        setCarteBanco([]);
        setPuntata(0);
        setIsFinished(false);

        
    }

    function handlePuntata(){
        let puntata = document.getElementById("puntata").value;
        puntata = parseInt(puntata);
        console.log("Puntata: ", puntata)
        if(isNaN(puntata)){
            alert("Inserisci una puntata!");
            return;
        }

        if(puntata > creditoResiduo){
            alert("Non hai abbastanza credito!");
            return;
        }

        
        setPuntata(puntata);
    }


    //Rendering condizionale

    if(puntata === 0){
        
        //Inserimento puntata

        return(
            <>
                <h1>Blackjack</h1>
                <h2>Inserisci la puntata</h2>
                <p>Credito residuo: {creditoResiduo}</p>
                <input type="number" id="puntata" name="puntata" min="1" max={creditoResiduo} step="1" />
                <button onClick={handlePuntata}>Conferma</button>
            </>
        );
    
    }


    if(isFinished){
        let messaggio = "Hai vinto!";
        if((punteggioGiocatore > 21) || (punteggioBanco > punteggioGiocatore) && (punteggioBanco <= 21) ){
            messaggio = "Hai perso!";
        }
        else if((punteggioBanco === punteggioGiocatore) && (blackjack[0] === blackjack[1])){
            messaggio = "Pareggio!";
        }

        return(
            <>

                <h1>Blackjack</h1>
                <h2>Partita terminata, {messaggio} </h2>
                <p>Punteggio giocatore: {punteggioGiocatore}</p>
                <Tavolo punteggio={punteggioGiocatore} carte={carteGiocatore} tipo="GIOCATORE" />

                <p>Punteggio banco: {punteggioBanco}</p>
                <Tavolo punteggio={punteggioBanco} carte={carteBanco} tipo="BANCO" />

                <button onClick={reset}>Nuova partita</button>

            </>

        );
    }
    
    return(
        <>
            <h1>Blackjack</h1>
            <h2>Gioco in corso</h2>
            <Tavolo punteggio={punteggioGiocatore} carte={carteGiocatore} tipo="GIOCATORE" />

            <Tavolo punteggio={punteggioBanco} carte={carteBanco} tipo="BANCO" />

            <p>Puntata: {puntata}</p>

            <button onClick={pescaGiocatore}>Pesca carta</button>
            <button onClick={passaTurno}>Passa turno</button>

        </>
    );
    

    

}

