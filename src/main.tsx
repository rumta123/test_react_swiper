import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Desktop } from './Components/Dectop/Desktop';
import { Mobile } from './Components/Mobile/Mobile';
import { useIsMobile } from "./hooks/useIsMobile";
import "./styles/swiper.css";
import './styles/global.scss';
export const App = () => {
  const isMobile = useIsMobile(768);
  return (
    <Provider store={store}>
      {isMobile ? <Mobile /> : <Desktop />}
    </Provider>
  );
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
