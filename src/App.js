import React, {useState, useEffect} from "react";

import "./styles.css";
import Header from './components/Header';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);  

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `Desafio03 - Conceitos React - ${new Date().toLocaleTimeString()}`,
      url: 'https://github.com/denisievers/bootcamp-desafio03-conceitos-react',
      techs: ["React"]
    };

    const response = await api.post('/repositories', newRepository);
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => 
        repository.id !== id
    ));
  }

  return (
    <div>
      <Header title="Repositories"/>
      <ul data-testid="repository-list">

        {
          repositories.map(repository => {
            return (
              <li key={repository.id}>{repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
