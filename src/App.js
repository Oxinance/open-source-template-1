import './App.css';
import {AuthProvider} from "./AuthContext";
import {useRoutes} from "react-router-dom";
import routes from "./navigation/routes";

function App(props) {

    const content = useRoutes(routes);

    return (
        <AuthProvider projectKey={props.dataset.projectkey}>
            {content}
        </AuthProvider>
    );
}

export default App;
