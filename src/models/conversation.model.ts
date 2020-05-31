import {Model, model, Schema} from 'mongoose';
import {Utils} from "../libs/utils";
import {ConversationModelInterface} from "../interfaces/conversation-model.interface";

export let ConversationSchema: Schema<ConversationModelInterface> = new Schema({
    type: {type: String, required: true},
    lesson: { type: Schema.Types.ObjectId, ref: 'LessonModel', required: true},
    message: {type: String},
    image:{
        caption: {type: String},
        url:{type: String}
    },
    question:{
        question: {type: String},
        option1: {type: String},
        option2: {type: String},
        option3: {type: String},
        option4: {type: String},
        answer: {type: String},
        failureMessage: {type: String},
        successMessage: {type: String}
    },
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: false},
});

ConversationSchema.methods.get = async function (id, next) {
    const self = this;
    await ConversationModel.findById({_id: id}).then(function (data: ConversationModelInterface | any) {
        if (!data) {
            Utils.handleNotFound('Conversation', next);
        }
        self.load(data);
        return self;
    }).catch((err) => {
        return next(err);
    })
};

export const ConversationModel: Model<ConversationModelInterface> = model<ConversationModelInterface>('conversations', ConversationSchema);
