import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, {Rect, Defs, LinearGradient, Stop} from 'react-native-svg';
import BatteryModule from '../native/BatteryModule';

const {width} = Dimensions.get('window');

const BatteryScreen: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);

  const fetchBattery = useCallback(async () => {
    try {
      const level = await BatteryModule.getBatteryLevel();
      setBatteryLevel(level);
    } catch (error) {
      console.warn('Battery error:', error);
    }
  }, []);

  useEffect(() => {
    fetchBattery();
    // Auto refresh every 10 seconds
    const interval = setInterval(fetchBattery, 10000);
    return () => clearInterval(interval);
  }, [fetchBattery]);

  // Battery icon dimensions
  const batteryWidth = 140;
  const batteryHeight = 220;
  const borderRadius = 14;
  const borderWidth = 4;
  const innerPadding = 8;
  const innerWidth = batteryWidth - (borderWidth + innerPadding) * 2;
  const innerHeight = batteryHeight - (borderWidth + innerPadding) * 2;
  const fillHeight = (innerHeight * batteryLevel) / 100;
  const capWidth = 44;
  const capHeight = 14;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={fetchBattery}
        activeOpacity={0.9}>
        <Text style={styles.title}>Battery</Text>

        <View style={styles.batteryContainer}>
          <Svg
            width={batteryWidth}
            height={batteryHeight + capHeight + 4}
            viewBox={`0 0 ${batteryWidth} ${batteryHeight + capHeight + 4}`}>
            <Defs>
              <LinearGradient id="batteryGrad" x1="0" y1="1" x2="0" y2="0">
                <Stop offset="0" stopColor="#00E5FF" stopOpacity="1" />
                <Stop offset="1" stopColor="#00E676" stopOpacity="1" />
              </LinearGradient>
              <LinearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#00E5FF" stopOpacity="0.6" />
                <Stop offset="1" stopColor="#00E5FF" stopOpacity="0" />
              </LinearGradient>
            </Defs>

            {/* Battery cap (positive terminal) */}
            <Rect
              x={(batteryWidth - capWidth) / 2}
              y={0}
              width={capWidth}
              height={capHeight}
              rx={6}
              ry={6}
              fill="#00E5FF"
              opacity={0.7}
            />

            {/* Battery body outline */}
            <Rect
              x={borderWidth / 2}
              y={capHeight + 4}
              width={batteryWidth - borderWidth}
              height={batteryHeight}
              rx={borderRadius}
              ry={borderRadius}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={borderWidth}
              fill="transparent"
            />

            {/* Battery fill level */}
            {batteryLevel > 0 && (
              <Rect
                x={borderWidth + innerPadding}
                y={
                  capHeight +
                  4 +
                  borderWidth +
                  innerPadding +
                  (innerHeight - fillHeight)
                }
                width={innerWidth}
                height={fillHeight}
                rx={borderRadius - innerPadding}
                ry={borderRadius - innerPadding}
                fill="url(#batteryGrad)"
              />
            )}

            {/* Glow effect at top of fill */}
            {batteryLevel > 0 && (
              <Rect
                x={borderWidth + innerPadding}
                y={
                  capHeight +
                  4 +
                  borderWidth +
                  innerPadding +
                  (innerHeight - fillHeight)
                }
                width={innerWidth}
                height={Math.min(fillHeight, 30)}
                rx={borderRadius - innerPadding}
                ry={borderRadius - innerPadding}
                fill="url(#glowGrad)"
              />
            )}
          </Svg>

          {/* Percentage text overlay */}
          <View style={[styles.percentOverlay, {height: batteryHeight + capHeight + 4}]}>
            <Text style={styles.percentNumber}>{batteryLevel}</Text>
            <Text style={styles.percentSign}>%</Text>
          </View>
        </View>

        <Text style={styles.tapHint}>Tap to refresh</Text>
      </TouchableOpacity>
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
  },
  card: {
    backgroundColor: '#1C1C2E',
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: width - 48,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  batteryContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentNumber: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 12,
  },
  percentSign: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 20,
    fontWeight: '500',
    marginTop: -4,
  },
  tapHint: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    marginTop: 16,
  },
});

export default BatteryScreen;
