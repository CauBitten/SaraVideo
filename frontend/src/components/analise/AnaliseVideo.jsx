/* eslint-disable react/prop-types */
import { FaTimesCircle, FaCheckCircle, FaClock } from 'react-icons/fa';
import "../../styles/AnaliseVideo.css";

function AnaliseVideo({ analise }) {
    if (!analise) {
        return (
            <div className='analise-container'>
                <p>Análise não disponível.</p>
            </div>
        );
    }

    return (
        <div className="analise-container">
            <h2>Análise do Vídeo</h2>
            <p>
                {analise.violencia_ocorreu 
                    ? <i className="violencia-icn"><FaTimesCircle /></i> 
                    : <i className="nao-violencia-icn"><FaCheckCircle /></i>}
                Violência ocorreu: <span>{analise.violencia_ocorreu ? 'Sim' : 'Não'}</span>
            </p>
            <p>
                {analise.violencia_contra_mulher 
                    ? <i className="violencia-icn"><FaTimesCircle /></i> 
                    : <i className="nao-violencia-icn"><FaCheckCircle /></i>}
                Violência contra mulher: <span>{analise.violencia_contra_mulher ? 'Sim' : 'Não'}</span>
            </p>
            {analise.duracao_violencia && (
                <>
                    <p>
                        <i className="time-icn"><FaClock /></i>
                        Duração da violência: <span>{analise.duracao_violencia}</span>
                    </p>
                    <p>
                        <i className="time-icn"><FaClock /></i>
                        Começo da violência: <span>{analise.comeco_violencia}</span>
                    </p>
                    <p>
                        <i className="time-icn"><FaClock /></i>
                        Final da violência: <span>{analise.final_violencia}</span>
                    </p>
                </>
            )}
        </div>
    );
}

export default AnaliseVideo;
