// Renders the home page of the website
module.exports.home = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.redirect('/doctors/profile');
        }
        return res.render('home')
    } catch(err) {
        console.log('Error in fetching the home page ', err);
        return res.redirect('back');
    }
    
}