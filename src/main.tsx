import { createRoot } from 'react-dom/client'
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import App from './App.tsx'
import 'flag-icons/css/flag-icons.min.css'
import './index.css'

createRoot(document.getElementById("root")!).render(
    <I18nextProvider i18n={i18n}>
        <App />
    </I18nextProvider>
);