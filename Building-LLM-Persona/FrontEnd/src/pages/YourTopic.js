import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
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
  const [selectedSkills, setSelectedSkills] = useState(value.selectedPersona?.selectedSkills || []) 
 

  const skillsByTheme = {
    education: [
      { id: 1, title: "Willingness to Learn", desc: `Hi! I am ${value.selectedPersona?.name}. I have a strong willingness to learn. In my educational journey, I demonstrate a passion for overcoming difficulties and embracing new challenges. I actively seek learning opportunities to continuously improve my knowledge and skills.`,  
        drivers: [ 
          {
            name: "self-motivation",
            desc: "Self-motivation drives me to seek out new learning experiences. For instance, I wanted to learn how to solve math problems more effectively although math is really hard for me because of Down Syndrome. My determination to improve kept me engaged, and my teacher's encouragement ensured I stayed committed to my goals."
          },
          {
            name: "curiosity",
            desc: "Curiosity is a powerful driver of my willingness to learn. In class, I often ask questions about new topics because I genuinely want to understand how things work. My teachers appreciate my inquisitiveness and always take the time to explain concepts to me in detail."
          }
        ],  
        blockers: [ 
          {
            name: "lack of encouragement",
            desc: "A lack of encouragement can dampen my enthusiasm for learning. There was a time when I struggled with reading, and I felt discouraged. However, when my teacher and classmates started cheering me on, their support reignited my motivation."
          },
          {
            name: "rigid teaching methods",
            desc: "Rigid teaching methods can stifle my willingness to learn. In one of my classes, the teacher only used lectures, and I found it hard to keep up. When she switched to interactive activities and hands-on learning, I became much more interested and engaged."
          }
        ]  
      },
      { id: 2, title: "Artistic/Athletic Skills", desc: `Hi! I am ${value.selectedPersona?.name}. I excel in artistic and athletic skills. Through my educational experiences, I have developed my creativity and physical abilities by participating in arts and sports activities. These skills have not only boosted my confidence but also enhanced my overall performance. `,  
        drivers: [ 
          { name: 'creative environments', desc: "Creative environments nurture my artistic skills. My school provides access to art supplies and musical instruments, allowing me to express myself creatively. I love spending time in the art room, where I can paint and draw freely, which helps me develop my artistic talents." },
          { name: 'physical activity', desc: "Regular physical activity is essential for developing my athletic skills. Participating in sports and exercise programs at school keeps me fit and improves my coordination. I enjoy playing basketball with my friends, and the encouragement from my coach motivates me to do my best." },
        ],  
        blockers: [ 
          { name: 'being overlooked', desc: "As a person with Down syndrome, many people tend to overlook my potential and talents. There was a time when my artistic skills were not recognized because people assumed I couldn't excel in such areas. When my teacher finally noticed my drawings and encouraged me, it made a huge difference in my confidence and ability to create and learn." },
          { name: 'inadequate support', desc: "Inadequate support from instructors and coaches can affect my progress. At one point, I felt stuck in my music lessons because I wasn't getting enough guidance. Once my teacher started giving me more personalized attention, my skills improved significantly."} ,
        ] 
        },
      { id: 3, title: "Persistence", desc: `Hi! I am ${value.selectedPersona?.name}. I demonstrate strong persistence in my educational pursuits. Throughout my learning journey, I persistently pursue my goals, not giving up easily and overcoming various challenges to achieve my academic success.`,  
        drivers: [ 
           { name: 'goal setting', desc: "Setting clear and achievable goals motivates me to stay persistent. I remember setting a goal to improve my reading skills by the end of the semester. With the help of my teacher, I created a plan and worked hard every day to achieve it, which kept me focused and determined." },
           { name: 'mentor support', desc: "Support from mentors and teachers plays a vital role in fostering my persistence. My math teacher always encourages me to keep trying, even when the problems are difficult. Her guidance and reassurance help me stay on track and overcome challenges." },
          ], 
         blockers: [ 
          { name: 'frequent failures', desc: "Frequent failures can undermine my persistence. There was a period when I kept failing my science tests, and it was discouraging. Constructive feedback from my teacher and strategies for improvement helped me learn from my mistakes and continue striving towards my goals." },
          { name: 'lack of resilience training', desc: "A lack of resilience training can make it difficult for me to bounce back from challenges. My school started a program to teach resilience skills, which helped me develop the mental toughness needed to persist through difficulties and achieve academic success." },
        ]  
        }, 
    ],
    employment: [
      { id: 1, title: "Memory Skills", desc: `Hi! I am ${value.selectedPersona?.name}. I have exceptional memory skills that greatly aid me in my work. Despite the challenges posed by Down syndrome, I can effectively retain and recall information, enabling me to perform tasks with accuracy and efficiency. This proficiency enhances my productivity and reliability in my role.` , 
        drivers:  
        [ 
          { name: 'repetition', desc: "Consistent repetition helps me reinforce my memory. Regular practice allows me to retain information more effectively, ensuring that I can recall it when needed for my tasks." },
          { name: 'visual and auditory aids', desc: "In my workspace, I use visual aids like color-coded labels and auditory aids like recorded instructions. For instance, I have labels with pictures on the storage boxes and listen to instructions on my device. These aids provide strong cues that help me remember important details and perform my tasks accurately." },
        ],  
        blockers:  
        [ 
          { name:'complex information', desc: "When I encounter complex information, it can be challenging for me to process and retain it. I remember a time when I had to learn a detailed procedure for a new task. It was overwhelming until my supervisor broke it down into simpler steps, which made it easier for me to understand and remember." },
          { name: 'disorganization' , desc: "Disorganization in the workspace can make it difficult for me to remember tasks and details. I once worked in a cluttered environment, and it was hard to find what I needed. After organizing the space with labeled sections, I found that I could remember where things were and complete my tasks more efficiently." },
        ]  
      },
      { id: 2, title: "Teamwork", desc: `Hi! I am ${value.selectedPersona?.name}. I have a strong spirit of teamwork. I collaborate closely with my team members to effectively accomplish my tasks. My ability to communicate and cooperate with others makes me a valuable team player.`, 
        drivers: [ 
          { name: 'collaborative culture', desc: "Working in a collaborative culture has significantly boosted my teamwork skills. In my previous job, we had team meetings where everyone’s ideas were valued. I felt encouraged to share my thoughts and contribute to group projects, knowing that my team supported and respected me." },
          { name: 'communication skills training', desc: "I participated in communication skills training, which helped me immensely. Through role-playing exercises, I learned how to express my ideas clearly and listen to others. This training improved my interactions with colleagues, making our teamwork more effective and enjoyable." },
        ],  
        blockers: [ 
          { name: 'competitive environments', desc: "Being in a competitive environment can be stressful and hinder my ability to collaborate. I once worked in a place where everyone was trying to outdo each other, which made it hard to feel part of the team. When the environment shifted to a more cooperative approach, I felt more included and our teamwork improved."},
          { name: 'poor leadership', desc: "Poor leadership can negatively impact my teamwork. I experienced a situation where the leader was not supportive and didn’t provide clear directions. This created confusion and frustration within the team. With effective and supportive leadership, our team dynamics and productivity greatly improved." },
        ] },
      { id: 3, title: "Willingness to Learn",desc: `Hi! I am ${value.selectedPersona?.name}. I demonstrate a strong willingness to learn. In my job, I embrace new opportunities for growth and development, continually enhancing my skills and knowledge. This eagerness to learn makes me a valuable asset to my team and the organization.`,  
        drivers:  
        [ 
          { name: 'Continuous learning opportunities', desc: "In my workplace, continuous learning opportunities keep me engaged and motivated. I regularly attend workshops and training sessions. For example, I recently took a course on new software that has helped me perform my tasks more efficiently, showcasing my commitment to learning and growth." },
          { name: 'positive reinforcement' , desc: "Positive reinforcement from my supervisors and colleagues encourages me to pursue learning. When I successfully completed a challenging project, my manager praised my effort, which boosted my confidence and motivated me to take on more learning opportunities." },
        ],  
        blockers:  
        [ 
          { name: 'discouraging feedback', desc: "Discouraging feedback can diminish my willingness to learn. I remember a time when my efforts were criticized harshly, which made me hesitant to try new things. Constructive feedback, on the other hand, helps me understand my mistakes and motivates me to improve." },
          { name: 'stressful conditions', desc: "Stressful conditions can hinder my ability to learn effectively. During a particularly busy period at work, I found it hard to focus on learning new skills. Creating a calm and supportive environment helped me manage stress and continue my personal and professional development." },
        ] }, 
      { id: 4, title: "Self-Advocacy", desc: `Hi! I am ${value.selectedPersona?.name}. I excel in self-advocacy. I can clearly express my needs and preferences, ensuring I receive the support required to perform my tasks effectively. This skill empowers me to take charge of my own success.`, 
         drivers:  
        [ 
          { name: "effective communication", desc: "Effective communication skills are crucial for self-advocacy. I remember a time when I had to request specific accommodations at work. By clearly explaining my needs, I ensured that my workplace provided the necessary support, which helped me perform my tasks more effectively." },
          { name: "supportive environment", desc: "A supportive environment plays a significant role in enhancing my self-advocacy skills. In my current job, my colleagues and supervisors are encouraging and responsive. Their support boosts my confidence and reinforces my ability to advocate for my needs." }, 
        ], 
         blockers:  
         [ 
          { name: "lack of confidence", desc: "A lack of confidence can hinder my ability to advocate for myself. Overcoming this requires building self-esteem through positive reinforcement and support from my peers and supervisors." },
          { name: "miscommunication", desc: "Miscommunication can create barriers to effective self-advocacy. Once, there was a misunderstanding about my work schedule preferences. Clear and concise communication strategies have since helped ensure that my needs and preferences are understood and addressed appropriately." },
        ] },
    ],
    family: [
      { id: 1, title: "Empathy and Kindness",desc: `Hi! I am ${value.selectedPersona?.name}, and I have Down syndrome. I believe in the power of empathy and kindness within my family. These qualities help us support each other through thick and thin, fostering a loving and understanding environment. Despite the challenges, my family and I work together to create a nurturing home.`,  
        drivers: 
         [ 
          { name: 'supportive family dynamics', desc: "In my family, we always support each other. When I was feeling down, my siblings and parents took extra care to include me in their activities, showing more patience and kindness because they understand the unique challenges I face with Down syndrome. Their support helped me feel loved and valued, highlighting how important supportive family dynamics are for fostering empathy and kindness." },
          { name: 'emotional intelligence education', desc: "Learning about emotions has helped my family and me understand each other better. We attended a workshop focused on emotional intelligence, specifically tailored for families with members who have Down syndrome. We learned to express our feelings and listen with empathy, which has made our interactions more compassionate and kind." },
        ],  
        blockers:  
        [ 
          { name: 'Negative family dynamics', desc: "When my family experiences frequent conflicts, it can be hard to maintain empathy and kindness. There was a time when constant arguments made me feel isolated and misunderstood." },
          { name: 'conflict and isolation', desc: "Conflict and isolation can make it difficult to show empathy and kindness. During disagreements, my family makes an extra effort to resolve conflicts quickly and maintain open communication, ensuring that I always feel included and supported despite my challenges with Down syndrome." },
        ] },
      { id: 2, title: "Family Communication", desc: `Hi! I am ${value.selectedPersona?.name}. Effective family communication is vital for maintaining strong relationships. We prioritize clear and open communication to ensure everyone feels heard and understood. My family makes sure to use simple language and take time to explain things to me, which helps us stay connected.`, 
        drivers: [ 
          { name: 'use of clear and simple language', desc: "Using clear and simple language helps us avoid misunderstandings and ensures that everyone in the family can communicate effectively. This approach makes our conversations more productive and inclusive." },
          { name: 'family meetings' , desc: "Regular family meetings provide a structured way for us to discuss important topics and address any concerns. These meetings foster open communication and help us stay connected as a family." },
        ], blockers: [ 
          { name: 'misunderstandings', desc: "Misunderstandings can create tension in our family. There was a time when I misunderstood an instruction, which led to frustration because I found it hard to follow due to my Down syndrome. Now, my family ensures to clarify any confusion immediately, maintaining harmony and understanding." },
          { name: 'lack of time together' , desc: "Not spending enough time together can hinder our communication. We once went through a busy period where everyone was focused on their own activities, which affected our connection." },
        ] },
      { id: 3, title: "Positive Attitude", desc: `Hi! I am ${value.selectedPersona?.name}. Maintaining a positive attitude is crucial for our family's well-being. We strive to stay optimistic and celebrate small achievements to keep our spirits high. Despite the challenges that come with Down syndrome, my family and I always find reasons to smile and stay hopeful.`,  
        drivers: [ 
          { name: 'optimistic family outlook', desc: "Our family focuses on maintaining an optimistic outlook. When things get tough, my parents and siblings remind me of the good times and stay hopeful. Their positive attitude helps us overcome challenges and supports a resilient and happy environment." },
          { name: 'celebrations of small achievements'  , desc: "We celebrate small achievements regularly. When I completed a difficult task at school, my family threw a small party for me. These celebrations boost our morale and reinforce a positive attitude, making me feel valued and appreciated, particularly as someone with Down syndrome." },
        ], blockers: [ 
          { name: 'constant negativity or stress', desc: "Constant negativity or stress can undermine our positive attitude. During a particularly stressful period, it was hard for me to stay optimistic." },
          { name: 'unresolved family conflicts'  , desc: "Unresolved family conflicts can create a negative environment and hinder our positive attitude. We had a lingering disagreement that affected our mood." },
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
    setValue(prevValue => {
      const index = prevValue.favoritePersonas.findIndex(p => p.id === prevValue.selectedPersona.id);
      if (index !== -1) {  
        const newFavoritePersonas = [...prevValue.favoritePersonas];
        newFavoritePersonas[index] = {
          ...newFavoritePersonas[index],
          selectedSkills: selectedSkills
        };
        return {
          ...prevValue,
          selectedPersona: {
            ...prevValue.selectedPersona,
            selectedSkills: selectedSkills
          },
          favoritePersonas: newFavoritePersonas
        };
      }
      return prevValue;
    }); 
    navigate("/chat");
  };

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
          <Box fontSize={30} fontWeight={600}>{value.selectedPersona?.theme.charAt(0).toUpperCase() + value.selectedPersona?.theme.slice(1)}</Box>
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
                <Box fontSize={18} fontWeight={300} height={140} marginTop={3} marginBottom={2} p={2} overflow="auto">{skill.desc}</Box>
                <Box textAlign="left" flex={1} p={2}>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>Explore Ability Drivers and Blockers</Typography>
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
