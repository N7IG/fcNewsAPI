/*
 * Inserts logging of classname to the files with class declarations
 */
module.exports = function(source) {
    const classDeclaration = source.match(/class \w+/);
    if (classDeclaration) {
        const className = classDeclaration[0].replace("class ", "");
        source = `console.log("Loaded class: ${className}")\n` + source;
    }

    return source;
};
