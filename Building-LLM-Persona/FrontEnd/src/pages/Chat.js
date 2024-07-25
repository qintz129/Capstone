import { Box, Button, Card, CardContent, Popover, Typography } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useState, useRef } from 'react';
import { ChatContext } from '../App';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReplayIcon from '@mui/icons-material/Replay'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import EditIcon from '@mui/icons-material/Edit'; 


function Chat () {
  const [text, setText] = useState("");
  const { value, setValue } = useContext(ChatContext);
  let messagesEndRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null);  
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); 
  const hasAddedChat = useRef(false);
  

  const getInitialQuestions = (theme, skills) => {  
    let questions = [];
    switch (theme) {
      case 'education':
        questions = [
          "Here are the top questions about education that you may be interested in:",
          "1. What early interventions do you think are beneficial for children with Down syndrome?",
          "2. What challenges do you think might arise with traditional educational settings for children with Down syndrome?",
          "3. Can children with Down syndrome successfully participate in mainstream education?",
          "4. In your opinion,what specialized support services are essential for students with Down syndrome in educational settings?",
          "5. What role do you think extracurricular activities play in the education of children with Down syndrome?",
          "6. Can you give examples of the learning methods that are used by the Down Syndrome community?",
          "7. What mindsets can be helpful when schools and teachers are handling students with Down Syndrome?",
        ]; 
        break;
      case 'employment':
        questions = [
          "Here are the top questions about employment that you may be interested in:",
          "1. What advice can you offer for succeeding in a job?",
          "2. What features in a workplace make you feel more comfortable and productive?",
          "3. What are the most helpful resources or tools you used while searching for a job?",
          "4. What inspired you to pursue this career, and how did your training prepare you for the industry?",
          "5. What advice would you give to young people with Down Syndrome who want to find a job?",
          "6. What do you think about the types of jobs that are available to you?",  
          "7. What do you think about the opportunities for learning new skills at work for people with Down syndrome?",  
          "8. How do you incorporate your personal interests into your job, and how does that benefit your performance?", 
          "9. What do you think are the key factors that contribute to your success in your job position?"
        ]; 
        break;
      case 'family':
        questions = [
          "Here are the top questions about family that you may be interested in:",
          "1. In what ways can family members of people with Down Syndrome help their beloved ones with disabilities to master routines and skills?",
          "2. How can parents and sibilings contribute to their loved ones with Down Syndrome to own and operate their own business successfully?",
          "3. Can parents be the life-changing force of their children with Down Syndrome and how?",
          "4. How can parents aid their children with Down Syndrome to be more independent in their own lives?",
          "5. How can families support the development and well-being of children with Down Syndrome through medical, educational, and social means?",
        ]; 
        break;
    }   
    const skillTitles = skills.map(skill => skill.title);

    if (skillTitles.includes("Willingness to Learn") && theme === "education") { 
      questions.push(`${questions.length}. What do you think educators can do to support and enhance the willingness to learn in students with Down syndrome?`);   
    }  
    if (skillTitles.includes("Artistic/Athletic Skills") && theme === "education") { 
      questions.push(`${questions.length}. What is your opinion about how educational programs can enhance the development of artistic and athletic skills in students with Down syndrome?`);   
    } 
    if (skillTitles.includes("Persistence") && theme === "education") { 
      questions.push(`${questions.length}. Can students with Down syndrome attend college,especially those who demonstrate persistence?`);   
    } 
    if (skillTitles.includes("Memory Skills") && theme === "employment") { 
      questions.push(`${questions.length}. How do you manage to remember the detailed steps for different tasks during the work?`);   
    } 
    if (skillTitles.includes("Self-Advocacy") && theme === "employment") { 
      questions.push(`${questions.length}. How self-advocacy help you in the working environment?`);   
    } 
    if (skillTitles.includes("Teamwork") && theme === "employment") { 
      questions.push(`${questions.length}. How do you contribute to your team, and what do you think could improve your ability to contribute more effectively?`);   
    } 
    if (skillTitles.includes("Willingness to Learn") && theme === "employment") { 
      questions.push(`${questions.length}. What motivates you to learn new skills, especially those related to your job?`);   
    }  
    if (skillTitles.includes("Empathy and Kindness") && theme === "family") {  
      questions.push(`${questions.length}. How can a supportive family environment impact the development and self-esteem of children with Down Syndrome?`);   
    } 
    if (skillTitles.includes("Family Communication") && theme === "family") { 
      questions.push(`${questions.length}. What tools for example can people with Down Syndrome employ to keep their communications with their family members not living together?`);    
    } 
    if (skillTitles.includes("Positive Attitude") && theme === "family") { 
      questions.push(`${questions.length}. What positive effects can a child with Down Syndrome bring to their family, especially their sibilings?`); 
    }
    return questions;
  }; 

  const [preDefine, setPreDefine] = useState(() => getInitialQuestions(value.selectedPersona.theme, value.selectedPersona.selectedSkills));
  
  useEffect(() => {
    setPreDefine(getInitialQuestions(value.selectedPersona.theme, value.selectedPersona.selectedSkills));
  }, [value.selectedPersona]);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };         

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; 

  const handleOpenMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined; 

  const openMenu = Boolean(anchorMenu);
  const menuID = openMenu ? 'simple-popover' : undefined;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  } 

  const addChat = () => {
    const newChat = {
      id: value.selectedPersona.chats.length + 1,
      createDatetime: new Date(),
      messages: [ 
        {user: "assistant", content: value.selectedPersona.assistantMessage, datetime: new Date(), assistantMessage: true, new: true}
      ],
    } 

    console.log("New Chat:", newChat.messages); 

    setValue(prevValue => {
      const updatedSelectedPersona = {
        ...prevValue.selectedPersona,
        chats: [...prevValue.selectedPersona.chats, newChat] 
      };
    
      const updatedFavoritePersonas = prevValue.favoritePersonas.map(persona => {
        if (persona.id === prevValue.selectedPersona.id) {
          return updatedSelectedPersona;
        }
        return persona; 
      });
    
      return {
        ...prevValue,
        selectedPersona: updatedSelectedPersona,
        favoritePersonas: updatedFavoritePersonas, 
        currentChat: newChat
      };
    }); 

    // setValue(prevValue => ({
    //   ...prevValue,  
    //   // if the currentChat changes, the specific chat in the selectedPersona.chats should be updated, since they have the same reference
    //   selectedPersona: {
    //     ...prevValue.selectedPersona,
    //     chats: [...prevValue.selectedPersona.chats, 
    //       newChat 
    //     ] 
    //   }, 
    //   currentChat: newChat
    // }));
  } 

  const initializeChat = () => { 
    if (!hasAddedChat.current) { 
      console.log("Initialize new chat");
      addChat();
      hasAddedChat.current = true;   
    } 
  }

  useEffect(() => { 
    if (!hasAddedChat.current && (!value.selectedPersona.chats || value.selectedPersona.chats.length === 0)) {
    initializeChat();  
    } else { 
      setValue(prevValue => ({
        ...prevValue,
        currentChat: prevValue.selectedPersona.chats[prevValue.selectedPersona.chats.length - 1]
      }));
    }
  }, [])
  
  // Guarantee the latest message is always visible
  useEffect(() => {
    scrollToBottom()
  }, [value.currentChat && value.currentChat.messages.length, messagesEndRef.current]);


  const sendMessage = async (message) => {
    if (text || message) {
      const newUserMessage = {
        user: "user", 
        content: text || message, 
        datetime: new Date()
      };
      
      value.currentChat.messages.push(newUserMessage); 

      setValue(prevValue => {
        const updatedSelectedPersona = {
          ...prevValue.selectedPersona,
          chats: [...prevValue.selectedPersona.chats] 
        };
      
        const updatedFavoritePersonas = prevValue.favoritePersonas.map(persona => {
          if (persona.id === prevValue.selectedPersona.id) {
            return updatedSelectedPersona;
          }
          return persona; 
        });
      
        return {
          ...prevValue,
          selectedPersona: updatedSelectedPersona,
          favoritePersonas: updatedFavoritePersonas
        };
      });
      
      setText("");
  
      const requestBody = {
        theme: value.selectedPersona.theme.toLowerCase(),
        context: [{
          role: "system",
          content: value.selectedPersona.systemPrompt  
        },
        ...value.currentChat.messages.filter(msg => msg.user !== "pre-defined").map(msg => ({
          role: msg.user,  
          content: msg.content
        }))
      ]
      };

      console.log("Request Body:", JSON.stringify(requestBody, null, 2)); 

      try {
        const response = await fetch('http://localhost:8000/persona-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const responseData = await response.json();  
        console.log("Response Data:", responseData);

        const newLLMMessage = {
          user: "assistant",
          content: responseData.data.assistant_message.content,
          datetime: new Date().toISOString(),
          new: true, 
          assistantMessage: false,
        };   
  
        
        setTimeout(() => { 
          value.currentChat.messages.push(newLLMMessage); 
          // re render
          // setValue(prevValue => ({
          //   ...prevValue,
          //   selectedPersona: {
          //     ...prevValue.selectedPersona,
          //     chats: [...prevValue.selectedPersona.chats] 
          //   }
          // })); 
          setValue(prevValue => {
            const updatedSelectedPersona = {
              ...prevValue.selectedPersona,
              chats: [...prevValue.selectedPersona.chats] 
            };
          
            const updatedFavoritePersonas = prevValue.favoritePersonas.map(persona => {
              if (persona.id === prevValue.selectedPersona.id) {
                return updatedSelectedPersona;
              }
              return persona; 
            });
          
            return {
              ...prevValue,
              selectedPersona: updatedSelectedPersona,
              favoritePersonas: updatedFavoritePersonas
            };
          }); 

          setTimeout(() => {  
            newLLMMessage.new = false; 
          }, 1000) 
        }, 1000) 
        
      } catch (error) {
        console.error("Failed to fetch from API:", error);
        window.alert("There was a problem with the server. Please try again later.");
      } 
    }
  };

  const reGenerate = async () => {
    value.currentChat.messages.pop()
    setValue(prevValue => {
      const updatedSelectedPersona = {
        ...prevValue.selectedPersona,
        chats: [...prevValue.selectedPersona.chats] 
      };
    
      const updatedFavoritePersonas = prevValue.favoritePersonas.map(persona => {
        if (persona.id === prevValue.selectedPersona.id) {
          return updatedSelectedPersona;
        }
        return persona; 
      });
    
      return {
        ...prevValue,
        selectedPersona: updatedSelectedPersona,
        favoritePersonas: updatedFavoritePersonas
      };
    }); 

    const requestBody = {
      theme: value.selectedPersona.theme.toLowerCase(),
      context: [{
        role: "system",
        content: value.selectedPersona.systemPrompt  
      },
      ...value.currentChat.messages.filter(msg => msg.user !== "pre-defined").map(msg => ({
        role: msg.user,  
        content: msg.content
      }))
    ]
    }; 

    console.log("Regenerate Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch('http://localhost:8000/persona-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();   
      console.log("Response Data:", responseData); 
  
      const newLLMMessage = {
        user: "assistant",
        content: responseData.data.assistant_message.content,
        datetime: new Date(),
        new: true,  
        assistantMessage: false,
      };  

      setTimeout(() => {
        value.currentChat.messages.push(newLLMMessage); 
        // re render
        setValue(prevValue => {
          const updatedSelectedPersona = {
            ...prevValue.selectedPersona,
            chats: [...prevValue.selectedPersona.chats] 
          };
        
          const updatedFavoritePersonas = prevValue.favoritePersonas.map(persona => {
            if (persona.id === prevValue.selectedPersona.id) {
              return updatedSelectedPersona;
            }
            return persona; 
          });
        
          return {
            ...prevValue,
            selectedPersona: updatedSelectedPersona,
            favoritePersonas: updatedFavoritePersonas
          };
        });  

        setTimeout(() => {  
          newLLMMessage.new = false; 
        }, 1000)
      }, 1000) 
      
    } catch (error) {
      console.error("Failed to fetch from API:", error);
      window.alert("There was a problem with the server. Please try again later.");
    }
  };



  const summarize = (marked) => {
    setValue(prevValue => {
      const existingIndex = prevValue.summary.findIndex(item => item.persona.id === prevValue.selectedPersona.id);
      
      let newSummary = [];
      if (existingIndex !== -1) {
        newSummary = prevValue.summary.map((item, index) => {
          if (index === existingIndex) {
            return {
              ...item,
              messages: marked ? prevValue.selectedPersona.markedQuestions : prevValue.currentChat.messages
            };
          }
          return item;
        });
      } else {
        newSummary = [
          ...prevValue.summary || [],
          {
            id: prevValue.summary ? prevValue.summary.length + 1 : 1,
            persona: prevValue.selectedPersona,
            messages: marked ? prevValue.selectedPersona.markedQuestions : prevValue.currentChat.messages
          }
        ];
      }
  
      return {
        ...prevValue,
        summary: newSummary
      };
    });
  
    navigate("/saved-persona");
  }
  
  const markQuestion = (question) => {
    setValue(prevValue => {
      // Access markedQuestions inside selectedPersona
      if (!prevValue.selectedPersona.markedQuestions?.find(mq => mq.datetime === question.datetime)) {
        return {
          ...prevValue,
          selectedPersona: {
            ...prevValue.selectedPersona,
            markedQuestions: [...prevValue.selectedPersona.markedQuestions, question] // Update the nested markedQuestions
          }
        };
      }
      return prevValue;
    });
  
    setValue(prevValue => {
      const messageIndex = prevValue.currentChat.messages.findIndex(m => m.datetime === question.datetime);
      if (messageIndex !== -1 && messageIndex + 1 < prevValue.currentChat.messages.length) {
        const answer = prevValue.currentChat.messages[messageIndex + 1];
        // Access markedQuestions inside selectedPersona
        if (!prevValue.selectedPersona.markedQuestions?.find(mq => mq.datetime === answer.datetime)) {
          return {
            ...prevValue,
            selectedPersona: {
              ...prevValue.selectedPersona,
              markedQuestions: [...prevValue.selectedPersona.markedQuestions, answer] // Update the nested markedQuestions
            }
          };
        }
      }
      return prevValue;
    });
  }

  const handleDeleteQuestion = (index) => {
    setValue(prevValue => ({
      ...prevValue,
      selectedPersona: {
        ...prevValue.selectedPersona, 
        // (_, i) means the filter relies on the index of the array but not the value itself
        markedQuestions: prevValue.selectedPersona.markedQuestions.filter((_, i) => i !== index && i !== index + 1)
      }
    }));
  }
  
  const useTypewriter = (text, speed) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let i = 0; 
      // Timer
      let prevText = "";
      const typingInterval = setInterval(() => { 
        // Callback function
        if (i < text.length) { 
          // debugger;
          prevText = prevText + text.charAt(i);
          setDisplayText(prevText);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);

      return () => {
        clearInterval(typingInterval);
      };
    }, [text, speed]);

  return displayText;
};
  
  const Typewriter = ({ text, speed = 20 }) => {
    const displayText = useTypewriter(text, speed);
  
    return <p>{displayText}</p>;
  };  

  const isRecent = (chatDate) => {
    const now = new Date(); 
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7); 
  
    return new Date(chatDate) >= sevenDaysAgo;
  };

  return ( 
    <Box display="flex" height="100%"> 
      <Box p={2} sx={{backgroundColor: "#768259", width: 300}}>
        <Box display="flex" justifyContent="space-between">
          <PersonOutlineOutlinedIcon sx={{fontSize: 40}} /> 
          <Box>
            <IconButton onClick={handleOpenMenu} sx={{ fontSize: 40 }}>
              <MenuOutlinedIcon />
            </IconButton>
            <Popover
                  id={menuID}
                  open={openMenu}
                  anchorEl={anchorMenu}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }} 
                  sx={{
                    width: '220px' 
                  }}
                >
                  <Box width={200}>
                    <Box p={1} sx={{borderBottom: "1px solid #e1e1e1"}}>
                      <Button fullWidth variant="text" onClick={() => navigate("/")}>Build Persona</Button>
                    </Box>
                    <Box p={1} sx={{borderBottom: "1px solid #e1e1e1"}}>
                      <Button fullWidth variant="text" onClick={() => navigate("/interview-details/" + value.selectedPersona.id)}>Interview Details</Button>
                    </Box>  
                    <Box p={1}>
                      <Button fullWidth variant="text" onClick={() => navigate("/saved-persona")}>Persona Library</Button>
                    </Box> 
                  </Box>
              </Popover> 
            </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent="center"
          sx={{backgroundColor: "#61694d", margin: "20px", padding: 2, borderRadius: 10, color: "#FFF", fontSize: 20, fontWeight: 700, cursor: "pointer"}}
          onClick={addChat}
        >
          <AddOutlinedIcon />
          New Chat
        </Box>
        <Box>
          <Box color="rgba(255, 255, 255, 0.5)">Previous 7 Days</Box>
          <Box>
            {
              value.selectedPersona.chats.filter(chat => isRecent(chat.createDatetime)) 
              .map(chat => (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  key={chat.id}
                  color="#FFFFFF"
                  onClick={() => {
                    setValue({
                      ...value,
                      currentChat: chat
                    })
                  }}
                  sx={{
                    backgroundColor: value.currentChat.id === chat.id ? "rgba(255, 255, 255, 0.5)" : "transparent",
                    cursor: "pointer"
                  }}
                  borderRadius={1}
                  px={1}
                >
                  <ChatBubbleOutlineIcon sx={{fontSize: 16}} />
                  <Box sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    color: "#FFFFFF",
                    my: 1
                  }}>
                    {`Chat with ${value.selectedPersona.name} ${chat.id}`} 
                  </Box>
                </Box>
              ))
            }
          </Box>
        </Box>
        <Box>
          <Box color="rgba(255, 255, 255, 0.5)">Previous 30 Days</Box>
          <Box></Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" flex={1} height="100vh">
        <Box sx={{height: 80, backgroundColor: "#61694d"}}></Box>
        <Box display="flex" p={2} flex={1} gap={1} height="calc(100% - 80px)" boxSizing="border-box">
          <Box display="flex" flexDirection="column" position="relative" flex={1}>
            <Box p={2} borderRadius={2} sx={{backgroundColor: "#f1dab9", border: "1px solid #d8be9a", fontSize: 20 ,fontWeight: 600}}>{`Chat with ${value.selectedPersona.name} about ${value.selectedPersona.theme}`}</Box>
            <Box display="flex" flexDirection="column" mt={2} flex={1} mb={10} sx={{overflowY: "auto"}}>
              {
                value.currentChat && [{user: "pre-defined", content: preDefine, datetime: new Date()}, ...value.currentChat.messages].map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignSelf: message.user === "user" ? "flex-end" : "flex-start",
                      backgroundColor: "#f1dab9",
                      p: 2,
                      borderRadius: 2,
                      color: "#3f4469",
                      mb: 2,
                      maxWidth: "70%",
                      minWidth: 100
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: message.user === "user" ? "row-reverse" : "row",
                        alignItems: message.user === "user" ? "center" : "flex-start",
                        gap: 1,
                      }}
                    >
                      <AccountCircleIcon sx={{fontSize: 40}} />
                      {
                        Array.isArray(message.content) ?
                          <Box>
                            {
                              message.content.map((item, index1) =>
                                <Box
                                  sx={{cursor: index1 > 0 ? "pointer" : "default"}}
                                  mb={2}
                                  key={index1}
                                  onClick={() => {
                                    if (index1 > 0) {
                                      sendMessage(item.split(".")[1])
                                    }
                                  }}>
                                  {item}
                                </Box>
                              )}
                          </Box>
                          :
                          (message.user !== "user" && message.new && !message.assistantMessage) ? <Typewriter text={message.content} /> : message.content
                      }
                    </Box>
                    {
                      message.user === "user" ? (
                        <Box>
                          <BookmarkAddIcon sx={{cursor: "pointer"}} onClick={() => markQuestion(message)} /> 
                          <EditIcon sx={{cursor: "pointer"}} onClick={() => setText(message.content)} />   
                        </Box>
                      ) : (
                        !Array.isArray(message.content) && index === value.currentChat.messages.length-1 && !message.assistantMessage &&(
                          <Box>
                            <ReplayIcon sx={{cursor: "pointer"}} onClick={() => reGenerate(index)} />
                          </Box>
                        )
                      )
                    }
                  </Box>
                ))
              }
              <div style={{ float:"left", clear: "both" }} ref={messagesEndRef}></div>
            </Box>
              <Box display="flex" alignItems="center" position="absolute" left={0} bottom={5} width="100%">
                <Box flex={1} p={2} borderRadius="8px 0 0 8px" sx={{backgroundColor: "#f1dab9", border: "1px solid #d8be9a"}}>
                  <input 
                    style={{border: 'none', outline: 'none', background: 'none', width: "100%"}} 
                    value={text} 
                    onChange={e => setText(e.target.value)}  
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { 
                        e.preventDefault();  // prevent the default action (submit the form)
                        sendMessage();       
                      }
                    }}
                  />
              </Box>
              <Box 
                borderRadius="0 8px 8px 0" 
                sx={{
                  backgroundColor: text ? "#435334" : "#A9A9A9", 
                  color: "#ffffff", 
                  padding: "14px 16px", 
                  cursor: text ? "pointer" : "default" 
                }} 
                onClick={() => text && sendMessage()}
              >
            <SendIcon />
          </Box>
        </Box>
          </Box>
          <Box p={1} sx={{width: 380, height: "calc(100% - 16px)", backgroundColor: "#ebebbf", borderRadius: 2, overflowY: "auto"}}>
            <Box mb={1} sx={{color: "#39462c", fontSize: 30, fontWeight: 700}}>Documentation</Box>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" my={2}>
                <img src={value.selectedPersona.avatar} alt="Avatar" style={{height: 80}} />
              </Box>
              <Box fontSize={16} color="#7d7d7d" fontWeight={400}>
                <Box>Name: {value.selectedPersona.name}</Box>
                <Box>Age: {value.selectedPersona.age}</Box>
                <Box>Gender: {value.selectedPersona.gender}</Box>
                <Box>Occupation: {value.selectedPersona.occupation}</Box>
                <Box>Diagnosis: {value.selectedPersona.diagnosis}</Box>
              </Box> 
              <Box mt={2}>
                  <Box fontSize={18} fontWeight={700} mb={1}>Abilities:</Box>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {value.selectedPersona.selectedSkills && value.selectedPersona.selectedSkills.map(skill => (
                      <Box 
                        fontWeight={600} 
                        sx={{ backgroundColor: "#d6bc97", padding: 1, borderRadius: 3 }} 
                        key={skill.id}
                      >
                        {skill.title}
                      </Box>
                    ))}
                  </Box>
                </Box>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more" 
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Box>{value.selectedPersona.desc}</Box>
              </CardContent>
            </Collapse>
          </Card>
            <Box mb={2} mt={2} sx={{color: "#39462c", fontSize: 25, fontWeight: 700}}>Marked Questions</Box>
            <Box display="flex" flexDirection="column" gap={1} sx={{borderColor: "#d5e1bf", borderStyle: "solid", borderWidth: "1px 0", fontWeight: 500, color: "#1b2559"}} py={1}>
  {
    (value.selectedPersona.markedQuestions)
      .filter(question => question.user === 'user')
      .map((question, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center'}}> 
          <Box sx={{ marginRight: 2 }}>{question.content}</Box>
          <Button   
            startIcon={<DeleteIcon sx={{ color: 'gray' }}/>} 
            color="secondary"
            onClick={() => handleDeleteQuestion(index)} style={{ cursor: 'pointer' }}>
          </Button> 
          </Box>
          ))
          }
        </Box>
            <Box>
              <Box
                p={1}
                borderRadius={3}
                textAlign="center"
                sx={{
                  backgroundColor: "#f1dab9",
                  border: "1px solid #d8be9a",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
                onClick={handleClick}>
                Summarize your conversation
              </Box>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Box width={350}>
                  <Box p={1} sx={{borderBottom: "1px solid #e1e1e1"}}>
                    <Button fullWidth variant="text" onClick={() => summarize(false)}>Summarize all questions</Button>
                  </Box>
                  <Box p={1}>
                    <Button fullWidth variant="text" onClick={() => summarize(true)}>Summarize marked questions</Button>
                  </Box>
                </Box>
              </Popover>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box> 
    ) 
}

export default Chat
