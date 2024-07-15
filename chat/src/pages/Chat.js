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

function Chat () {
  const [text, setText] = useState("");
  const { value, setValue } = useContext(ChatContext);
  let messagesEndRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null); 
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); 
  const hasAddedChat = useRef(false);
  const preDefine = ["Here are the top10 questions most people asked and you might fnd interesting:", 
                      "1. Can you tell us about your educational journey and how you became a school assistant?",  
                      "2. What are some accommodations or supports that helped you succeed in school?",  
                      "3. How do you think schools can better assist students with Down syndrome in theirlearning?",  
                      "4. Question 4",  
                      "5. Question 5", 
                      "6. Question 6",  
                      "7. Question 7"];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };         

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  } 

  const addChat = () => {
    const newChat = {
      id: value.selectedPersona.chats.length + 1,
      createDatetime: new Date(),
      messages: [
        { user: "pre-defined", content: preDefine, datetime: new Date() }
      ],
    }

    setValue(prevValue => ({
      ...prevValue,  
      // if the currentChat changes, the specific chat in the selectedPersona.chats should be updated, since they have the same reference
      selectedPersona: {
        ...prevValue.selectedPersona,
        chats: [...prevValue.selectedPersona.chats, 
          newChat 
        ] 
      }, 
      currentChat: newChat
    }));
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



  const sendMessage = (message) => {
    if (text || message) {
      value.currentChat.messages.push({
        user: "user", content: text || message, datetime: new Date()
      })
      setValue(prevValue => ({
        ...prevValue,
        selectedPersona: {
          ...prevValue.selectedPersona,
          chats: [...prevValue.selectedPersona.chats] 
        }
      }));
      setText("")

      setTimeout(() => {
        const newMessage = {
          user: "persona",
          content: faker.lorem.paragraph(),
          datetime: new Date(),
          new: true
        }
        value.currentChat.messages.push(newMessage)
        setValue(prevValue => ({
          ...prevValue,
          selectedPersona: {
            ...prevValue.selectedPersona,
            chats: [...prevValue.selectedPersona.chats] 
          }
        }));

        setTimeout(() => {
          newMessage.new = false
        }, 1000)
      }, 1000)
    }
  }

  const reGenerate = () => {
    value.currentChat.messages.pop()
    setValue(prevValue => ({
      ...prevValue,
      selectedPersona: {
        ...prevValue.selectedPersona,
        chats: [...prevValue.selectedPersona.chats] 
      }
    }));

    setTimeout(() => {
      const newMessage = {
        user: "persona",
        content: faker.lorem.paragraph(),
        datetime: new Date(),
        new: true
      }
      value.currentChat.messages.push(newMessage)
      setValue(prevValue => ({
        ...prevValue,
        selectedPersona: {
          ...prevValue.selectedPersona,
          chats: [...prevValue.selectedPersona.chats] 
        }
      }));

      setTimeout(() => {
        newMessage.new = false
      }, 1000)
    }, 1000)
  }

  const summarize = (marked) => {
    setValue(prevValue => {
      const existingIndex = prevValue.summary.findIndex(item => item.persona.id === prevValue.selectedPersona.id);
      
      let newSummary = [];
      if (existingIndex !== -1) {
        newSummary = prevValue.summary.map((item, index) => {
          if (index === existingIndex) {
            return {
              ...item,
              messages: marked ? prevValue.markedQuestions : prevValue.currentChat.messages.filter(message => message.user !== "pre-defined")
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
            messages: marked ? prevValue.markedQuestions : prevValue.currentChat.messages.filter(message => message.user !== "pre-defined")
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
      if (!prevValue.markedQuestions.find(mq => mq.datetime === question.datetime)) {
        return {
          ...prevValue,
          markedQuestions: [...prevValue.markedQuestions, question]
        };
      }
      return prevValue;  
    });  

    const EditQuestion = (question) => {    

    }
  

    setValue(prevValue => {
      const messageIndex = prevValue.currentChat.messages.findIndex(m => m.datetime === question.datetime);
      if (messageIndex !== -1 && messageIndex + 1 < prevValue.currentChat.messages.length) {
        const answer = prevValue.currentChat.messages[messageIndex + 1];
        if (!prevValue.markedQuestions.find(mq => mq.datetime === answer.datetime)) {
          return {
            ...prevValue,
            markedQuestions: [...prevValue.markedQuestions, answer]
          };
        }
      }
      return prevValue; 
    });
  } 

  const handleDeleteQuestion = (index) => {
    setValue(prevValue => ({
      ...prevValue,
      markedQuestions: prevValue.markedQuestions.filter((_, i) => i !== index && i !== index + 1)
    }));
  }
  
  const useTypewriter = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let i = 0; 
      // Timer
      const typingInterval = setInterval(() => { 
        // Callback function
        if (i < text.length) { 
          setDisplayText(prevText => prevText + text.charAt(i));
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

  const title = `Chat with ${value.selectedPersona.name} about ${value.selectedPersona.theme}`;   

  const isRecent = (chatDate) => {
    const now = new Date(); 
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7); 
  
    return new Date(chatDate) >= sevenDaysAgo;
  };
  console.log("selectedPersona", value.selectedPersona);

  return (
    <Box display="flex" height="100%">
      <Box p={2} sx={{backgroundColor: "#768259", width: 300}}>
        <Box display="flex" justifyContent="space-between">
          <PersonOutlineOutlinedIcon sx={{fontSize: 40}} />
          <MenuOutlinedIcon sx={{fontSize: 40}} />
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
            <Box p={2} borderRadius={2} sx={{backgroundColor: "#f1dab9", border: "1px solid #d8be9a", fontSize: 20 ,fontWeight: 600}}>{title}</Box>
            <Box display="flex" flexDirection="column" mt={2} flex={1} mb={10} sx={{overflowY: "auto"}}>
              {
                value.currentChat && value.currentChat.messages.map((message, index) => (
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
                          (message.user !== "user" && message.new) ? <Typewriter text={message.content} /> : message.content
                      }
                    </Box>
                    {
                      message.user === "user" ? (
                        <Box>
                          <BookmarkAddIcon sx={{cursor: "pointer"}} onClick={() => markQuestion(message)} />
                        </Box>
                      ) : (
                        !Array.isArray(message.content) && index === value.currentChat.messages.length-1 && (
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
            <Box display="flex" flexDirection="column" gap={1} sx={{borderColor: "#d5e1bf", borderStyle: "solid", borderWidth: "1px 0", fontWeight: 500, color: "#1b2559"}} py={3}>
  {
    value.markedQuestions
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
