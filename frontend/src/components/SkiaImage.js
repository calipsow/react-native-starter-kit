/* eslint-disable no-constant-condition */
import {
  Canvas,
  Blur,
  Image,
  Skia,
  Circle,
  Group,
  AlphaType,
  ColorType,
} from '@shopify/react-native-skia';

const BlurImageFilter = ({ source }) => {
  const s = 'https://picsum.photos/200/300';
  const data = Skia.Data.fromBase64(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
  );
  const image = Skia.Image.MakeImageFromEncoded(data);
  if (!image) {
    console.log('can not render skia image!', data);
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }}>
      <Image x={0} y={0} width={256} height={256} image={image} fit="cover">
        <Blur blur={4} />
      </Image>
    </Canvas>
  );
};

export const TestSkia = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  if (1) return null;
  return (
    <Canvas style={{ width, height }}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={width - r} cy={r} r={r} color="magenta" />
        <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
      </Group>
    </Canvas>
  );
};

export default BlurImageFilter;
