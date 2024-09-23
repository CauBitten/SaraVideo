import NavBar from "../NavBar";
import UserRepos from "../repository/UserRepos";
import "../../styles/Overview.css";
import api from "../../api";
import { useEffect, useState } from 'react';

function Overview() {

    // Estado para armazenar os dados do usuário
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect para buscar os dados do usuário quando o componente for montado
    useEffect(() => {
        // Função assíncrona para buscar os dados
        const fetchUserData = async () => {
        try {
            const response = await api.get('/api/profile/'); 
            setUserData(response.data); 
            setLoading(false);
        } catch (err) {
            setError(err.message); // Em caso de erro, armazena a mensagem
            setLoading(false);
        }
        };

        fetchUserData(); // Chama a função ao carregar o componente
    }, []); // Array vazio significa que o useEffect roda apenas uma vez

    // Condicionais de carregamento e erro
    if (loading) return <p>Carregando dados do usuário...</p>;
    if (error) return <p>Erro ao carregar os dados: {error}</p>;
      
    return (
        <div>
            <NavBar />

            <div className="body-container">

                <div className="info-container">

                    <h2 className="user-title">Perfil do Usuário</h2>

                    {userData && (
                    <div className="user-info">

                        <p className="username"><strong>Username:</strong> {userData.username}</p>
                        <p className="email"><strong>Email:</strong> {userData.email}</p>
          
                    </div>
                    )}

                </div>

                <div className="user-repos">

                    <h2 className="repo-title">Repositórios</h2>

                    <div>
                        <UserRepos />
                    </div>

                </div>

                

            </div>

        </div>
    );
}

export default Overview;