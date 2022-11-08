const fs = require("fs");
const { npm_config_major, npm_config_minor, npm_config_patch } = process.env;

if (npm_config_major || npm_config_minor || npm_config_patch) {
    const packageData = JSON.parse(fs.readFileSync("./package.json", {encoding:"utf8"}));
    const version = packageData.version.split(".");

    if (npm_config_major) {
        console.log("major build");
        version[0] = Number(version[0]) + 1;
        version[1] = 0;
        version[2] = 0;
    
        packageData.version = version.join(".");
    };
    
    if (npm_config_minor) {
        console.log("minor build");
        version[1] = Number(version[1]) + 1;
        version[2] = 0;
    
        packageData.version = version.join(".");
    };
    
    if (npm_config_patch) {
        console.log("patch build");
        version[2] = Number(version[2]) + 1;
    
        packageData.version = version.join(".");
    };

    fs.writeFileSync("./package.json", JSON.stringify(packageData, null, 2), "utf8");
} else {
    throw new Error("No build type parameter detected! (eg. --major/minor/patch)");
};
