import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import Category from "./pages/Category";
import Homepage from "./pages/Homepage";
import ReviewDetails from "./pages/ReviewDetails";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/details/:id">
              <ReviewDetails />
            </Route>
            <Route exact path="/category/:id">
              <Category />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
