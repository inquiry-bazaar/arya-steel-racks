import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    company: { type: String, default: "", trim: true, maxlength: 160 },
    phone: { type: String, default: "", trim: true, maxlength: 40 },
    email: { type: String, default: "", trim: true, lowercase: true, maxlength: 160 },
    product: { type: String, default: "", trim: true, maxlength: 160 },
    location: { type: String, default: "", trim: true, maxlength: 160 },
    message: { type: String, default: "", trim: true, maxlength: 2000 },
  },
  { timestamps: true }
)

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema)
