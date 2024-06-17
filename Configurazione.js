export default function Configurazione({handleCredito}){

    //Componente che permette all'utente di inserire il credito iniziale

    //Funzione che viene chiamata quando l'utente clicca sul bottone "Inizia a giocare"
    function ConfigonClick(){
        //Prende il valore inserito dall'utente
        let credito = document.getElementById("credito").value;
        
        
        //Verifico che il credito non sia vuoto

        if(credito === ""){
            alert("Inserisci un credito!");
            return;
        }

        //Imposto il campo input in modo che non possa essere modificato
        document.getElementById("credito").disabled = true;
        
        credito = parseInt(credito);


        handleCredito(credito);
    }

    return(

        <>
            <h1>Configurazione</h1>
            <p>Inserisci il credito iniziale</p>
            
            <input type="number" id="credito" name="credito" min="1" max="1000" step="1" />
            <button onClick={ConfigonClick}>Inizia a giocare</button>

        </>
    );

}