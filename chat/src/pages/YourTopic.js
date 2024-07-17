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
import 'swiper/css';
import 'swiper/css/navigation'; 
import NavigationBar from './NavigationBar';


function YourTopic () {
  const navigate = useNavigate(); 
  const { value, setValue } = useContext(ChatContext); 
  const [selectedSkills, setSelectedSkills] = useState(value.selectedPersona.selectedSkills || [])
 

  const skillsByTheme = {
    Education: [
      { id: 1, title: "Willingness to Learn", desc: `Hi! I am ${value.selectedPersona?.name}. I have a strong willingness to learn. In my educational journey, I demonstrate a passion for overcoming difficulties and embracing new challenges. I actively seek learning opportunities to continuously improve my knowledge and skills.`,  
        drivers: [ 
          {
            name: "self-motivation",
            desc: "Self-motivation drives me to seek out new learning experiences. My internal desire to grow and improve ensures that I stay engaged and committed to my educational goals."
          },
          {
            name: "curiosity",
            desc: "Curiosity is a powerful driver of my willingness to learn. My natural interest in exploring new topics and asking questions keeps me actively involved in the learning process."
          }
        ],  
        blockers: [ 
          {
            name: "lack of encouragement",
            desc: "A lack of encouragement can dampen my enthusiasm for learning. Support and positive reinforcement from teachers and peers are crucial for maintaining my motivation."
          },
          {
            name: "rigid teaching methods",
            desc: "Rigid teaching methods can stifle my willingness to learn. Flexible and interactive approaches to education are more effective in keeping me engaged and interested."
          }
        ]  
      },
      { id: 2, title: "Artistic/Athletic Skills", desc: `Hi! I am ${value.selectedPersona?.name}. I excel in artistic and athletic skills. Through my educational experiences, I have developed my creativity and physical abilities by participating in arts and sports activities. These skills have not only boosted my confidence but also enhanced my overall performance. `,  
        drivers: [ 
          { name: 'creative environments', desc: "Creative environments nurture my artistic skills. Access to resources like art supplies and musical instruments allows me to express myself and explore my creativity." },
          { name: 'physical activity', desc: "Regular physical activity is essential for developing my athletic skills. Participating in sports and exercise programs helps me stay fit and improves my coordination and strength." },
        ],  
        blockers: [ 
          { name: 'limited resources', desc: "Limited resources can hinder my ability to develop artistic and athletic skills. Adequate funding and access to facilities are necessary to support my growth in these areas." },
          { name: 'inadequate support', desc: "Inadequate support from instructors and coaches can affect my progress. Encouragement and proper guidance are crucial for helping me reach my full potential."} ,
        ] 
        },
      { id: 3, title: "Persistence", desc: `Hi! I am ${value.selectedPersona?.name}. I demonstrate strong persistence in my educational pursuits. Throughout my learning journey, I persistently pursue my goals, not giving up easily and overcoming various challenges to achieve my academic success.`,  
        drivers: [ 
           { name: 'goal setting', desc: "Setting clear and achievable goals motivates me to stay persistent. Having a roadmap for my educational journey helps me remain focused and determined." },
           { name: 'mentor support', desc: "Support from mentors and teachers plays a vital role in fostering my persistence. Their guidance and encouragement help me stay on track and overcome challenges." },
          ], 
         blockers: [ 
          { name: 'frequent failures', desc: "Frequent failures can undermine my persistence. Constructive feedback and strategies for improvement are essential to help me learn from setbacks and continue striving towards my goals." },
          { name: 'lack of resilience training', desc: "A lack of resilience training can make it difficult for me to bounce back from challenges. Teaching resilience skills helps me develop the mental toughness needed to persist through difficulties." },
        ]  
        }, 
    ],
    Employment: [
      { id: 1, title: "Memory Skills", desc: `Hi! I am ${value.selectedPersona?.name}. I have exceptional memory skills that greatly aid me in my work. Despite the challenges posed by Down syndrome, I can effectively retain and recall information, enabling me to perform tasks with accuracy and efficiency. This proficiency enhances my productivity and reliability in my role.` , 
        drivers:  
        [ 
          { name: 'repetition', desc: "Consistent repetition helps me reinforce my memory. Regular practice allows me to retain information more effectively, ensuring that I can recall it when needed for my tasks." },
          { name: 'visual and auditory aids', desc: "Utilizing visual and auditory aids significantly boosts my memory. Tools like charts, diagrams, and recorded instructions provide strong cues that help me remember important details." },
        ],  
        blockers:  
        [ 
          { name:'complex information', desc: "Complex information can be challenging for me to process and retain. Breaking down data into simpler, manageable parts can help mitigate this blocker." },
          { name: 'disorganization' , desc: "Disorganization in the workspace can hinder my ability to remember tasks and details. A well-structured environment supports my memory retention." },
        ]  
      },
      { id: 2, title: "Teamwork", desc: `Hi! I am ${value.selectedPersona?.name}. I have a strong spirit of teamwork. I collaborate closely with my team members to effectively accomplish my tasks. My ability to communicate and cooperate with others makes me a valuable team player.`, 
        drivers: [ 
          { name: 'collaborative culture', desc: "A collaborative culture fosters my teamwork skills. Being part of a supportive and cooperative environment helps me thrive and contribute effectively." },
          { name: 'communication skills training', desc: "Training in communication skills enhances my ability to work with my team. Clear and effective communication allows me to collaborate more efficiently and build stronger relationships with colleagues." },
        ],  
        blockers: [ 
          { name: 'competitive environments', desc: "Competitive environments can be challenging for me, as they may create stress and hinder collaboration. Encouraging a cooperative approach can mitigate this blocker." },
          { name: 'poor leadership', desc: "Poor leadership can negatively impact my teamwork. Effective and supportive leaders are essential for fostering a productive and collaborative team dynamic." },
        ] },
      { id: 3, title: "Willingness to Learn",desc: `Hi! I am ${value.selectedPersona?.name}. I demonstrate a strong willingness to learn. In my job, I embrace new opportunities for growth and development, continually enhancing my skills and knowledge. This eagerness to learn makes me a valuable asset to my team and the organization.`,  
        drivers:  
        [ 
          { name: 'Continuous learning opportunities', desc: "Providing continuous learning opportunities keeps me engaged and motivated. Regular training and development sessions help me acquire new skills and stay updated." },
          { name: 'positive reinforcement' , desc: "Positive reinforcement encourages me to pursue learning. Recognizing my efforts and progress boosts my confidence and motivates me to continue improving." },
        ],  
        blockers:  
        [ 
          { name: 'discouraging feedback', desc: "Discouraging feedback can diminish my willingness to learn. Constructive and supportive feedback is essential to maintain my motivation and enthusiasm." },
          { name: 'stressful conditions', desc: "Stressful conditions can hinder my ability to learn effectively. Creating a calm and supportive environment is crucial for my continued growth and development." },
        ] }, 
      { id: 4, title: "Self-Advocacy", desc: `Hi! I am ${value.selectedPersona?.name}. I excel in self-advocacy. I can clearly express my needs and preferences, ensuring I receive the support required to perform my tasks effectively. This skill empowers me to take charge of my own success.`, 
         drivers:  
        [ 
          { name: "effective communication", desc: "Effective communication skills are crucial for self-advocacy. They enable me to clearly articulate my needs and preferences, ensuring that I can advocate for myself confidently and assertively." },
          { name: "supportive environment", desc: "A supportive environment plays a significant role in enhancing my self-advocacy skills. Encouragement from colleagues and supervisors boosts my confidence and reinforces my ability to advocate for my needs." }, 
        ], 
         blockers:  
         [ 
          { name: "lack of confidence", desc: "A lack of confidence can hinder my ability to advocate for myself. Overcoming this requires building self-esteem through positive reinforcement and support from my peers and supervisors." },
          { name: "miscommunication", desc: "Miscommunication can create barriers to effective self-advocacy. Clear and concise communication strategies are essential to ensure that my needs and preferences are understood and addressed appropriately." },
        ] },
    ],
    Family: [
      { id: 1, title: "Empathy and Kindness",desc: `Hi! I am ${value.selectedPersona?.name}, and I have Down syndrome. I believe in the power of empathy and kindness within my family. These qualities help us support each other through thick and thin, fostering a loving and understanding environment. Despite the challenges, my family and I work together to create a nurturing home.`,  
        drivers: 
         [ 
          { name: 'supportive family dynamics', desc: "Supportive family dynamics play a crucial role in fostering empathy and kindness. When family members support and care for one another, it creates a nurturing environment where these qualities can thrive." },
          { name: 'emotional intelligence education', desc: "Emotional intelligence education helps us understand and manage our emotions better. Learning about empathy and kindness through education enables us to practice these traits more effectively in our family interactions." },
        ],  
        blockers:  
        [ 
          { name: 'Negative family dynamics', desc: "Negative family dynamics, such as frequent conflicts and lack of support, can hinder the development of empathy and kindness. Addressing these issues is essential for fostering a positive family environment." },
          { name: 'conflict and isolation', desc: "Conflict and isolation within the family can create barriers to empathy and kindness. It's important to resolve conflicts and encourage open communication to promote a more connected and empathetic family." },
        ] },
      { id: 2, title: "Family Communication", desc: `Hi! I am ${value.selectedPersona?.name}. Effective family communication is vital for maintaining strong relationships. We prioritize clear and open communication to ensure everyone feels heard and understood. My family makes sure to use simple language and take time to explain things to me, which helps us stay connected.`, 
        drivers: [ 
          { name: 'use of clear and simple language', desc: "Using clear and simple language helps us avoid misunderstandings and ensures that everyone in the family can communicate effectively. This approach makes our conversations more productive and inclusive." },
          { name: 'family meetings' , desc: "Regular family meetings provide a structured way for us to discuss important topics and address any concerns. These meetings foster open communication and help us stay connected as a family." },
        ], blockers: [ 
          { name: 'misunderstandings', desc: "Misunderstandings can disrupt family communication and create tension. It's important to clarify any miscommunications promptly to maintain harmony within the family." },
          { name: 'lack of time together' , desc: "A lack of time together can hinder effective communication. Prioritizing family time ensures that we have ample opportunities to talk and connect with one another." },
        ] },
      { id: 3, title: "Positive Attitude", desc: `Hi! I am ${value.selectedPersona?.name}. Maintaining a positive attitude is crucial for our family's well-being. We strive to stay optimistic and celebrate small achievements to keep our spirits high. Despite the challenges that come with Down syndrome, my family and I always find reasons to smile and stay hopeful.`,  
        drivers: [ 
          { name: 'optimistic family outlook', desc: "An optimistic family outlook helps us approach challenges with a positive mindset. Encouraging each other to see the bright side of situations fosters a resilient and supportive family environment." },
          { name: 'celebrations of small achievements'  , desc: "Celebrating small achievements boosts our morale and reinforces a positive attitude. Recognizing and appreciating these moments of success helps us stay motivated and happy." },
        ], blockers: [ 
          { name: 'constant negativity or stress', desc: "Constant negativity or stress can undermine our positive attitude. Finding ways to manage stress and focusing on positive aspects of life are essential for maintaining a cheerful family atmosphere." },
          { name: 'unresolved family conflicts'  , desc: "Unresolved family conflicts can create a negative environment and hinder our positive attitude. Addressing and resolving conflicts promptly is crucial for sustaining a harmonious and happy family life." },
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
      setValue(prevValue => ({
        ...prevValue,
        selectedPersona: {
          ...prevValue.selectedPersona,
          selectedSkills: selectedSkills
        }
      }));
    navigate("/chat");
  } 

  console.log("selected persona", value.selectedPersona);

  return (   
    <>
    <NavigationBar />
    <Box textAlign="center" py={2} px={3}> 
      <Box textAlign="center" fontSize={45} fontWeight={700}>Explore Key Abilities</Box>
      <Box textAlign="center" fontSize={18} mt={5} mb={6}>Select and Learn About Key Abilities of Your Persona Based on the Theme</Box>
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
                <Box fontSize={18} fontWeight={300} height={100} marginTop={3} marginBottom={2} p={2}>{skill.desc}</Box>
                <Box textAlign="left" flex={1} p={2}>
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
                          }, 
                          width: '300px'
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
                  if (window.confirm("Are you sure you want to select these abilities for inclusion in LLM interactions and proceed to the next step? This will enhance the relevance of future responses.")) {
                     handleNext();
                  } else {
                 console.log("Selection cancelled.");
               }  
              }}>Next</Button>
      </Box>
    </Box> 
    </>
  )
}


        

export default YourTopic
