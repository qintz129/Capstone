import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import Face6Icon from '@mui/icons-material/Face6';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useContext } from 'react';
import { ChatContext } from '../App';
import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom";
import MaleAvatar from "../assets/images/avatar06.png";
import FemaleAvatar from "../assets/images/avatar37.png";

function BuildPersona () {
  const [age, setAge] = useState("")
  const [occupation, setOccupation] = useState("")
  const [medicalCondition, setMedicalCondition] = useState("")
  const [theme, setTheme] = useState("")
  const [personaCreated, setPersonaCreated] = useState(false)

  const { value, setValue } = useContext(ChatContext);
  const navigate = useNavigate();

  const resetForm = () => {
    setAge("")
    setOccupation("")
    setMedicalCondition("")
    setTheme("")
    setPersonaCreated(false)
  }

  const selectPersona = (persona) => {
    setValue({
      ...value,
      selectedPersona: persona
    })
    navigate("/featured-abilities")
  }

  const createPersona = () => {
    const gender = faker.helpers.arrayElement(['Female', 'Male']); 
    const avatar = gender === 'Male' ? MaleAvatar : FemaleAvatar;

    const newPersona = {
      id: value.personas.length + 1,
      theme: theme,
      name: faker.person.fullName(),
      age: age,
      gender: gender,
      avatar: avatar,
      occupation: occupation,
      diagnosis: medicalCondition,
      hobbies: ["Reading Clubs", "Baking"],
      desc: faker.lorem.lines(4)
    };
    
    setValue({
      ...value,
      personas: [newPersona, ...value.personas]
    });

    setPersonaCreated(true);
    
  }

  const favoritePersona = (persona) => {
    let favoritePersonas = []
    if (value.favoritePersonas.find(p => p.id === persona.id)) {
      favoritePersonas = value.favoritePersonas.filter(p => p.id !== persona.id)
    } else {
      favoritePersonas = [...value.favoritePersonas, persona]
    }
    setValue({
      ...value,
      favoritePersonas
    })
  }

  return (
    <Box display="flex" alignItems="center" py={3} px={10} height="100vh" boxSizing="border-box" gap={10}>
      <Box flex={1}>
        <h2 style={{fontSize: 40}}>Build Your Persona</h2>
        <p>Fill in the details to create your personalized persona</p>
        <Box mb={3}>
          <Box mb={1} fontWeight={500}>Age</Box>
          <TextField
            fullWidth
            placeholder="Enter the age for your persona(1-100)"
            variant="outlined"
            size="small"
            sx={{backgroundColor: "white"}}
            age={age}
            onChange={e => setAge(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Box mb={1} fontWeight={500}>Occupation</Box>
          <FormControl fullWidth size="small">
            <Select
              value={occupation}
              onChange={e => setOccupation(e.target.value)}
              sx={{backgroundColor: "white"}}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Artist">Artist</MenuItem>
              <MenuItem value="Barista">Barista</MenuItem>
              <MenuItem value="School Assistant">School Assistant</MenuItem>
              <MenuItem value="Shop Assistant">Shop Assistant</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mb={3}>
          <Box mb={1} fontWeight={500}>Medical Condition</Box>
          <Select
            fullWidth
            size="small"
            value={medicalCondition}
            onChange={e => setMedicalCondition(e.target.value)}
            sx={{backgroundColor: "white"}}
          >
            <MenuItem value="Down Syndrome">Down Syndrome</MenuItem>
          </Select>
        </Box>
        <Box mb={12}>
          <Box mb={1} fontWeight={500}>Theme</Box>
          <Select
            fullWidth
            size="small"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            sx={{backgroundColor: "white"}}
          >
            <MenuItem value="Employment">Employment</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
        </Box>
        <Box display="flex" gap={1}>
          <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF"}} variant="outlined" onClick={resetForm}>Reset Form</Button>
          <Button sx={{backgroundColor: "#000"}} variant="contained" onClick={createPersona}>Create Persona</Button>
        </Box>
      </Box>
      <Box flex={1} overflow="hidden">
      {personaCreated ? (<Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {
            value.personas.map(persona => (
              <SwiperSlide key={persona.id}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 35,
                      height: 35,
                      backgroundColor: "#e6e6e6",
                      color: "#b8b8b8",
                      borderRadius: "50%"
                    }}
                  >
                    <Face6Icon />
                  </Box>
                  <Box fontSize={18} fontWeight={500}>Persona Profile</Box>
                </Box>
                <Box display="flex" justifyContent="center" my={2}>
                  <img src={persona.avatar} alt="Avatar" style={{height: 200}} />
                </Box>
                <Box fontSize={16} color="#7d7d7d" fontWeight={400}>
                  <Box>Name: {persona.name}</Box>
                  <Box>Age: {persona.age}</Box>
                  <Box>Gender: {persona.gender}</Box>
                  <Box>Occupation: {persona.occupation}</Box>
                  <Box>Medical Condition: {persona.diagnosis}</Box>
                  <Box>Theme:{persona.theme}</Box>
                  <Box mt={3}>{persona.desc}</Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Button color="secondary" onClick={() => selectPersona(persona)}>SELECT AND Next</Button>
                  <FavoriteIcon onClick={() => favoritePersona(persona)} sx={{color: value.favoritePersonas.find(p => p.id === persona.id) ? "red" : "black"}} />
                </Box>
              </SwiperSlide>
            ))
          }
        </Swiper>
        ) : (
          <Box style={{justifyContent: 'center', alignItems: 'center', height: '100%', width:'80%',fontSize: '20px', color: '#666'}}>
            <p>Welcome to our platform where you can customize and interact with your own persona. Dive deep into understanding the real-life experiences of target groups and engage with your personalized digital persona. </p>
            <p>Create your persona to begin the journey!</p>
          </Box>
          )}
      </Box>
    </Box>
  )
}

export default BuildPersona