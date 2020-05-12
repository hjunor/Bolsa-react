import React, {useState} from 'react';
import axios from 'axios';
import './styles.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';


export default function Form() {

const [bolsa, setBolsa] = useState([]);

const [nis, setNis] = useState ();

const [year, setYear] = useState ();

const [mouth, setMouth] = useState ();

const [render, setRender] = useState (false);

function List (){
  return(
      <>
        { bolsa.length === 0 
        ? <div className="mt-5 text-center"> Dados não confere para coleta de dados altere a data ou o NIS/CPF</div>
        : bolsa.map((bol) =>{
            return(
                <>
                    <h2 className="mt-5 text-center">Beneficiário</h2>
                    <table class="table">
                        <tbody>
                            <tr>
                            <th scope="row">Nome</th>
                            <td>{bol.name}</td>
                            </tr>
                            <tr>
                            <th scope="row">Cidade</th>
                            <td>{bol.city}</td>
                            </tr>
                            <tr>
                            <th scope="row">Dependentes</th>
                            <td>{bol.dependency}</td>
                            </tr>
                            <tr>
                            <th scope="row">Valor</th>
                            <td>R${bol.value},00</td>
                            </tr>
                            <tr>
                            <th scope="row">Data</th>
                            <td>{bol.date}</td>
                            </tr>
                            
                        </tbody>
                    </table>

                </>
            )
           
        })}

    </>
        )
}
async function handleSubmit(e){
       
    e.preventDefault();
 
    const respose = await axios.get(`http://www.transparencia.gov.br/api-de-dados/bolsa-familia-disponivel-por-cpf-ou-nis?codigo=${nis}&anoMesReferencia=${year}${mouth}&anoMesCompetencia=${year}${mouth}&pagina=1`)
   
    respose.data[0] === undefined 
    ? setBolsa([])
    : setBolsa([{
        id: respose.data[0].id,
        name : respose.data[0].titularBolsaFamilia.nome,
        city : respose.data[0].municipio.nomeIBGE,
        dependency : respose.data[0].quantidadeDependentes,
        value : respose.data[0].valor,
        date: respose.data[0].dataMesCompetencia,
    }]);

    console.log(bolsa)
     
  }

  console.log(render)

    return (

    <div>
        <h1 className="text-center">Consulta Bolsa Familía</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label >NIS/CPF</label>
            <input type="Number" className="form-control"  aria-describedby="emailHelp" onChange={(e) => setNis(e.target.value)} placeholder="CPF/NIS (sem máscara, somente números)"/>
        </div>
        <div className="form-group">
            <label >Ano</label>
            <input type="number" className="form-control" onChange={(e) => setYear(e.target.value)}  placeholder="Ano referênte"/>
        </div>
        <div className="form-group">
            <label >Mês</label>
            <input type="number" className="form-control" onChange={(e) => setMouth(e.target.value)}  placeholder="Mês referênte "/>
        </div>
        <div className="butox">
            <button type="submit" onClick={() => setRender(true)} className="btngren">Buscar</button>
        </div>
        </form>
         { render === true
           ? <List/>
           : <div></div>}
        
        
    </div>
    );
}
