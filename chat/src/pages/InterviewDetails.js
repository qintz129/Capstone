import { useParams } from 'react-router-dom';
import { Box, Button} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../App';
import backgroundImage from "../assets/images/bg.jpg"; 
import TextField from '@mui/material/TextField'; 
import { useNavigate } from 'react-router-dom';


function InterviewDetails () { 
  const navigate = useNavigate();
  const { id } = useParams()

  const { value, setValue } = useContext(ChatContext); 
  const [designGoal, setDesignGoal] = useState(''); 

  let allPersonas = value.summary.map(item => item.persona);
  allPersonas = [...allPersonas, ...value.favoritePersonas];
  const matchedPersona = allPersonas.find(p => p.id === Number(id)); 
  const matchedMessage = value.summary.find(item => item.persona.id === Number(id))?.messages; 
  console.log("summary", value.summary); 

  const handleEdit = () => { 
    setValue((prev) => ({
      ...prev,
      selectedPersona: matchedPersona,
      favoritePersonas: prev.favoritePersonas.filter(persona => persona.id !== matchedPersona.id)
    })); 
    navigate("/your-topic");
  }
  return (
    <Box display="flex" p={5} gap={5}>
      {
        matchedPersona && (
          <Box
            flex={1}
            sx={{
              backgroundColor: '#fff',
              border: "10px solid #e1e1e1",
              borderRadius: 2,
              p: 2
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
              value={designGoal}
              onChange={(e) => setDesignGoal(e.target.value)}
              variant="outlined"
              size="small"  
              multiline  
              minRows={1}
              maxRows={4}
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
      <Box
          flex={1}
          sx={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover"
          }}
          p={4}
        >
        <Box fontSize={18} fontWeight={700} mb={2}>Interview Summary</Box>
        {
          (matchedMessage && matchedMessage.length > 0) && (
            matchedMessage.map((message, index) => (
              <Box key={index} mb={2}>
                {message.user === "persona" ? `${matchedPersona.name}: ` : ''}
                <span style={{ fontWeight: message.user === "user" ? 'bold' : 'normal' }}>
                    {message.content}
                </span>
              </Box>
            ))
          )
        }
      </Box> 
      <Box justifyContent="center" mt={5}>
        <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", height: 50, width: 250}} variant="outlined" onClick={handleEdit}>Restart your interview</Button> 
      </Box>
    </Box>
  )
}

export default InterviewDetails
