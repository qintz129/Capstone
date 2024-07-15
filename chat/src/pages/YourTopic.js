import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ChatContext } from '../App';
import { Box, Button,Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Face6Icon from '@mui/icons-material/Face6';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faker } from '@faker-js/faker';
import EmploymentImage from "../assets/images/employment.jpg";
import EducationImage from "../assets/images/education.jpg";
import FamilyImage from "../assets/images/family.jpg"; 
import Tooltip from '@mui/material/Tooltip'; 
import RemoveIcon from '@mui/icons-material/Remove';


function YourTopic () {
  const navigate = useNavigate(); 
  const { value, setValue } = useContext(ChatContext); 
  const [selectedSkills, setSelectedSkills] = useState(value.selectedPersona.selectedSkills || [])
 

  const skillsByTheme = {
    Education: [
      { id: 1, title: "Willingness to Learn", desc: faker.lorem.lines(4),  
        drivers: [ 
          { name: 'self-motivation', desc: faker.lorem.lines(4) },
          { name: 'curiosity', desc: faker.lorem.lines(4) },
        ],  
        blockers: [ 
          { name: 'lack of encouragement', desc: faker.lorem.lines(4) },
          { name: 'rigid teaching methods', desc: faker.lorem.lines(4) },
        ]  
      },
      { id: 2, title: "Artistic/Athletic Skills", desc: faker.lorem.lines(4),  
        drivers: [ 
          { name: 'creative environments', desc: faker.lorem.lines(4) },
          { name: 'physical activity', desc: faker.lorem.lines(4) },
        ],  
        blockers: [ 
          { name: 'limited resources', desc: faker.lorem.lines(4) },
          { name: 'inadequate support', desc: faker.lorem.lines(4) },
        ] },
      { id: 3, title: "Persistence", desc: faker.lorem.lines(4),  
        drivers: [ 
           { name: 'goal setting', desc: faker.lorem.lines(4) },
           { name: 'mentor support', desc: faker.lorem.lines(4) },
          ], 
         blockers: [ 
          { name: 'frequent failures', desc: faker.lorem.lines(4) },
          { name: 'lack of resilience training', desc: faker.lorem.lines(4) },
        ]  
        }, 
    ],
    Employment: [
      { id: 1, title: "Memory Skills", desc: faker.lorem.lines(4), 
        drivers:  
        [ 
          { name: 'repetition', desc: faker.lorem.lines(4) },
          { name: 'visual and auditory aids', desc: faker.lorem.lines(4) },
        ],  
        blockers:  
        [ 
          { name:'complex information', desc: faker.lorem.lines(4) },
          { name: 'disorganization' , desc: faker.lorem.lines(4) },
        ]  
      },
      { id: 2, title: "Teamwork", desc: faker.lorem.lines(4), 
        drivers: [ 
          { name: 'collaborative culture', desc: faker.lorem.lines(4) },
          { name: 'communication skills training', desc: faker.lorem.lines(4) },
        ],  
        blockers: [ 
          { name: 'competitive environments', desc: faker.lorem.lines(4) },
          { name: 'poor leadership', desc: faker.lorem.lines(4) },
        ] },
      { id: 3, title: "Willingness to Learn",desc: faker.lorem.lines(4),  
        drivers:  
        [ 
          { name: 'Continuous learning opportunities', desc: faker.lorem.lines(4) },
          { name: 'positive reinforcement' , desc: faker.lorem.lines(4) },
        ],  
        blockers:  
        [ 
          { name: 'discouraging feedback', desc: faker.lorem.lines(4) },
          { name: 'stressful conditions', desc: faker.lorem.lines(4) },
        ] }, 
      { id: 4, title: "Self-Advocacy", desc: faker.lorem.lines(4), 
         drivers:  
        [ 
          { name: 'driver-1', desc: faker.lorem.lines(4) },
          { name: 'driver-2', desc: faker.lorem.lines(4) }, 
        ], 
         blockers:  
         [ 
          { name: 'blocker-1', desc: faker.lorem.lines(4) },
          { name: 'blocker-2', desc: faker.lorem.lines(4) },
        ] },
    ],
    Family: [
      { id: 1, title: "Empathy and Kindness",desc: faker.lorem.lines(4),  
        drivers: 
         [ 
          { name: 'supportive family dynamics', desc: faker.lorem.lines(4) },
          { name: 'emotional intelligence education', desc: faker.lorem.lines(4) },
        ],  
        blockers:  
        [ 
          { name: 'Negative family dynamics', desc: faker.lorem.lines(4) },
          { name: 'conflict and isolation', desc: faker.lorem.lines(4) },
        ] },
      { id: 2, title: "Family Communication", desc: faker.lorem.lines(4), 
        drivers: [ 
          { name: 'use of clear and simple language', desc: faker.lorem.lines(4) },
          { name: 'family meetings' , desc: faker.lorem.lines(4) },
        ], blockers: [ 
          { name: 'misunderstandings', desc: faker.lorem.lines(4) },
          { name: 'lack of time together' , desc: faker.lorem.lines(4) },
        ] },
      { id: 3, title: "Positive Attitude", desc: faker.lorem.lines(4),  
        drivers: [ 
          { name: 'optimistic family outlook', desc: faker.lorem.lines(4) },
          { name: 'celebrations of small achievements'  , desc: faker.lorem.lines(4) },
        ], blockers: [ 
          { name: 'constant negativity or stress', desc: faker.lorem.lines(4) },
          { name: 'unresolved family conflicts'  , desc: faker.lorem.lines(4) },
        ] },
    ]
  };

  const skills = skillsByTheme[value.selectedPersona?.theme] || []; 

  const toggleSkillSelection = (skill) => {
    if (selectedSkills.some(s => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  }; 


  const handleNext = () => {
    if (selectedSkills.length > 0) {
      setValue(prevValue => ({
        ...prevValue,
        selectedPersona: {
          ...prevValue.selectedPersona,
          selectedSkills: selectedSkills
        }
      }));
    }
    navigate("/chat");
  } 

  console.log("selectedSPersona", value.selectedPersona);

  return (
    <Box textAlign="center" py={2} px={3}>
      <Box fontSize={45} fontWeight={700}>Explore Key Abilities</Box>
      <Box fontSize={18} mt={5} mb={6}>Select and Learn About Key Abilities of Your Persona Based on the Theme</Box>
      <Box sx={{backgroundColor: "#fff"}} px={5}>
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
          spaceBetween={45}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper3" 
          style={{paddingLeft: 45, paddingRight: 45}}
        >
          {
            skills.map(skill => (
              <SwiperSlide  
                key={skill.id} 
                >  
                <Box fontSize={24} fontWeight={600} marginTop={3}>{skill.title}</Box>
                <Box fontSize={14} fontWeight={300} height={100} marginTop={3} marginBottom={2}>{skill.desc}</Box>
                <Box textAlign="left" flex={1} p={2} pb={0}>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>Explore Ability Drivers and Ability Blockers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box bgcolor="white" p={2} borderRadius={2} height={200} overflow="auto">
                  <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight={600}>Ability drivers:</Typography>
                  <ul>
                    {skill.drivers.map(driver => (
                      <Tooltip
                      key={driver.name}
                      title={driver.desc}
                      placement="top"
                      PopperProps={{
                        sx: {
                          '& .MuiTooltip-tooltip': {
                            fontSize: '1.1rem', 
                          }
                        }
                      }}
                    >
                      <li
                      style={{
                        cursor: 'pointer',
                        marginBottom: '10px',
                        backgroundColor: 'transparent' 
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}  
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} 
                    >
                      {driver.name}
                    </li>
                      </Tooltip>
                    ))}
                  </ul>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Ability blockers:</Typography>
                    <ul>
                      {skill.blockers.map(blocker => (
                        <Tooltip
                        key={blocker.name}
                        title={blocker.desc}
                        placement="top"
                        PopperProps={{
                          sx: {
                            '& .MuiTooltip-tooltip': {
                              fontSize: '1.1rem', 
                            }
                          }
                        }}
                      >
                        <li
                        style={{
                          cursor: 'pointer',
                          marginBottom: '10px',
                          backgroundColor: 'transparent' 
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}  
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} 
                      >
                        {blocker.name}
                      </li>
                        </Tooltip>
                      ))}
                    </ul>
                  </Box>
                </Box>
                </AccordionDetails>
                </Accordion>
                </Box>
                  <Box p={2} pt={0} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button
                    startIcon={selectedSkills.some(s => s.id === skill.id)  ? <RemoveIcon /> : <AddIcon />}
                    color="secondary"
                    onClick={() => toggleSkillSelection(skill)}
                  >
                    {selectedSkills.some(s => s.id === skill.id)  ? 'Unselect' : 'Select'}
                  </Button>
                  </Box> 
              </SwiperSlide>

            ))
          }
        </Swiper>
      </Box>
      <Box display="flex" gap={2} justifyContent="center" mt={5}>
        <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", height: 50, width: 250}} variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button sx={{backgroundColor: "#000", height: 50, width: 250}} variant="contained"  
            onClick={() => { 
                if (selectedSkills.length > 0) {
                  if (window.confirm("Are you sure you want to select these abilities for inclusion in LLM interactions and proceed to the next step? This will enhance the relevance of future responses.")) {
                     handleNext();
                  } else {
                 console.log("Selection cancelled.");
               }  
              } else { 
                handleNext();
              }
              }}>Next</Button>
      </Box>
    </Box>
  )
}


        

export default YourTopic
