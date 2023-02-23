import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';

import api from '../../services/api';
import { ICar } from '../../models/cars';

import * as S from './styles';

export function Home() {
  const theme = useTheme();

  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      if (positionY.value >= 100) {
        positionY.value = withSpring(0);
        positionX.value = withSpring(0);
      }
    }
  });

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, [])

  return (
    <S.Container>
      <StatusBar barStyle='light-content' />
      <S.Header>
        <S.HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          {!loading ? (
            <S.TotalCar>
              Total de {cars.length} {cars.length === 1 ? 'carro' : 'carros'}
            </S.TotalCar>
          ) : null}
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: 'absolute', bottom: 13, right: 22 }
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.Button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons name="ios-car-sport" size={32} color="#fff" />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>

    </S.Container>
  );
}

const styles = StyleSheet.create({
  Button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 13,
    right: 22
  }
});