import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Routers from './routers';

const authLink = setContext((_, { headers }) => {
  const session = localStorage.getItem('vending_machine_admin_session_id');
  return {
    headers: {
      ...headers,
      'x-session-id': session ? session : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routers />
      </div>
    </ApolloProvider>
  );
}

export default App;
