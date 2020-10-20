const WAMDBService = {
    getAllScores(knexInstance) {
        return knexInstance
          .select('*')
          .from('scores')
    },
    searchScoresByUser(knexInstance,userName) {
        return knexInstance
          .select('*')
          .from('scores')
          .where({user_name:userName})
    },
    addNewUser(knexInstance,userName,userPass){
        // check to make sure userName does not exist
        // then add user to users table
    },
    addUserScore(knexInstance,userName,score){
        // validate user
        // add score to scores table
        return knexInstance
            .insert([{user_name:userName,score:parseInt(score)}])
            .into('scores')
    },
    userLogin(knexInstance,userName,userPass){
        // add new user with userName and md5 hash of pw
    }
}

module.exports = WAMDBService