import { Schema, model, Document } from "mongoose";

export interface IUser extends Document { /* same as before */ }

const userSchema = new Schema<IUser>({ /* same as before */ }, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.isMinor || this.age < 18) {
    this.accessRestrictions.bettingAllowed = false;
    this.accessRestrictions.paymentsAllowed = false;
    this.isMinor = true;
  } else {
    this.accessRestrictions.bettingAllowed = true;
    this.accessRestrictions.paymentsAllowed = true;
    this.isMinor = false;
  }
  next();
});

export const User = model<IUser>("User", userSchema);
export default User; // dual export ✅