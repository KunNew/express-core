import mongoose from 'mongoose'
const customerSchema = mongoose.Schema(
    {
        name:  {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
          },
          address:  {
            type: String,
            required: true,
        },
        telephone:  {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
const Customer = mongoose.model('Customer',customerSchema)

export default Customer