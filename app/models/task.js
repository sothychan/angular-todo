var timestamps = require('mongoose-timestamps');

module.export = function (app, mongoose) {
    
    var taskSchema = new mongoose.Schema({
        title: String,
        content: String,
        priority: {type: String, enum: ['low', 'medium', 'high', 'highest'], default: 'medium'},
        creator: { type: ObjectId, ref: 'User' },
        status: { type: String, enum: ['open', 'closed'], default: 'open' }
    });

    taskSchema.plugin(timestamps);

    return mongoose.model('Task', taskSchema);
};