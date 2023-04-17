export default Array.prototype.filterDuplicate = function( value) {
    const duplicate = []
    const newArr = []
    this.forEach(element => {
        if (!duplicate.includes(element[value])){
            duplicate.push(element[value])
            newArr.push(element)
        }    
    });
    return newArr
}