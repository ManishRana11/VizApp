/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';

import ErrorMessage from '../ErrorMessage';

class BarGraph extends Component {
  state = {};

  componentDidUpdate = (prevProps) => {
    const { loading, data } = this.props;

    if (prevProps.loading !== loading && !loading) {
      this.processResponse(data);
    }
  };

  processResponse = (data) => {
    try {
      const keys = Object.keys(data[0] || {});
      const renderArray = [keys].concat(
        data.map((d) => keys.map((key) => d[key])),
      );

      this.setState({ data: renderArray });
    } catch (error) {
      this.setState({ data: undefined });
    }
  };

  clicked = (row) => {
    const { clicked, data } = this.props;

    if (clicked) {
      clicked(data[row]);
    }
  };

  render = () => {
    const {
      xAxis,
      yAxis,
      orientation,
      slantedTextAngle,
      loading,
      colors,
      noDataMessage,
      fullWidth,
      groupWidth,
    } = this.props;
    const { data } = this.state;

    let chartType = '';

    if (orientation === 'horizontal') {
      chartType = 'BarChart';
    } else {
      chartType = 'ColumnChart';
    }

    return (
      <View
        className="container-text large ui card centered"
        style={{
          height: '100%',
          width: '100%',
          boxShadow: 'none',
          WebkitBoxShadow: 'none',
        }}>
        {loading ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : !data || (data && data.length <= 1) ? (
          <ErrorMessage noDataMessage={noDataMessage} />
        ) : (
          <Chart
            width="100%"
            height="95%"
            chartType={chartType}
            loader={<View>Loading Chart</View>}
            data={data}
            options={{
              hAxis: {
                title: xAxis,
                slantedText: true,
                slantedTextAngle: parseInt(slantedTextAngle, 10),
                minValue: 0,
              },
              vAxis: {
                title: yAxis,
                minValue: 0,
              },
              colors: colors.split(',') || [],
              bar: {
                groupWidth: groupWidth || data.length > 4 ? '90%' : '30%',
              },
              animation: {
                duration: 300,
                easing: 'linear',
                startup: true,
              },
              chartArea:
                fullWidth === 't'
                  ? {
                      left: '10%',
                      width: '80%',
                    }
                  : undefined,
            }}
            chartEvents={[
              {
                eventName: 'ready',
                callback: ({ chartWrapper, google }) => {
                  const chart = chartWrapper.getChart();

                  google.visualization.events.addListener(
                    chart,
                    'click',
                    (e) => {
                      const { targetID } = e;

                      if (targetID && targetID.match('legend')) {
                        return;
                      }

                      const [, row] = targetID.match(/[0-9]+/g) || [];
                      if (row >= 0) {
                        this.clicked(row);
                      }
                    },
                  );
                },
              },
            ]}
          />
        )}
      </View>
    );
  };
}

BarGraph.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  clicked: PropTypes.func,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string,
  orientation: PropTypes.string,
  slantedTextAngle: PropTypes.string,
  colors: PropTypes.string,
  noDataMessage: PropTypes.string,
  fullWidth: PropTypes.string,
  groupWidth: PropTypes.string,
};

BarGraph.defaultProps = {
  loading: false,
  data: [],
  clicked: null,
  xAxis: '',
  yAxis: '',
  orientation: 'vertical',
  slantedTextAngle: '30',
  colors: 'green,blue,purple,yellow,grey,orange,pink,magenta,teal,brown',
  noDataMessage: '',
  fullWidth: null,
  groupWidth: null,
};

export default BarGraph;
