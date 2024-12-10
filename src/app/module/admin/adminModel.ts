import { model, Schema } from "mongoose";
import Tadmin from "./adminInterface";

const adminSchema = new Schema<Tadmin>({
    id: { type: String, required: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String },
    },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    // password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    dateOfBirth: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String },
    isDeleted: { type: Boolean, required: true, default: false },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

export const Admin = model<Tadmin>('admin', adminSchema);
