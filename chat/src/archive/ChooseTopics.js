import { Box, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { faker } from '@faker-js/faker';
import Face6Icon from '@mui/icons-material/Face6';
import { ChatContext } from '../App';

function ChooseTopics () {

  const navigate = useNavigate();

  const [topics, setTopics] = useState([
    { id: 1, title: "Employment", image: faker.image.image(), desc: faker.lorem.lines(1) },
    { id: 2, title: "Education", image: faker.image.image(), desc: faker.lorem.lines(1) },
    { id: 3, title: "Social", image: faker.image.image(), desc: faker.lorem.lines(1) },
    { id: 4, title: "Social", image: faker.image.image(), desc: faker.lorem.lines(1) },
    { id: 5, title: "Social", image: faker.image.image(), desc: faker.lorem.lines(1) },
  ])
  const [selectedTopics, setSelectedTopics] = useState()
  const { value, setValue } = useContext(ChatContext);

  const handleNext = () => {
    if (selectedTopics) {
      setValue({
        ...value,
        selectedTopics
      })
      navigate("/your-topic")
    }
  }

  return (
    <Box textAlign="center" py={5} px={15}>
      <Box fontSize={45} fontWeight={700}>Choose Topics</Box>
      <Box fontSize={18} mt={5} mb={10}>Explore Different Topics for Your Persona's Interaction Scenarios</Box>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper2"
      >
        {
          topics.map(topic => (
            <SwiperSlide key={topic.id}>
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
                <Box fontSize={30} fontWeight={600}>{topic.title}</Box>
              </Box>
              <Box>
                <img src={topic.image} style={{width: "100%"}} />
              </Box>
              <Box flex={1} p={2} textAlign="left" className="desc">{topic.desc}</Box>
              {
                <Box p={2} display="flex" justifyContent="flex-start">
                  <Button disabled={selectedTopics === topic} color="secondary" onClick={() => setSelectedTopics(topic)}>Select</Button>
                </Box>
              }
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Box display="flex" gap={2} justifyContent="center" mt={10}>
        <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", height: 50, width: 250}} variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button sx={{backgroundColor: "#000", height: 50, width: 250}} variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  )
}

export default ChooseTopics
