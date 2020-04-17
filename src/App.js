import React from "react";
import api from "./services/api";

import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get("repositories");
      setRepositories(response.data);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    const repos = repositories.filter((repository) => repository.id !== id);

    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <li key={index}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
