import { Box, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { faker } from '@faker-js/faker';
import { ChatContext } from '../App';
import { useContext } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

function FeaturedAbilities () {

  const { value } = useContext(ChatContext);
  const navigate = useNavigate();

  const abilitiesByTheme = {
    Education: [
      { id: 1, title: "Willingness to Learn", desc: faker.lorem.lines(4) },
      { id: 2, title: "Artistic/Athletic Skills", desc: faker.lorem.lines(4) },
      { id: 3, title: "Persistence", desc: faker.lorem.lines(4) },
    ],
    Employment: [
      { id: 1, title: "Memory Skills", desc: faker.lorem.lines(4) },
      { id: 2, title: "Teamwork", desc: faker.lorem.lines(4) },
      { id: 3, title: "Willingness to Learn", desc: faker.lorem.lines(4) },
    ],
    Family: [
      { id: 1, title: "Empathy and Kindness", desc: faker.lorem.lines(4) },
      { id: 2, title: "Positive Attitude", desc: faker.lorem.lines(4) },
      { id: 3, title: "Family Communication", desc: faker.lorem.lines(4) },
    ]
  };

  const selectedThemeAbilities = abilitiesByTheme[value.selectedPersona?.theme] || [];


  return (
    <Box textAlign="center" py={5} px={15}>
      <Box fontSize={45} fontWeight={700}>Featured Abilities</Box>
      <Box fontSize={18} mt={5} mb={10}>Explore Key Abilities of Your Persona</Box>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper1"
      >
         {selectedThemeAbilities.map(ability => (
          <SwiperSlide key={ability.id}>
            <Box fontSize={30} fontWeight={600}>{ability.title}</Box>
            <Box textAlign="left" className="desc">{ability.desc}</Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box display="flex" gap={2} justifyContent="center" mt={5}>
        <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", height: 50, width: 250}} variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button sx={{backgroundColor: "#000", height: 50, width: 250}} variant="contained" onClick={() => navigate("/your-topic")}>Next</Button>
      </Box>
    </Box>
  )
}

export default FeaturedAbilities
