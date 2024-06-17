
//Componente che rappresenta il tavolo da gioco
export default function Tavolo({punteggio, carte, tipo}){

    //Il colore è rosso per il giocatore e verde per il banco
    let colore = tipo === "GIOCATORE" ? "red" : "green";

     //Tabella che mostra le carte del giocatore
    let carteTavolo = carte.map((carta, index) => {
        
        //Per ogni carta estratta dal giocatore creo un elemento <td> con il valore della carta
        //Se la carta vale 10 lo sfondo è giallo altrimenti è rosso

        //Creazione tabella

        let myStyle = {
            backgroundColor: carta === 10 ? "yellow" : colore,
            padding: "10px",
            border: "1px solid " + colore, 
        };

        return(
            <td key={index} style={myStyle} >{carta}</td>
        );
        


    });

    
    return(
        <>
            <h2>{tipo}</h2>
            <p>Punteggio: {punteggio}</p>
            <table>
                <tbody>
                    <tr>
                        {carteTavolo}
                    </tr>
                </tbody>
            </table>
        </>
    );

}