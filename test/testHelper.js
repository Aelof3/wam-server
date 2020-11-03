const createTestScores = () => {
    return [
        {
            score: 123,
            user_name: "testuser1",
            authtoken: "testtoken1"
        },
        {
            score: 124,
            user_name: "testuser2",
            authtoken: "testtoken2"
        },
        {
            score: 111,
            user_name: "testuser3",
            authtoken: "testtoken3"
        },
    ]
}

const createTestAuth = () => {
    let now = new Date()

    return [
        {
            date_started: new Date(now.getTime() - 100000),
            authtoken: "testtoken1",
            validated: false
        },
        {
            date_started: new Date(now.getTime() - 100000),
            authtoken: "testtoken2",
            validated: false
        },
        {
            date_started: new Date(now.getTime() - 100000),
            authtoken: "testtoken3",
            validated: false
        },
        {
            date_started: new Date(now.getTime() - 100000),
            authtoken: "testtoken4",
            validated: false
        },
    ]
}

const insertScores = (db,scores) => {
    return db('scores')
        .insert(scores)
}

const insertAuth = (db,auth) => {
    return db('auth')
        .insert(auth)
}

const checkAuth = (db,auth) => {
    return db
        .select('*')
        .from('auth')
        .where({authtoken:auth.authtoken})
}

const checkToken = (token) => {
    if ( typeof token !== "string" ) return false;
    return (token.length > 0)
}

const checkScores = (testScores,scores) => {
    const ts = testScores.map(s => s.score)
    const ss = scores.map(s => s.score)
    return ss.reduce((a,c)=>{
        return a += ts.includes(c) ? 1 : 0
    },0) === ts.length
}

const checkScore = (score,scores) => {
    const s = {
        user_name:score.user_name,
        score:score.score,
    }
    const r = scores.find(sc => s.user_name === sc.user_name && s.score === sc.score)
    
    if (!r) return false
    
    return r && (s.user_name === r.user_name && s.score === r.score)
}

const cleanTables = (db) => {
    return db.raw(
        `TRUNCATE
          scores,
          users,
          auth
          RESTART IDENTITY CASCADE`
      )
}

module.exports = {
    createTestScores,
    createTestAuth,
    checkToken,
    cleanTables,
    insertScores,
    insertAuth,
    checkScores,
    checkScore,
    checkAuth
}