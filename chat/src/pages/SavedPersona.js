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
        [value.selectedPersonal, ...value.favoritePersonals].map((personal, index) => (
          <Box width={400} key={personal.id} onClick={() => navigate("/interview-details/" + personal.id)}>
            <Box fontSize={18} mb={2}>Saved Personal {index + 1}</Box>
            <Card sx={{height: "100%"}}>
              <CardContent>
                <Box display="flex" justifyContent="center" my={2}>
                  <img src={personal.avatar} alt="Avatar" style={{height: 80}} />
                </Box>
                <Box fontSize={16} color="#7d7d7d" fontWeight={400}>
                  <Box>Name: {personal.name}</Box>
                  <Box>Age: {personal.age}</Box>
                  <Box>Gender: {personal.gender}</Box>
                  <Box>Occupation: {personal.occupation}</Box>
                  <Box>Diagnosis: {personal.diagnosis}</Box>
                  <Box>Hobbies: {personal.hobbies}</Box>
                  <Box mt={3}>{personal.desc}</Box>
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
