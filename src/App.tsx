import { useQuery } from 'react-query';

import { api, makeServer, User } from './api';

if (process.env.NODE_ENV) makeServer();

function App() {
  const { data: users, isLoading } = useQuery<User[]>('users', async () => {
    const { data } = await api.get('users');
    return data.users;
  });

  if (isLoading) return <p>Carregando...</p>;
  return (
    <ul>
      {users?.map((user) => {
        return (
          <li key={user.name}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.created_at}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
