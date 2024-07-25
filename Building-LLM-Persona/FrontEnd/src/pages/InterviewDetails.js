import { useParams } from 'react-router-dom';
import { Box, Button} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../App';
import backgroundImage from "../assets/images/bg.jpg"; 
import TextField from '@mui/material/TextField'; 
import { useNavigate } from 'react-router-dom'; 
import NavigationBar from './NavigationBar'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton'; 
import Typography from '@mui/material/Typography';
import { faker } from '@faker-js/faker';

function InterviewDetails () { 
  const navigate = useNavigate();
  const { id } = useParams()

  const { value, setValue } = useContext(ChatContext);   
  const [showTextField, setShowTextField] = useState(false); 
  const filteredPersonas = value.summary.map(item => item.persona).filter(persona => persona.id !== value.selectedPersona.id);
  const allPersonas = [value.selectedPersona, ...filteredPersonas];  
  const foundPersona = allPersonas.find(p => p.id === Number(id));  
  const [matchedPersona, setMatchedPersona] = useState(foundPersona); 
  const matchedMessage = value.summary.find(item => item.persona.id === Number(id))?.messages;    
  const matchedDetailText = value.summary.find(item => item.persona.id === Number(id))?.detailText;   
  const matchedSummaryText = value.summary.find(item => item.persona.id === Number(id))?.summaryText;
  const [confirmed, setConfirmed] = useState(() => { 
    if (value.summary.find(item => item.persona.id === Number(id))?.confirmed) {
      return true;
    } else { 
      return false;
    }
  }
); 
  const [detailText, setDetailText] = useState(() => {
    if (matchedDetailText) {
      return matchedDetailText;
    } 
    else {
      console.log("matchedmessage",matchedMessage);
      return matchedMessage ? matchedMessage.map(message => 
        `${message.user === "assistant" ? matchedPersona.name + ': ' : 'You: '}${message.content}`
      ).join('\n\n') : '';
    }
  });  
  const [summaryText, setSummaryText] = useState(() => { 
    if (matchedSummaryText) { 
      return matchedSummaryText; 
    } else {  
      return `A summary for ${value.selectedPersona.name} about ${value.selectedPersona.theme} is under development...` 
    } 
  }); 
  
  const [expanded, setExpanded] = useState(false); 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  
  const handleDesignGoalChange = (event) => {
    setMatchedPersona(prev => ({
      ...prev, 
      designGoal: event.target.value 
    }));
  }; 

  const handleSave = () => {
    if (window.confirm("Do you want to save this interview script? Once saved, you cannot edit it anymore.")) { 
      setConfirmed(true);
      setValue((prev) => ({
        ...prev, 
        selectedPersona: matchedPersona,
        summary: prev.summary.map(item => 
          item.persona.id === matchedPersona.id 
            ? { ...item, persona: matchedPersona, detailText: detailText, summaryText:summaryText, confirmed: true } 
            : item 
        )
      }));  
    }
  }

  const handleEdit = () => {  
    if (window.confirm("Do you want to restart this interview? Once restarted, you will lose changes you made in your interview script.")) {
    setValue((prev) => ({
      ...prev,
      selectedPersona: matchedPersona,
      // favoritePersonas: prev.favoritePersonas.filter(persona => persona.id !== matchedPersona.id)
    })); 
    navigate("/your-topic"); 
      }
  }  

  console.log("matchedPersona",matchedPersona);   
  console.log("selectedPersona",value.selectedPersona);
  return (
    <Box>  
      <NavigationBar />
     <Box display="flex" p={5} gap={3}> 
      <Box flex={1}>
      {
        matchedPersona && (
          <Box
            flex={1} 
            mb={2}
            sx={{
              backgroundColor: '#fff',
              border: "10px solid #e1e1e1",
              borderRadius: 2,
              p: 2,   
              height: "fit-content"
            }}
          >
            <Box display="flex" justifyContent="center" my={2}>
              <img src={matchedPersona.avatar} alt="Avatar" style={{height: 200}} />
            </Box>
            <Box fontSize={30} fontWeight={700} textAlign="center">{matchedPersona.name}</Box>
            <Box display="flex" justifyContent="center" alignItems="center" p={2} mb={2} sx={{borderBottom: "4px solid #e1e1e1"}}>
              <Box px={2} sx={{borderRight: "1px solid #e1e1e1"}}>{matchedPersona.diagnosis}</Box>
              <Box px={2}>{matchedPersona.gender}</Box>
            </Box>
            <Box fontSize={16} color="#7d7d7d" fontWeight={400}>
              <Box display="flex" alignItems="center" gap="4px">Age: <Box fontWeight={700}>{matchedPersona.age}</Box></Box>
              <Box display="flex" alignItems="center" gap="4px">Occupation: <Box fontWeight={700}>{matchedPersona.occupation}</Box></Box>
              <Box mt={3}>{matchedPersona.desc}</Box>
            </Box>
          </Box>
        )
      } 
      {/* flex=1 makes the component flexible in both growing to fill unused space and shrinking if necessary */}
      <Box flex={1}> 
        <Box sx={{backgroundColor: "#ced3da"}} p={2}>
          <Box sx={{fontSize: 30, fontWeight: 700}} mb={4}>Background</Box>
          <Box display="flex" alignItems="center" mb={2} gap="4px">Interview Topic: <Box fontWeight={700}>{matchedPersona.theme}</Box></Box>
            <Box mb={2} gap="4px"> 
              Focused Abilities:  
              <Box fontWeight={700}> 
                {matchedPersona.selectedSkills ? matchedPersona.selectedSkills.map(skill => skill.title).join(", ") : ''}
              </Box>
            </Box> 
          <Box display="flex" flexDirection="column" mb={2} gap="4px"> 
            Design Goal:  
              <TextField
              value={matchedPersona.designGoal}
              onChange={handleDesignGoalChange}
              variant="outlined"
              size="small"  
              multiline  
              minRows={1}
              maxRows={4} 
              disabled={confirmed}
              InputProps={{
                sx: {
                  fontWeight: 'bold', 
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)' 
                  },
                }
              }}
            />
          </Box>
        </Box>
      </Box> 
      </Box>
      <Box
          flex={1}
          sx={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover", 
            height: "fit-content"
          }}
          p={2}
        >
        <Box> 
          <Box fontSize={30} fontWeight={700} mb={4}>Interview Script</Box>
          <Box fontSize={18} fontWeight={500} mb={2} onClick={() => setShowTextField(!showTextField)} style={{ cursor: 'pointer' }}>
            
            <TextField
                fullWidth
                multiline
                rows={5}
                variant="outlined"
                defaultValue={summaryText}  
                disabled={confirmed}
                onChange={(e) => setSummaryText(e.target.value)}
              />
          </Box>  
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more" 
              >
                <ExpandMoreIcon />
              </IconButton>   
              <Typography variant="subtitle1">Show Details</Typography>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <TextField
                fullWidth
                multiline
                rows={30}
                variant="outlined"
                defaultValue={detailText}  
                disabled={confirmed}
                onChange={(e) => setDetailText(e.target.value)}
              />
          </Collapse>
      </Box>
        </Box>  
      </Box>
      <Box justifyContent="center" display="flex" gap={10} mb={3}>
        <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", height: 50, width: 250}} variant="outlined" onClick={handleEdit}>Restart your interview</Button>  
        <Button sx={{backgroundColor: "#000", height: 50, width: 250}} variant="contained" onClick={handleSave} disabled={confirmed}>Save Interview</Button>  
      </Box> 
    </Box>
  )
}

export default InterviewDetails
