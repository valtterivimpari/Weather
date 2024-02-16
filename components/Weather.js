import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';

const api = {
  url: 'https://api.openweathermap.org/data/2.5/weather?',
  key: '5977bb4710410bf28085fd45a9833ea7',
  icons: 'http://openweathermap.org/img/wn/'
}

export default function Weather(props) {
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  
useEffect(() => {
    const url = api.url +
    'lat=' + props.latitude +
    '&lon=' + props.longitude +
    '&units=metric' +
    '&appid=' + api.key

    fetch(url)
    .then(res => res.json()) .then((json) => {
    })
    console.log(json)
    setTemp (json.main.temp)
    setDescription (json.weather[0].description) 
    setIcon(api.icons + json.weather[0].icon + '@2x.png')
    .catch((error) => {
    setD
    setDescription("Error retriving weather information.") 
    console.log(error)
    })
    }, [])

  return (
    <View>
      <Text>Temperature: {temp}°C</Text>
      <Text>Description: {description}</Text>
      {icon ? <Image source={{ uri: icon }} style={{ width: 50, height: 50 }} /> : null}
    </View>
  );
}
