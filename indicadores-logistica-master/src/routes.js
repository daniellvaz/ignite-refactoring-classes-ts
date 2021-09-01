import DashboardVolumetria from "./pages/dashboardSeparacao";
import ControleOperacao from "./pages/controleOperacao";
import SystemParameters from "./pages/systemParameters";
import GerarVolumetria from "./pages/gerarVolumetria";
import DashboardVolumetriaPorLoja from "./pages/dashboardVolumetriaPorLoja";
import ControleProdutividade from "./pages/controleProdutividade";
import ControleOperacaoEmpilhadeira from "./pages/controleOperacaoEmpilhadeira";

var routes = [
  {
    path: "/dashboard-separacao",
    name: "Dashboard Separação",
    icon: "tim-icons icon-chart-pie-36",
    component: DashboardVolumetria,
    layout: "/separacao/admin"
  },
  {
    path: "/controle-operacao",
    name: "Média Mensal da Coleta",
    icon: "fas fa-chart-line",
    component: ControleOperacao,
    layout: "/separacao/admin"
  },
  {
    path: "/loja-dashboard-volumetria",
    name: "Volumetria por Loja",
    icon: "fas fa-chart-bar",
    component: DashboardVolumetriaPorLoja,
    layout: "/separacao/admin"
  },
  {
    path: "/controle-produtividade",
    name: "Controle de Produtividade",
    icon: "fas fa-cubes",
    component: ControleProdutividade,
    layout: "/separacao/admin"
  },
  {
    path: "/atividades-ressuprimento",
    name: "Atividades Ressuprimento",
    icon: "fas fa-forklift",
    component: ControleOperacaoEmpilhadeira,
    layout: "/separacao/admin"
  },
  {
    path: "/gerar-volumetria",
    name: "Gerar Volumetria",
    icon: "tim-icons icon-calendar-60",
    component: GerarVolumetria,
    layout: "/separacao/admin"
  },
  {
    path: "/parametros",
    name: "Parâmetros do Sistema",
    icon: "tim-icons icon-settings",
    component: SystemParameters,
    layout: "/separacao/admin"
  }
];
export default routes;
