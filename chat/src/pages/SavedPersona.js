import { useContext } from 'react';
import { ChatContext } from '../App';
import { Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SavedPersona () {
  const { value, setValue } = useContext(ChatContext);
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="stretch" justifyContent="space-evenly" flexWrap="wrap" gap={10} p={5}>
      {
        [value.selectedPersona, ...value.favoritePersonas].map((persona, index) => (
          <Box width={400} key={persona.id} onClick={() => navigate("/interview-details/" + persona.id)}>
            <Box fontSize={18} mb={2}>Saved Persona {index + 1}</Box>
            <Card sx={{height: "100%"}}>
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
                  <Box>Hobbies: {persona.hobbies}</Box>
                  <Box mt={3}>{persona.desc}</Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))
      }
    </Box>
  )
}

export default SavedPersona
