import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRedirect extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    url: string;
    redirect: string;
}

const schema = new Schema<IRedirect>(
    {
        name: { type: String },
        url: { type: String },
        redirect: { type: String },
    },
    { timestamps: true }
);

const Redirect: Model<IRedirect> = mongoose.models?.Redirect || mongoose.model<IRedirect>("Redirect", schema);

export default Redirect;
