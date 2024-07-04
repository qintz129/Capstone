import React, { createContext, useState } from 'react';
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BuildPersona from './pages/BuildPersona';
import FeaturedAbilities from './pages/FeaturedAbilities';
import ChooseTopics from './pages/ChooseTopics';
import YourTopic from './pages/YourTopic';
import Chat from './pages/Chat';
import SavedPersona from './pages/SavedPersona';
import InterviewDetails from './pages/InterviewDetails';
import Avatar06 from './assets/images/avatar06.png';
import Avatar37 from './assets/images/avatar37.png';

export const ChatContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <BuildPersona />,
  },
  {
    path: "/featured-abilities",
    element: <FeaturedAbilities />
  },
  {
    path: "/choose-topics",
    element: <ChooseTopics />
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
    personals: [
      {
        id: 1,
        avatar: Avatar37,
        name: "Amy",
        age: 25,
        gender: "Female",
        occupation: "School Assistant",
        diagnosis: "Down Syndrome",
        hobbies: ["Reading Clubs", "Baking"],
        desc: "Hello! My name is Amy, and l'm 25 years old.l workas a School Assistant, where l get to help out withlots of different tasks and spend time with amazingstudents.I have Down syndrome, but I don't let thatdefine me-l love my job, enjoy meeting new people.and am always eager to learn new things.l'm happyto share more about my experiences and learn aboutyours too!"
      },
      {
        id: 2,
        avatar: Avatar06,
        name: "Bob",
        age: 27,
        gender: "Male",
        occupation: "School Assistant",
        diagnosis: "Down Syndrome",
        hobbies: ["Reading Clubs", "Baking"],
        desc: "Hello! My name is Bob, ....."
      },
    ],
    chats: [],
    favoritePersonals: [],
    markedQuestions: []
  })

  return (
    <div className="App">
      <ChatContext.Provider value={{ value, setValue }}>
        <RouterProvider router={router} />
      </ChatContext.Provider>
    </div>
  );
}

export default App;
