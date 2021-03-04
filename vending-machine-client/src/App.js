import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import HomePage from './containers/HomePage';

const client = new ApolloClient({
  uri: 'http://localhost:4040/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <HomePage></HomePage>
      </div>
    </ApolloProvider>
  );
}

export default App;
