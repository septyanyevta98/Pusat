import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
// const screenWidth = Dimensions.get('window').width;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {colors} from '../../../utils';

const Chart = ({label, profit}) => {
  return (
    <View>
      <Text style={{marginHorizontal: 16, fontSize: 20}}>Profit Check</Text>
      <LineChart
        data={{
          labels: label,
          datasets: [
            {
              data: profit,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: 'red',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 100) => `rgba(64, 191, 255, ${opacity})`,
          labelColor: (opacity = 100) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            marginHorizontal: 10,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: colors.blue,
          },
          propsForLabels: {
            fontSize: 10,
          },
        }}
        // bezier
        style={{
          marginVertical: 8,
          borderRadius: 10,
          // marginRight: 17,
          // marginLeft: 17,
          // borderColor: colors.blue,
          // borderWidth: 1,
        }}
      />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
