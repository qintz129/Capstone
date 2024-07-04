import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { ChatContext } from '../App';
import backgroundImage from "../assets/images/bg.jpg";

function InterviewDetails () {
  const { id } = useParams()

  const { value, setValue } = useContext(ChatContext);

  const matchedPersonal = [value.selectedPersonal, ...value.favoritePersonals].find(p => p.id === Number(id))

  return (
    <Box display="flex" p={5} gap={5}>
      {
        matchedPersonal && (
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
              <img src={matchedPersonal.avatar} alt="Avatar" style={{height: 200}} />
            </Box>
            <Box fontSize={30} fontWeight={700} textAlign="center">{matchedPersonal.name}</Box>
            <Box display="flex" justifyContent="center" alignItems="center" p={2} mb={2} sx={{borderBottom: "4px solid #e1e1e1"}}>
              <Box px={2} sx={{borderRight: "1px solid #e1e1e1"}}>{matchedPersonal.diagnosis}</Box>
              <Box px={2}>{matchedPersonal.gender}</Box>
            </Box>
            <Box fontSize={16} color="#7d7d7d" fontWeight={400}>
              <Box display="flex" alignItems="center" gap="4px">Age: <Box fontWeight={700}>{matchedPersonal.age}</Box></Box>
              <Box display="flex" alignItems="center" gap="4px">Occupation: <Box fontWeight={700}>{matchedPersonal.occupation}</Box></Box>
              <Box display="flex" alignItems="center" gap="4px">Hobbies: <Box fontWeight={700}>{matchedPersonal.hobbies}</Box></Box>
              <Box mt={3}>{matchedPersonal.desc}</Box>
            </Box>
          </Box>
        )
      }
      <Box flex={1}>
        <Box sx={{backgroundColor: "#ced3da"}} p={2}>
          <Box sx={{fontSize: 30, fontWeight: 700}} mb={4}>Background</Box>
          <Box display="flex" alignItems="center" mb={2} gap="4px">InterView Topic: <Box fontWeight={700}>{value.selectedTopics.title}</Box></Box>
          <Box display="flex" alignItems="center" mb={2} gap="4px">Design Goal: <Box fontWeight={700}></Box></Box>
          <Box mb={2} gap="4px">Focused Abilities: <Box fontWeight={700}>{value.selectedSkills.map(skill => skill.title).join(", ")}</Box></Box>
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
        <Box fontSize={18} fontWeight={700} mb={2}>Questions</Box>
        {
          value.currentChat.messages.map((message, index) => (
            <Box key={index} mb={2}>{message.user === "user" ? `Q${(index+1) / 2}` : message.user.name}: {message.content}</Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default InterviewDetails
