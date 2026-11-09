import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Slider from '@react-native-community/slider';
import Svg, {Circle, Line, G} from 'react-native-svg';
import BrightnessModule from '../native/BrightnessModule';

const {width} = Dimensions.get('window');

// Sun icon component with rays
const SunIcon: React.FC<{size: number; color: string}> = ({size, color}) => {
  const center = size / 2;
  const circleRadius = size * 0.22;
  const rayInner = size * 0.34;
  const rayOuter = size * 0.46;
  const numRays = 8;

  const rays = [];
  for (let i = 0; i < numRays; i++) {
    const angle = (i * 360) / numRays - 90;
    const rad = (angle * Math.PI) / 180;
    rays.push(
      <Line
        key={i}
        x1={center + rayInner * Math.cos(rad)}
        y1={center + rayInner * Math.sin(rad)}
        x2={center + rayOuter * Math.cos(rad)}
        y2={center + rayOuter * Math.sin(rad)}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />,
    );
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <G>
        <Circle
          cx={center}
          cy={center}
          r={circleRadius}
          stroke={color}
          strokeWidth={3}
          fill="transparent"
        />
        {rays}
      </G>
    </Svg>
  );
};

// Small sun icon for the slider label
const SmallSun: React.FC = () => {
  const s = 24;
  const c = s / 2;
  const cr = 4;
  const ri = 7;
  const ro = 10;
  const n = 8;
  const rays = [];
  for (let i = 0; i < n; i++) {
    const angle = (i * 360) / n - 90;
    const rad = (angle * Math.PI) / 180;
    rays.push(
      <Line
        key={i}
        x1={c + ri * Math.cos(rad)}
        y1={c + ri * Math.sin(rad)}
        x2={c + ro * Math.cos(rad)}
        y2={c + ro * Math.sin(rad)}
        stroke="#555"
        strokeWidth={2}
        strokeLinecap="round"
      />,
    );
  }
  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <Circle cx={c} cy={c} r={cr} stroke="#555" strokeWidth={2} fill="transparent" />
      {rays}
    </Svg>
  );
};

const BrightnessScreen: React.FC = () => {
  const [brightness, setBrightness] = useState<number>(0.5);

  const fetchBrightness = useCallback(async () => {
    try {
      const current = await BrightnessModule.getBrightness();
      setBrightness(current);
    } catch (error) {
      console.warn('Brightness error:', error);
    }
  }, []);

  useEffect(() => {
    fetchBrightness();
  }, [fetchBrightness]);

  const handleBrightnessChange = async (value: number) => {
    setBrightness(value);
    try {
      await BrightnessModule.setBrightness(value);
    } catch (error) {
      console.warn('Set brightness error:', error);
    }
  };

  const percentDisplay = Math.round(brightness * 100);

  return (
    <View style={styles.container}>
      {/* Sun display card */}
      <View style={styles.card}>
        <View style={styles.sunContainer}>
          <SunIcon size={160} color="#333" />
          <View style={styles.sunOverlay}>
            <Text style={styles.sunPercent}>{percentDisplay}%</Text>
          </View>
        </View>
      </View>

      {/* Slider control card */}
      <View style={[styles.card, styles.sliderCard]}>
        <View style={styles.sliderLabelRow}>
          <SmallSun />
          <Text style={styles.sliderTitle}>Brightness</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={brightness}
          onValueChange={handleBrightnessChange}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#D1D1D6"
          thumbTintColor="#007AFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: width - 48,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sunContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunPercent: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  sliderCard: {
    paddingVertical: 24,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
    gap: 10,
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default BrightnessScreen;
