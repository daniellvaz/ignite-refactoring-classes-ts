import { Route, Switch } from "react-router-dom";
import Casadinhas from "./pages/casadinhas";
import Dashboard from "./pages/dashboard";
import Encartes from "./pages/encartes";
import Informativos from "./pages/informativos";
import Notificacoes from "./pages/notificacoes";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/informativos" component={Informativos} />
      <Route path="/encartes" component={Encartes} />
      <Route path="/casadinhas" component={Casadinhas} />
      <Route path="/notificacoes" component={Notificacoes} />
    </Switch>
  );
}
