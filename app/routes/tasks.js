

module.export = function (app, mongoose, router) {

    var Task = mongoose.model('Task');

    // create a new task
    router.post('/api/task/create', function (req, res) {
        // need to add validation
        var data = req.body;
        var task = new Task(data);
        task.save().then(function (err, model) {
            if (err) throw err;
            console.log('Task saved!');
            res.json({success: true, task: model});
        }).catch(function (err) {
            throw err;
        });
    });

    // get all tasks
    router.get('/api/tasks', function (req, res) {
        Task.find({}).populate('creator', 'name').then(function (err, collection) {
            if (err) throw err;
            console.log('Grabbed all tasks');
            res.json({success: true, tasks: collection || []});
        }).catch(function (err) {
            throw err;
        });
    });

    // get a single task
    router.get('/api/task/:id', function (req, res) {
        Task.findOne({id: req.params.id}).populate('creator', 'name').then(function (err, model) {
            if (err) throw err;
            console.log('Got a single task');
            res.json({success: true, task: model});
        }).catch(function (err) {
            throw err;
        });
    });

    // complete a task
    router.put('/api/task/:id/complete', function (req, res) {
        // validate status is complete
        var status = req.body.status;
        Task.findOneAndUpdate({id: req.params.id}).then(function (err) {
            if (err) throw err;
            console.log('Task is completed');
            res.json({success: true});
        }).catch(function (err) {
            throw err;
        });
    });
};