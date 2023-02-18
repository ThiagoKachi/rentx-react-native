import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import * as S from './styles';

export function Home() {
  const navigation = useNavigation<any>();

  const carDataOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  };

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <S.TotalCar>Totas de 12 carros</S.TotalCar>
        </S.HeaderContent>
      </S.Header>

      <S.CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <Car data={carDataOne} onPress={handleCarDetails} />
        )}
      />
    </S.Container>
  );
}
