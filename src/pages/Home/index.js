import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { View, Text, StyleSheet,} from 'react-native';


const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const items = [
  <div className="item" data-value="1">1</div>,
  <div className="item" data-value="2">2</div>,
  <div className="item" data-value="3">3</div>,
  <div className="item" data-value="4">4</div>,
  <div className="item" data-value="5">5</div>,
];

const Carousel = () => (
  <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="alternate"
  />
);
Responsive

function inicio() {
  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <Text style={{ textAlign: 'left', margin: 10, fontSize: 25, color: '#BE00B0', fontFamily: 'Bungee',}}>MERCHAN</Text>
    </View>

  );
}



export default inicio;
