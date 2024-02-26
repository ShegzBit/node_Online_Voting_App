const v4 = null
const nanoid = null
(async() => { 
    const { localV4: uuidv4 } = await import('uuid');
    const { localNanoid } = await import('nanoid');
    v4 = uuidv4;
    nanoid = localNanoid;
})();

class ValueError extends Error {

};

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

class Election {
    constructor(args) {
        let argsKey = Object.keys(args);
        let expectedArgs = ['title', 'startDate', 'endDate', 'description'];
        if (!expectedArgs.every(key => argsKey.includes(key))) {
            throw new ValueError('title, startDate, endDate, description are needed for election creation');
        }
        for (let [key, value] of Object.entries(args)) {
            if (key === 'startDate' || key === 'endDate') {
                if (typeof value !== 'Date') {
                    this[key] = new Date(value);
                }
            } else {
                this[key] = value;
            }
        }
        this.candidates = [];
        this.voters = [];
        this.voters_id = [];
        this.id = v4();
        this.created_at = new Date();
        this.ballot = {};
        this.status = 'pending';
        this.admins = [];
        this.public_id = nanoid(9);
        this.expected_voters = this.voters_id.length;
    }

    to_dict() {
        obj = JSON.parse(JSON.stringify(this));
        obj.startDate = obj.startDate.toISOString();
        obj.endDate = obj.endDate.toISOString();
        obj.created_at = obj.created_at.toISOString();
        for (let [key, value] of Object.entries(obj)) {
            if (isIterable(value)) {
                obj.ballot[key] = value.map(candidate => {
                    ('to_dict' in candidate) ? candidate.to_dict() : candidate;
                });
            } else if ('to_dict' in value) {
                obj[key] = value.to_dict();
            } else {
                obj[key] = value;
            }
        }
    }
};

module.exports = Election;