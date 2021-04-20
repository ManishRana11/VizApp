/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
//import { YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { YAxis, XAxis } from 'react-native-svg-charts';

const GenericChart = ({ ChartType, areaChartData, visibility, ...props }) => {
  console.log('ChartType ', ChartType);

  const xAxis = areaChartData.message.map((item) => item[Object.keys(item)[0]]);
  const areaChartY1 = areaChartData.message.map(
    (item) => item[Object.keys(item)[1]],
  );

  return (
    <View
      style={{
        height: props.height,
        flexDirection: 'row',
      }}>
      <YAxis
        data={areaChartY1}
        contentInset={{ marginBottom: 20 }}
        svg={{
          fill: 'grey',
          fontSize: 12,
        }}
      />
      <View style={{ flex: 1 }}>
        <ChartType
          style={{ flex: 1 }}
          data={areaChartY1}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        />
        <XAxis
          style={{ height: 20 }}
          data={areaChartY1}
          formatLabel={(value, index) => xAxis[index]}
          contentInset={{ left: 30, right: 30 }}
          svg={{
            fill: 'grey',
            fontSize: 12,
            rotation: 45,
            originY: 5,
            y: 15,
          }}
        />
      </View>
    </View>
  );
};

export default GenericChart;
