import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import * as S from './styles';

export function Home() {
  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <S.TotalCar>Totas de 12 carros</S.TotalCar>
        </S.HeaderContent>
      </S.Header>
    </S.Container>
  );
}
