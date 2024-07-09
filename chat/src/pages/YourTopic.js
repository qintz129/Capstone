import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ChatContext } from '../App';
import { Box, Button,Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Face6Icon from '@mui/icons-material/Face6';
import AddIcon from '@mui/icons-material/Add';
import FemaleAvatar from "../assets/images/avatar37.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faker } from '@faker-js/faker';
import EmploymentImage from "../assets/images/employment1.jpg";
import EducationImage from "../assets/images/education.jpg";
import FamilyImage from "../assets/images/family.jpg";


function YourTopic () {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([])
  const { value, setValue } = useContext(ChatContext);

  const skillsByTheme = {
    Education: [
      { id: 1, title: "Willingness to Learn", desc: faker.lorem.lines(4), drivers: ['self-motivation', 'curiosity'], blockers: ['lack of encouragement', 'rigid teaching methods'] },
      { id: 2, title: "Artistic/Athletic Skills", desc: faker.lorem.lines(4), drivers: ['creative environments', 'physical activity'], blockers: ['limited resources', 'inadequate support'] },
      { id: 3, title: "Persistence", desc: faker.lorem.lines(4), drivers: ['goal setting', 'mentor support'], blockers: ['frequent failures', 'lack of resilience training'] },
    ],
    Employment: [
      { id: 1, title: "Memory Skills", desc: faker.lorem.lines(4),drivers: ['repetition', 'visual and auditory aids'], blockers: ['complex information', 'disorganization'] },
      { id: 2, title: "Teamwork", desc: faker.lorem.lines(4),drivers: ['collaborative culture', 'communication skills training'], blockers: ['competitive environments', 'poor leadership'] },
      { id: 3, title: "Willingness to Learn",desc: faker.lorem.lines(4), drivers: ['Continuous learning opportunities', 'positive reinforcement'], blockers: ['discouraging feedback', 'stressful conditions'] },
    ],
    Family: [
      { id: 1, title: "Empathy and Kindness",desc: faker.lorem.lines(4), drivers: ['supportive family dynamics', 'emotional intelligence education'], blockers: ['Negative family dynamics','conflict and isolation'] },
      { id: 2, title: "Family Communication", desc: faker.lorem.lines(4),drivers: ['use of clear and simple language', 'family meetings'], blockers: ['misunderstandings', 'lack of time together'] },
      { id: 3, title: "Positive Attitude", desc: faker.lorem.lines(4), drivers: ['optimistic family outlook', 'celebrations of small achievements'], blockers: ['constant negativity or stress', 'unresolved family conflicts'] },
    ]
  };

  const skills = skillsByTheme[value.selectedPersona?.theme] || [];


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
      <Box fontSize={45} fontWeight={700}>Explore Key Abilities</Box>
      <Box fontSize={18} mt={5} mb={6}>Select and Learn About Key Abilities of Your Persona Based on the Theme</Box>
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
          <Box fontSize={30} fontWeight={600}>{value.selectedPersona?.theme}</Box>
        </Box>
        <Box>
        {value.selectedPersona?.theme === 'Employment' && (
          <img src={EmploymentImage} style={{ width: "100%", height: 300, objectFit: 'cover' }} />
        )}
        {value.selectedPersona?.theme === 'Education' && (
          <img src={EducationImage} style={{ width: "100%", height: 300, objectFit: 'cover' }} />
        )}
        {value.selectedPersona?.theme === 'Family' && (
          <img src={FamilyImage} style={{ width: "100%", height: 300, objectFit: 'cover' }} />
        )}
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
                <Box fontSize={24} fontWeight={600} marginTop={3}>{skill.title}</Box>
                <Box fontSize={14} fontWeight={300} height={100} marginTop={3} marginBottom={2}>{skill.desc}</Box>
                <Box textAlign="left" flex={1} p={2} pb={0}>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Explore Ability Drivers and Ability Blockers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box bgcolor="white" p={2} borderRadius={2} height={200} overflow="auto">
                  <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight={600}>Ability drivers:</Typography>
                  <ul>
                    {skill.drivers.map(driver => <li key={driver}>{driver}</li>)}
                  </ul>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Ability blockers:</Typography>
                    <ul>
                      {skill.blockers.map(blocker => <li key={blocker}>{blocker}</li>)}
                    </ul>
                  </Box>
                </Box>
                </AccordionDetails>
                </Accordion>
                </Box>
                  {/* <Box>Ability drivers:</Box>
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
                </Box> */}
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
