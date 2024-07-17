import { useContext } from 'react';
import { ChatContext } from '../App';
import { Box, Card, CardContent, Button, Typography} from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 
import NavigationBar from './NavigationBar';

function SavedPersona () {
  const { value, setValue } = useContext(ChatContext);
  const navigate = useNavigate(); 
  const allPersonas = [value.selectedPersona, ...value.favoritePersonas.filter(persona => persona.id !== value.selectedPersona.id)];  
  const incompletePersonas = allPersonas.filter(persona => !value.summary.some(item => item.persona.id === persona.id)); 
  const completePersonas = allPersonas.filter(persona => value.summary.some(item => item.persona.id === persona.id));  

  const handleStart = (persona) => { 
    setValue((prev) => ({
      ...prev,
      selectedPersona: persona,
    })); 
    navigate("/your-topic");
  } 

  return (  
    <> 
    <NavigationBar />
    <Box display="flex" flexDirection="column" gap={10} p={5}>
    <Box>
      <Typography variant="h6" mb={3}>Complete Personas</Typography>
      <Box display="flex" alignItems="stretch" flexWrap="wrap" gap={10}>
      {
        completePersonas.map((persona, index) => (
            <Box width={420} key={persona.id}>
              <Box fontSize={18} mb={2}>{persona.name}</Box>
              <Card sx={{height: "95%"}}>
                <CardContent>
                  <Box display="flex" justifyContent="center" my={2}>
                    <img src={persona.avatar} alt="Avatar" style={{height: 80}} />
                  </Box>
                  <Box fontSize={16} color="#7d7d7d" fontWeight={400}>
                    <Box>Name: {persona.name}</Box>
                    <Box>Age: {persona.age}</Box>
                    <Box>Gender: {persona.gender}</Box>
                    <Box>Occupation: {persona.occupation}</Box>
                    <Box>Diagnosis: {persona.diagnosis}</Box>
                    <Box mt={3}>{persona.desc}</Box>
                  </Box>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="secondary" onClick={() => navigate("/interview-details/" + persona.id)}>
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
        ))
      }
      </Box>
    </Box>
    <Box>
      <Typography variant="h6" mb={3}>Incomplete Personas</Typography>
      <Box display="flex" alignItems="stretch" flexWrap="wrap" gap={10}>
        {incompletePersonas.map((persona, index) => (
          <Box width={420} key={persona.id}>
              <Box fontSize={18} mb={2}>{`Saved Persona: ${persona.name}`}</Box>
              <Card sx={{height: "95%"}}>
                <CardContent>
                  <Box display="flex" justifyContent="center" my={2}>
                    <img src={persona.avatar} alt="Avatar" style={{height: 80}} />
                  </Box>
                  <Box fontSize={16} color="#7d7d7d" fontWeight={400}>
                    <Box>Name: {persona.name}</Box>
                    <Box>Age: {persona.age}</Box>
                    <Box>Gender: {persona.gender}</Box>
                    <Box>Occupation: {persona.occupation}</Box>
                    <Box>Diagnosis: {persona.diagnosis}</Box>
                    <Box mt={3}>{persona.desc}</Box>
                  </Box>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="secondary" onClick={() => handleStart(persona)}>
                      Start your Interview
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
        ))}
      </Box>
    </Box>
  </Box> 
  </>
  )
}

export default SavedPersona
