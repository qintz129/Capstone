import React, { createContext, useState } from 'react';
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BuildPersona from './pages/BuildPersona';
import YourTopic from './pages/YourTopic';
import Chat from './pages/Chat';
import SavedPersona from './pages/SavedPersona';
import InterviewDetails from './pages/InterviewDetails'; 

export const ChatContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <BuildPersona />,
  },
  {
    path: "/your-topic",
    element: <YourTopic />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/saved-persona",
    element: <SavedPersona />
  },
  {
    path: "/interview-details/:id",
    element: <InterviewDetails />
  },
]);

function App() {
  const [value, setValue] = useState({
    personas: [],
    favoritePersonas: [],
    summary:[]
  })

  return (
    <div className="App"> 
      <ChatContext.Provider value={{ value, setValue }}>  
        <RouterProvider router={router}/> 
      </ChatContext.Provider>
    </div>
  );
}

export default App;