/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { AreaChart, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const CogniAreaChart = ({ visibility, ...props }) => {
  const [data, setData] = useState([]);
  let label = ['2010', '2020', '2030', '2040', '2050'];
  const xAxis = data.map((item) => item[0]);
  const areaChartY1 = data.map((item) => item[1]);

  const getArticlesFromApi = async () => {
    let response = await fetch(
      'https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=100&type=json',
    );
    console.log('a', response);
    let json = await response.json();
    console.log('b', json);
    setData(json);
  };

  React.useEffect(() => {
    getArticlesFromApi();
  }, []);

  // const xAxis = areaChartData.message.map((item) => item[Object.keys(item)[0]]);
  // const areaChartY1 = areaChartData.message.map(
  //   (item) => item[Object.keys(item)[1]],
  // );

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
          fill: 'blue',
          fontSize: 12,
        }}
      />
      <View style={{ flex: 1 }}>
        <AreaChart
          style={{ flex: 1 }}
          data={areaChartY1}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        />
        <XAxis
          style={{ height: 30 }}
          data={xAxis}
          formatLabel={(value, index) => xAxis[index]}
          contentInset={{ left: 30, right: 30 }}
          svg={{
            fill: 'grey',
            fontSize: 12,
            rotation: 35,
            originY: 5,
            y: 15,
          }}
        />
      </View>
    </View>
  );
};

export default CogniAreaChart;
