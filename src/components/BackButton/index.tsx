import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';


import * as S from './styles';

interface Props extends TouchableOpacityProps {
  color?: string;
  onPress: () => void;
}

export function BackButton({ color, onPress }: Props) {
  const theme = useTheme();

  return (
    <S.Container onPress={onPress}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </S.Container>
  );
}