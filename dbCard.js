import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    poster: String,
    title: String,
    first_air_date: String,
    release_date: String,
    media_type: String,

})

export default mongoose.model('Cards', cardSchema)