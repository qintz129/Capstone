import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ChatContext } from '../App';
import { Box, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Face6Icon from '@mui/icons-material/Face6';
import AddIcon from '@mui/icons-material/Add';

function YourTopic () {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([
    { id: 1, title: "Memory Skills", drivers: ['repetition', 'visual and auditory aids'], blockers: ['highly complex information', 'lack of structure and routine'] },
    { id: 2, title: "Visual Learning Strength", drivers: ['enabling factor 1', 'enabling factor 2'], blockers: ['disabling factor 1', 'disabling factor 2'] },
    { id: 3, title: "Persistence", drivers: ['enabling factor 1', 'enabling factor 2'], blockers: ['disabling factor 1', 'disabling factor 2'] },
  ])
  const [selectedSkills, setSelectedSkills] = useState([])
  const { value, setValue } = useContext(ChatContext);

  const handleNext = () => {
    if (selectedSkills.length > 0) {
      setValue({
        ...value,
        selectedSkills
      })
      navigate("/chat")
    }
  }

  return (
    <Box textAlign="center" py={5} px={15}>
      <Box fontSize={45} fontWeight={700}>Your Topic</Box>
      <Box fontSize={18} mt={5} mb={6}>Explore Different Topics for Your Persona's Interaction Scenarios</Box>
      <Box sx={{backgroundColor: "#fff"}} px={10}>
        <Box display="flex" alignItems="center" gap={2} p={2}>
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
          <Box fontSize={30} fontWeight={600}>{value.selectedTopics.title}</Box>
        </Box>
        <Box>
          <img src={value.selectedTopics.image} style={{ width: "100%", height: 300, objectFit: 'cover' }} />
        </Box>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper3"
        >
          {
            skills.map(skill => (
              <SwiperSlide key={skill.id}>
                <Box fontSize={24} fontWeight={600}>{skill.title}</Box>
                <Box textAlign="left" flex={1} p={2} pb={0}>
                  <Box>Ability drivers:</Box>
                  <ul>
                    {
                      skill.drivers.map(driver => <li key={driver}>{driver}</li>)
                    }
                  </ul>
                  <Box textAlign="left">Ability blockers:</Box>
                  <ul>
                    {
                      skill.blockers.map(blocker => <li key={blocker}>{blocker}</li>)
                    }
                  </ul>
                </Box>
                {
                  <Box p={2} pt={0} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button startIcon={ <AddIcon />} disabled={selectedSkills.includes(skill)} color="secondary" onClick={() => setSelectedSkills([...selectedSkills, skill])}>Select</Button>
                  </Box>
                }
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Box>
      <Box display="flex" gap={2} justifyContent="center" mt={10}>
        <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", height: 50, width: 250}} variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button sx={{backgroundColor: "#000", height: 50, width: 250}} variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  )
}

export default YourTopic
