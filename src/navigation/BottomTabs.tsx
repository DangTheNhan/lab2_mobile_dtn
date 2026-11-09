import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Svg, {Circle, Line, Rect, G} from 'react-native-svg';
import BrightnessScreen from '../screens/BrightnessScreen';
import BatteryScreen from '../screens/BatteryScreen';

const Tab = createBottomTabNavigator();

type TabIconProps = {color: string; size: number};

const renderSunTabIcon = ({color, size}: TabIconProps) => {
  const c = size / 2;
  const cr = size * 0.2;
  const ri = size * 0.32;
  const ro = size * 0.46;
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
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />,
    );
  }
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={c} cy={c} r={cr} stroke={color} strokeWidth={2} fill="transparent" />
      {rays}
    </Svg>
  );
};

const renderBatteryTabIcon = ({color, size}: TabIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G>
        {/* Battery cap */}
        <Rect x={9} y={2} width={6} height={2} rx={1} fill={color} />
        {/* Battery body */}
        <Rect
          x={6}
          y={4}
          width={12}
          height={18}
          rx={2}
          stroke={color}
          strokeWidth={1.8}
          fill="transparent"
        />
        {/* Battery fill */}
        <Rect x={8} y={8} width={8} height={12} rx={1} fill={color} opacity={0.5} />
      </G>
    </Svg>
  );
};

const BottomTabs: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E5EA',
            height: 60,
            paddingBottom: 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}>
        <Tab.Screen
          name="Brightness"
          component={BrightnessScreen}
          options={{tabBarIcon: renderSunTabIcon}}
        />
        <Tab.Screen
          name="Battery"
          component={BatteryScreen}
          options={{tabBarIcon: renderBatteryTabIcon}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
