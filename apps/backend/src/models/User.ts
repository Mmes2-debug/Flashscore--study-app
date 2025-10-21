import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  // ... your existing properties
  age: number;
  isMinor?: boolean;
  accessRestrictions: {
    bettingAllowed: boolean;
    paymentsAllowed: boolean;
  };
}

const userSchema = new Schema<IUser>({
  // ... your existing fields
  age: {
    type: Number,
    required: true
  },
  isMinor: {
    type: Boolean,
    default: false
  },
  accessRestrictions: {
    bettingAllowed: {
      type: Boolean,
      default: true
    },
    paymentsAllowed: {
      type: Boolean,
      default: true
    }
  }
}, { timestamps: true });

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