import mongoose from 'mongoose'
const saleSchema = mongoose.Schema(
    {
        soldDate:  {
            type: Date,
            required: true,
        },
    
    },
    {
        timestamps: true,
    }
)
const Sale = mongoose.model('Sale',saleSchema)

export default Sale