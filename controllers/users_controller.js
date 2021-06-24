//page actions
module.exports.user = function(req,res){
    return res.redirect('/users/register');
}

module.exports.register = function(req,res){
    return res.render('user_register');
}

module.exports.login = function(req,res){
    return res.render('user_login');
}
