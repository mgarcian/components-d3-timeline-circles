let laneLength = 1,
items = [
    {"start": 0, "end": 205, "color":"red", "taken":true,"inside":[]},
    { "start": 205, "end": 220, "color":"yellow","taken":false,"inside":[
        { "start": 0, "end": 7, "color":"green","taken":false},
            { "start": 7, "end": 15, "color":"red","taken":false}
          ],'dateStart':'1/10/2018:12:20:0','dateEnd':'1/10/2018 13:00:00'},
    {"start": 220, "end": 420,"color":"green","taken":false,"inside":[]},
    { "start": 420, "end": 615,"color":"yellow","taken":false,"inside":[
         { "start": 0, "end": 7, "color":"rgb(46, 204, 64)","taken":false},
          { "start": 7, "end": 15, "color":"red","taken":false},
          { "start": 15, "end": 25, "color":"green","taken":false}],
             'dateStart':'1/10/2018 17:20:00','dateEnd':'1/10/2018 19:00:00'},
    { "start": 615, "end": 900,"color":"red","taken":false,"inside":[]},
    {"start": 900, "end": 1265,"color":"yellow","taken":false,"inside":[
             { "start": 0, "end": 125, "color":"green","taken":false},
             { "start": 125, "end": 200, "color":"red","taken":false},
          { "start": 200, "end": 365, "color":"green","taken":false}
             ],'dateStart':'1/10/2018 20:20:00','dateEnd':'1/10/2018 23:00:00'},
         { "start": 1265, "end": 1365,"color":"green","taken":false,"inside":[]},
         { "start": 1365, "end": 1640,"color":"red","taken":false,"inside":[]},
         {"start": 1640, "end": 2000,"color":"red","taken":false,"inside":[]}],
initDate = "1/10/2018 10:10:00",
endDate = "2/10/2018 10:10:00", timeBegin = 0, height = 40, timeEnd = 2000;
let m = [20, 15, 15, 25], //top right bottom left
    w = 800 - m[1] - m[3],
    h = 200 - m[0] - m[2],
    miniHeight = h ;

timeline('time-line',laneLength, items, initDate, endDate, w,  miniHeight,m,height);