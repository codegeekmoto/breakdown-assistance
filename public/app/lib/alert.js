// var alert = {

//     success: function(params) {
//         $('#success-alert-modal').modal({ show: true})
//     },

//     hide: function() {

//     }
// }

function Alerts(alertId, args) {

    $('#'+ alertId + '-title').text(args.title)
    $('#'+ alertId + '-msg').text(args.msg)

    if (args.positive.handler != undefined) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        $('#'+ alertId + '-positive').click(args.positive.handler)
    }

    this.show = function() {
        $('#'+ alertId + '-alert-modal').modal({ show: true})
    }

    this.hide = function() {
        $('#'+ alertId + '-alert-modal').modal({ show: false})
    }

    function positive(callback) {
        callback();
        // this.hide()
    }
}

function Success(args) {
    Alerts.call(this, 'success', args);
}

function Warning(args) {
    Alerts.call(this, 'warning', args);
} 

function Info(args) {
    Alerts.call(this, 'info', args);
}

function Danger(args) {
    Alerts.call(this, 'danger', args);
}

var alert = {
    
    success: function(args) {
        return new Success(args)
    },

    warning: function(args) {
        return new Warning(args);
    },

    danger: function(args) {
        return new Danger(args);
    },
}