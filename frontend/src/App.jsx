import { RouterProvider } from "react-router-dom";
import { JWTProvider as AuthProvider } from './contexts/JWTContext';
import router from "./routes";
import { SWRConfig } from 'swr';
import { swrConfig } from "config/swrConfig";

function App() {
  return (
    <> 
      <SWRConfig value={swrConfig}>   
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SWRConfig>
   
    </>
  );
}

export default App;
