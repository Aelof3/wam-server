const WAMDBService = {
    getAllScores(knexInstance) {
        return knexInstance
          .select('*')
          .from('scores')
          .limit(10)
          .orderBy([
              { column: 'score', order: 'ASC' }
          ])
    },
    deleteOldScores(knexInstance) {
        console.log('test')
        return knexInstance('auth')
            .whereRaw(`date_started < (NOW() - INTERVAL '30 minutes')`)
            .del()
    },
    searchScoresByUser(knexInstance,userName) {
        return knexInstance
          .select('*')
          .from('scores')
          .where({user_name:userName})
    },
    addNewUser(knexInstance,userName,userPass){
        // if I choose to add logins for the future single player mode
        // check to make sure userName does not exist
        // then add user to users table
    },
    addUserScore(knexInstance,userName,score,token){
        // validate user
        // add score to scores table
        return knexInstance('scores')
            .where(knexInstance.raw(`authtoken in (select authtoken from auth where validated = TRUE and authtoken = '${token}')`))
            .insert({authtoken:token,user_name:userName,score:parseInt(score)})
    },
    userLogin(knexInstance,userName,userPass){
        // if I choose to add logins for the future single player mode
        // add new user with userName and md5 hash of pw
    },
    getAuthToken(knexInstance,token){
        return knexInstance
            .insert([{authtoken:token}])
            .into('auth')
    },
    deleteAuthToken(knexInstance,token){
        return knexInstance('auth')
            .where({authtoken:token})
            .del()
    },
    checkAuthToken(knexInstance,token){
        // take auth token and return time difference between time started and now
        return knexInstance
            .select(knexInstance.raw('(EXTRACT(EPOCH from (now() - date_started)))'))
            .from('auth')
            .where({authtoken:token})
            .first()
    },
    validateAuthToken(knexInstance, token, validate){
        return knexInstance('auth')
            .where({authtoken:token})
            .update({validated:validate})
    }
}

module.exports = WAMDBService