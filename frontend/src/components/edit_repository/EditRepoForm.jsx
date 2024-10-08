import { useState, useEffect } from "react";
import { Form, Input, Button, Typography, List, notification } from "antd";
import {  UserAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import api from "../../api";
import "../../styles/EditRepoForm.css";

const { Title } = Typography;

function EditRepoForm() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [newColaborador, setNewColaborador] = useState("");
  const [loading, setLoading] = useState(true);

  // Buscar detalhes do repositório e colaboradores
  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await api.get(`/api/repositorios/${id}/`);
        setRepo(response.data);
        console.log("Colaboradores:", response.data.colaboradores);
      } catch (error) {
        console.error("Erro ao buscar repositório:", error);
        notification.error({
          message: "Erro",
          description: "Erro ao buscar repositório.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [id]);

  // Enviar os dados de atualização do repositório
  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Atualiza o repositório
      await api.put(`/api/repositorios/${id}/update/`, values);
      const response = await api.get(`/api/repositorios/${id}/`);
      setRepo(response.data);
      notification.success({
        message: "Sucesso",
        description: "Repositório atualizado com sucesso.",
      });
    } catch (error) {
      notification.error({
        message: "Erro",
        description:
          error.response?.data?.error || "Erro ao atualizar o repositório.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserIdByUsername = async (username) => {
    try {
      const response = await api.get(`/api/users/?username=${username}`);
      const users = response.data;
      if (users.length > 0) {
        return users[0].id; // Assume que há um usuário correspondente
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar ID do usuário:", error);
      return null;
    }
  };

  const handleAddColaborador = async () => {
    if (!newColaborador) return;

    setLoading(true);
    try {
      // Obtenha o ID do novo colaborador
      const newColaboradorId = await getUserIdByUsername(newColaborador);
      if (!newColaboradorId) {
        notification.error({
          message: "Erro",
          description: "Usuário não encontrado.",
        });
        setLoading(false);
        return;
      }

      // Adicione o novo colaborador à lista existente
      const updatedColaboradores = [
        ...repo.colaboradores.map((c) => c.id),
        newColaboradorId,
      ];
      console.log("Dados enviados para atualização:", {
        colaboradores: updatedColaboradores,
      });

      // Atualize o repositório
      await api.put(`/api/repositorios/${id}/update/`, {
        colaboradores: updatedColaboradores,
      });

      // Atualize o repositório após adicionar o colaborador
      const updatedRepoResponse = await api.get(`/api/repositorios/${id}/`);
      setRepo(updatedRepoResponse.data);
      setNewColaborador("");
      notification.success({
        message: "Sucesso",
        description: "Colaborador adicionado com sucesso.",
      });
    } catch (error) {
      console.error("Erro na atualização:", error);
      notification.error({
        message: "Erro",
        description:
          error.response?.data?.error ||
          "Não foi possível adicionar o colaborador.",
      });
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
    <div className="rep-container">
      <Title className="titulo-container" level={2}>
        Editar Repositório
      </Title>

      <Form
        name="edit-repo"
        initialValues={{ nome: repo.nome, descricao: repo.descricao }}
        onFinish={handleSubmit}
      >

        <Form.Item
          name="nome"
          rules={[
            {
              required: true,
              message: "Por favor, insira o nome do repositório!",
            },
          ]}
        >
          <Input className="input-edit" placeholder="Nome do repositório" />
        </Form.Item>

          <div className="desc-update-container">
          <Form.Item name="descricao" rules={[{ required: false }]}>
            <Input.TextArea
              className="input-edit"
              placeholder="Descrição do repositório"
              style={{ width: "30rem" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="botao-atualizar"
              htmlType="submit"
              loading={loading}
            >
              Atualizar
            </Button>
          </Form.Item>
          </div>

      </Form>

      <div>
        <Title className="titulo-container" level={2}>
          Colaboradores
        </Title>

        <div className="add_colab-container">
          <Input
            placeholder="Digite o username"
            className="input-edit"
            value={newColaborador}
            onChange={(e) => setNewColaborador(e.target.value)}
          />
          <Button
            className="botao-colab"
            type="primary"
            onClick={handleAddColaborador}
            loading={loading}
            icon={<UserAddOutlined />}
          />
        </div>

        <List
          className="lista-colaboradores"
          itemLayout="horizontal"
          dataSource={repo.colaboradores || []}
          renderItem={(colaborador) => (
            <List.Item className="colaborador">
              <List.Item.Meta
                title={colaborador.username}
                description={colaborador.email || "E-mail não informado"}
              />
            </List.Item>
          )}
        />
        
      </div>
    </div>
  );
}

export default EditRepoForm;
