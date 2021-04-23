/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';

import ErrorMessage from '../Charts.js/ErrorMessage';

class AreaChart extends Component {
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

      this.setState({
        data: renderArray,
      });
    } catch (error) {
      this.setState({ data: undefined });
    }
  };

  clicked = (row) => {
    const { clicked, data } = this.props;

    if (clicked) clicked(data[row]);
  };

  render = () => {
    const { data } = this.state;
    const {
      xAxis,
      yAxis,
      stacked,
      stepped,
      slantedTextAngle,
      loading,
      colors,
      noDataMessage,
    } = this.props;

    let chartType = '';

    if (stepped === 'false') {
      chartType = 'AreaChart';
    } else if (stepped === 'true') {
      chartType = 'SteppedAreaChart';
    }

    return (
      <div
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
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              hAxis: {
                title: xAxis,
                slantedTextAngle: parseInt(slantedTextAngle, 10),
                slantedText: true,
                minValue: 0,
              },
              vAxis: {
                title: yAxis,
                minValue: 0,
              },
              colors: colors.split(',') || [],
              animation: {
                duration: 300,
                easing: 'linear',
                startup: true,
              },
              isStacked: stacked !== 'false',
              legend: { position: 'top' },
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

                      // Added to prevent event action not being performed on
                      // legends
                      if (targetID && targetID.match('legend')) {
                        return;
                      }

                      const [, row] = targetID.match(/[0-9]+/g) || [];
                      if (row >= 0) this.clicked(row);
                    },
                  );
                },
              },
            ]}
          />
        )}
      </div>
    );
  };
}

AreaChart.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  clicked: PropTypes.func,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string,
  stacked: PropTypes.string,
  stepped: PropTypes.string,
  slantedTextAngle: PropTypes.string,
  colors: PropTypes.string,
  noDataMessage: PropTypes.string,
};

AreaChart.defaultProps = {
  loading: false,
  data: [],
  clicked: null,
  xAxis: '',
  yAxis: '',
  stacked: 'false',
  stepped: 'false',
  slantedTextAngle: '30',
  colors: 'green,blue,purple,yellow,grey,orange,pink,magenta,teal,brown',
  noDataMessage: '',
};

export default AreaChart;
