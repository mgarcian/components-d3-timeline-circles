const cDim = {
    height: 350,
    width: 565,
    innerRadius: 90,
    outerRadius: 120,
    labelRadius: 140
};

let data_first = [
{
    label: 'UP',
    value: 100000,
	color: 'rgb(0,128,0)'
}];

let data_second = [
{
    label: 'Down',
    value: 100000,
	color: 'rgb(128,128,0)'
}];
PieChart(data_first, cDim, 'pie-chart', '2h 20m', true);
PieChart(data_second, cDim, 'pie-chart1', '4h 50m', false);