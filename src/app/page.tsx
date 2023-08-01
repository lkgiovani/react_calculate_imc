"use client"

import { useState } from "react";
import styles from "./app.module.css"
import poweredImage from "./assets/powered.png"
import leftArrowImage from "./assets/leftarrow.png"
import { Level, calculateImc, levels } from "./helpers/imc";
import { GridItem } from "./components/GridItem";


function App() {
    const [heighField, setHeighField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow , setToShow] = useState<Level | null>(null);
    

    const handlerCalculateButton = () => {
        if (heighField && weightField) {
            setToShow(calculateImc(heighField, weightField));
        }else{
            alert("Digite todos os campos.")
        }
    }

    const handlerBackButton = () => {
        setToShow(null);
        setHeighField(0);
        setWeightField(0);
    }

    return (
    <div className={styles.main}>
        <header className={styles.headerContainer}>
            <div>
                <img src={poweredImage.src} alt="" width={150}/>
            </div>
        </header>
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <h1>Calcule o seu IMC</h1>
                <p>IMC é a sigla para índice de Massa Corpórea, Paramento adotado pela anvisa</p>
                <input 
                    type="number"  
                    placeholder="Digite a sua altura. Ex 1.5 (em metros)"
                    value={heighField > 0 ? heighField : ''} 
                    onChange={(e) => setHeighField(parseFloat(e.target.value))}
                    disabled={toShow ? true : false}
                />
                <input 
                    type="number"  
                    placeholder="Digite o seu peso. Ex 75.5 (em Kg)"
                    value={weightField > 0 ? weightField : ''} 
                    onChange={(e) => setWeightField(parseFloat(e.target.value))}
                    disabled={toShow ? true : false}
                    
                />
                <button onClick={handlerCalculateButton} disabled={toShow ? true : false}>Calcular</button>
            </div>
            <div className={styles.rightSide}>
                {!toShow &&
                    <div className={styles.grid}>
                        {levels.map((item, key) => (
                            <GridItem key={key} item={item}/>
                        ))}
                    </div>
                }
                {toShow && 
                    <div className={styles.rightBig}>
                        <div className={styles.rightArrow} onClick={handlerBackButton}>
                            <img src={leftArrowImage.src} alt="" width={25} />
                        </div>
                        <GridItem item={toShow}/>
                    </div>
                }
            </div>
        </div>
    </div>
  );
}

export default App;
