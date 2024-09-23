const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, maxLength: 255 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, required: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true }, // Đảm bảo slug là duy nhất
    },
    {
        timestamps: true, // Tự động tạo createdAt và updatedAt
    },
);

module.exports = mongoose.model('Course', Course);
