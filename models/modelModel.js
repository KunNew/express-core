import mongoose from 'mongoose'
const modelSchema = mongoose.Schema(
    {
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Brand',
          },
        name:  {
            type: String,
            required: true,
        },
        yearMade:  {
            type: String,
            required: true,
        },
      
    },
    {
        timestamps: true,
    }
)
const Model = mongoose.model('Model',modelSchema)

export default Model