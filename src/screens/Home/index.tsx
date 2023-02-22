import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';

import api from '../../services/api';
import { ICar } from '../../models/cars';

import * as S from './styles';

export function Home() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  function handleCarDetails(car: ICar) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <S.Container>
      <StatusBar barStyle='light-content' />
      <S.Header>
        <S.HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <S.TotalCar>
            Total de {cars.length} {cars.length === 1 ? 'carro' : 'carros'}
          </S.TotalCar>
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <Loading />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <S.MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color="#fff" />
      </S.MyCarsButton>
    </S.Container>
  );
}
