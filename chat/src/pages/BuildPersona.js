import { Box, FormControl, Select, MenuItem, TextField, Autocomplete, Button } from '@mui/material';
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
  const occupations = [
    "Artist",  
    "Athlete", 
    "Baker",
    "Business Owner",
    "Customer Service", 
    "Cooker",
    "School Assistant",
    "Shop Assistant",   
    "Office Assistant",  
    "Social Activist",
    "Student",   
    "Teacher", 
  ]; 

  const { value, setValue } = useContext(ChatContext);
  const navigate = useNavigate();

  // const resetForm = () => {
  //   setAge("")
  //   setOccupation("")
  //   setMedicalCondition("")
  //   setTheme("")
  // }

  const selectPersona = (persona) => {
    const isNewFavorite = value.favoritePersonas.every(p => p.id !== persona.id);
    const isInSummary = value.summary.some(item => item.persona.id === persona.id);
  
    setValue({
      ...value,
      selectedPersona: persona,
      favoritePersonas: isNewFavorite ? [...value.favoritePersonas, persona] : value.favoritePersonas,
      summary: isInSummary ? value.summary.filter(item => item.persona.id !== persona.id) : value.summary
    }); 
  }

  const createPersona = () => {  
    if (!age || !occupation || !medicalCondition || !theme) { 
      window.alert("Please fill in age, medicalCondition and theme to create a persona."); 
      return; 
    }
    const gender = faker.helpers.arrayElement(['Female', 'Male']); 
    const avatar = gender === 'Male' ? MaleAvatar : FemaleAvatar; 
    const ageRange = age.split('-');
    const minAge = parseInt(ageRange[0], 10);
    const maxAge = parseInt(ageRange[1], 10);
    const randomAge = Math.floor(Math.random() * (maxAge - minAge + 1) + minAge);

    const newPersona = {
      id: value.personas.length + 1,
      theme: theme,
      name: faker.person.firstName(gender === 'Male'?'male':'female'),
      age: randomAge,
      gender: gender,
      avatar: avatar,
      occupation: occupation,
      diagnosis: medicalCondition,
      desc: faker.lorem.lines(10), 
      chats:[], 
      markedQuestions:[]
    };
    
    setValue({
      ...value,
      personas: [newPersona, ...value.personas]
    });   
  }

  const favoritePersona = (persona) => { 
    let favoritePersonas = []
    if (value.favoritePersonas.find(p => p.id === persona.id)) { 
      if (persona.id === value.selectedPersona?.id) {  
        window.alert("You cannot unfavorite the selected persona."); 
        return;
      }
      favoritePersonas = value.favoritePersonas.filter(p => p.id !== persona.id)
    } else {
      favoritePersonas = [...value.favoritePersonas, persona]
    }
    setValue({
      ...value,
      favoritePersonas
    })
  }  

  const toggleSelectPersona = (persona) => { 
    if (value.selectedPersona && value.selectedPersona.id === persona.id) { 
      setValue({
        ...value,
        selectedPersona: null
      })
    } else {  
      window.confirm("Are you sure you want to select this persona?") && selectPersona(persona)
    } 
  } 

  const handleNext = () => { 
    if (!value.selectedPersona) { 
      window.alert("Please select a persona before proceeding to the next step.")
      return;
    }
    navigate("/your-topic");
  }

  return ( 
    <Box>  
     <Box display="flex" alignItems="center" py={3} px={10} maxHeight="85vh" boxSizing="border-box" gap={10}>
      <Box flex={1}> 
        <h2 style={{fontSize: 40}}>Build Your Persona</h2>
        <p>Fill in the details to create your personalized persona</p> 
        <Box mb={3}>
          <Box mb={1} fontWeight={500}>Age</Box>
          <FormControl fullWidth size="small">
            <Select
              value={age}
              onChange={e => setAge(e.target.value)}
              sx={{backgroundColor: "white"}}
            >
              <MenuItem value="10-20">10-20</MenuItem>
              <MenuItem value="20-30">20-30</MenuItem>
              <MenuItem value="30-40">30-40</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mb={3}>
        <Box mb={1} fontWeight={500}>Occupation</Box>
        <FormControl fullWidth size="small">
          <Autocomplete
            freeSolo
            value={occupation}
            onChange={(event, newValue) => setOccupation(newValue)}
            onInputChange={(event, newInputValue) => setOccupation(newInputValue)}
            options={occupations}
            renderInput={(params) => (
              <TextField 
                {...params}
                sx={{ backgroundColor: "white" }}
                variant="outlined"
                size="small"
              />
            )}
          />
        </FormControl>
    </Box>
        <Box mb={3}>
          <Box mb={1} fontWeight={500}>Medical Condition</Box> 
          <FormControl fullWidth size="small">
            <Select
              value={medicalCondition}
              onChange={e => setMedicalCondition(e.target.value)}
              sx={{backgroundColor: "white"}}
            >
              <MenuItem value="Down Syndrome">Down Syndrome</MenuItem>
            </Select> 
          </FormControl>
        </Box>
        <Box mb={5}>
          <Box mb={1} fontWeight={500}>Theme</Box> 
          <FormControl fullWidth size="small">
            <Select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              sx={{backgroundColor: "white"}}
            >
              <MenuItem value="Employment">Employment</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
            </Select> 
          </FormControl>
        </Box>
      </Box>
      <Box flex={1} overflow="hidden"  
          sx={{
            overflowY: 'auto', 
            maxHeight: '85vh',
            '::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none'
          }}
        > 
      {value.personas.length!=0 ? (<Swiper
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
                      borderRadius: "50%", 
                    }}
                  >
                    <Face6Icon />
                  </Box>
                  <Box fontSize={18} fontWeight={500}>Persona Profile</Box>
                </Box>
                <Box display="flex" justifyContent="center" my={2}>
                  <img src={persona.avatar} alt="Avatar" style={{height: 200}} />
                </Box>
                <Box  
                  sx={{
                    fontSize: 16,
                    color: "#7d7d7d",
                    fontWeight: 400,
                  }}
                >
                  <Box>Name: {persona.name}</Box>
                  <Box>Age: {persona.age}</Box>
                  <Box>Gender: {persona.gender}</Box>
                  <Box>Occupation: {persona.occupation}</Box>
                  <Box>Medical Condition: {persona.diagnosis}</Box>
                  <Box>Theme: {persona.theme}</Box>
                  <Box mt={3}> 
                     {persona.desc} 
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Button color="secondary"  
                        onClick={() => toggleSelectPersona(persona)}  
                 >
                  {value.selectedPersona && value.selectedPersona.id === persona.id ? 'UNSELECT' : 'SELECT'}
                </Button>
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
        <Box display="flex" alignItems="center" justifyContent="center" py={3} px={10} gap={60}>
          <Button sx={{backgroundColor: "#000", width:'200px'}} variant="contained" onClick={createPersona}>Create Persona</Button> 
          {value.personas.length>0 && <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", width:'200px'}} variant="outlined" onClick={handleNext}>Next</Button>}
        </Box>
    </Box> 
  )
}

export default BuildPersona