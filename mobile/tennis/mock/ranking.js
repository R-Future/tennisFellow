const Mock = require('mockjs');

let data = Mock.mock({
	"data|50-100":[{
		"currentRank|1-100": 1,
		"wins|0-40": 1,
		"totalMatchs|1-200": 1,
		"totalPoint|0-3000": 1,
		"rankingChange|0-20": 1,
		"sex|1": ["男", "女"],
		"winningProbability|0-100.2": 1,
		"totalMarginbureau|-100-150": 1,
		"player": "@name"
	}]
});

// console.log(JSON.stringify(data, null, 4));			

module.exports={
	[`GET /api/ranking`](req, res){
		res.status(200).json(data);
	}
}