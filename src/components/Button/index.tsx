import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import * as S from './styles';

interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false
}: ButtonProps) {
  const theme = useTheme();

  return (
    <S.Container
      color={color ? color : theme.colors.main}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} animating={loading} />
      ) : (
        <S.Title>{title}</S.Title>
      )}
    </S.Container>
  );
}