module.exports = function (mongoose) {
    var FieldSchema = new mongoose.Schema({
        id: String,
        label: String,
        fieldType: String,
        options: [{
            label: String,
            value: String
        }],
        placeholder: String
    });
    return FieldSchema;
}