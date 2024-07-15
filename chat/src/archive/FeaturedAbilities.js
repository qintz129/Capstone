import { Box, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { faker } from '@faker-js/faker';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

function FeaturedAbilities () {

  const navigate = useNavigate();

  const [abilities, setAbilities] = useState([
    { id: 1, title: "Memory Skills", desc: faker.lorem.lines(4) },
    { id: 2, title: "Visual Learning Strength", desc: faker.lorem.lines(4) },
    { id: 3, title: "Teamwork", desc: faker.lorem.lines(4) },
    { id: 4, title: "Teamwork", desc: faker.lorem.lines(4) },
    { id: 5, title: "Teamwork", desc: faker.lorem.lines(4) },
  ])

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
        {
          abilities.map(ability => (
            <SwiperSlide key={ability.id}>
              <Box fontSize={30} fontWeight={600}>{ability.title}</Box>
              <Box textAlign="left" className="desc">{ability.desc}</Box>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Box display="flex" gap={2} justifyContent="center" mt={5}>
        <Button sx={{borderColor: "#000", color: "#000", backgroundColor: "#FFF", height: 50, width: 250}} variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button sx={{backgroundColor: "#000", height: 50, width: 250}} variant="contained" onClick={() => navigate("/choose-topics")}>Next</Button>
      </Box>
    </Box>
  )
}

export default FeaturedAbilities
