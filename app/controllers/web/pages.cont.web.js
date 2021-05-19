exports.services = async (req, resp) => {
    resp.render('services', {
        title: 'Services',
        user: req.session.user
    })
}

exports.mechanics = async (req, resp) => {
    resp.render('mechanics', {
        title: 'Mechanics',
        user: req.session.user
    })
}