const input = require('fs').readFileSync('./data/01').toString()

function func1(input) {
	return input.split('\n')
		.filter(x => x.trim() !== '')
		.map(x => parseInt(x))
		.reduce((sum, x) => sum + x, 0)
}

function func2(input) {
	return 0
}

if (require.main === module) {
	console.log('Part 1 (resulting frequency):', func1(input))
	//console.log('Part 2 ():', func2(input))
}

module.exports = {
	func1,
	func2,
}
