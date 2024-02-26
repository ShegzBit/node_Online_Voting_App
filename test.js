const Election = require('./models/election.js');

const election = new Election({title:'Election', startDate:'2021-01-01', endDate:'2021-01-02', description:'Election'});
console.log(election);

const electionDict = election.to_dict();
console.log(electionDict);
