const mongoose = require('mongoose');
const slugify = require('slugify');
const blogSchema = mongoose.Schema({
    title: { type: String },
    desc: { type: String },
    genre: { type: String},
    image: { type: String},
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true} );

blogSchema.pre('validate', function(next) {
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next();
});

module.exports = mongoose.model('blog', blogSchema);