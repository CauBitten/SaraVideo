import { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const { Title } = Typography;

function EditRepoForm() {
    const { id } = useParams();
    const [repo, setRepo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRepo = async () => {
            try {
                const response = await api.get(`/api/repositorios/${id}/`);
                setRepo(response.data);
            } catch (error) {
                console.error("Erro ao buscar repositório:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepo();
    }, [id]);

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            await api.put(`/api/repositorios/${id}/update/`, values);
            navigate(`/repositorios/${id}`);
        } catch (error) {
            alert('Erro ao atualizar repositório');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!repo) {
        return <p>Repositório não encontrado.</p>;
    }

    return (
        <div className="form-container">
            <Title level={2}>Editar Repositório</Title>
            <Form
                name="edit-repo"
                initialValues={{ nome: repo.nome, descricao: repo.descricao }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="nome"
                    rules={[{ required: true, message: 'Por favor, insira o nome do repositório!' }]}
                >
                    <Input placeholder="Nome do repositório" />
                </Form.Item>
                
                <Form.Item
                    name="descricao"
                    rules={[{ required: false }]}
                >
                    <Input.TextArea placeholder="Descrição do repositório" />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Atualizar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditRepoForm;
