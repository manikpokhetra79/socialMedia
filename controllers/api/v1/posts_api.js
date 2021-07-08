module.exports.index = function(req,res){

    res.json({

        message: "List of Posts",
        posts : []
    });
}