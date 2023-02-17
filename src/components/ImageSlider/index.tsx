import React from 'react';

import * as S from './styles';

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <S.Container>
      <S.ImageIndexes>
        <S.ImageIndex active />
        <S.ImageIndex active={false} />
        <S.ImageIndex active={false} />
        <S.ImageIndex active={false} />
      </S.ImageIndexes>

      <S.CarImageWrapper>
        <S.CarImage
          source={{ uri: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png' }}
          resizeMode="contain"
        />
      </S.CarImageWrapper>
    </S.Container>
  );
}