exports.services = async (req, resp) => {

    resp.render('services', {
        title: 'Services',
        user: req.session.user
    })
}