//consider deleting and rendering in router if not needed
module.exports.getData = function(req,res){
    return res.render("index", {message: "Hello World"})
}