var expect = require("chai").expect;

// Gives the value for an input in bowling format
// Input: String value '0'-'9', 'F', '/', 'X'
// Output: Int value
const returnValue = (val) => {
    // Strike
    if(val === 'X'){
        return 10;
    }
    // Fault, Gutter, or 0 Pins
    else if(val === 'F' || val === '-' || val === '0'){
        return 0;
    }
    // Spare
    else if(val === '/'){
        return 10;
    }
    // Simple Integer Value
    else {
        return parseInt(val);
    }
}

// Calculates the total score for a bowler
// Input: 2D Array of Strings with each index in first array representing one frame
//        Second array represents the two possible throws per array
// Output: Final Score as Int
const calculateScore = (arr) => {
    let score = 0;
    arr.forEach((frame, i) => {
        let frameScore = 0;

        // Only score 10 frames
        if(i < 10){

            // Case: Strike
            //       Score of frame is 10 + value of next two throws
            if(frame[0] === 'X' || returnValue(frame[0]) === 10){
                frameScore += 10;
                const nextFrame = arr[i + 1];
                if(nextFrame[0] === 'X' || returnValue(nextFrame[0]) === 10){
                    frameScore += 10;
                    frameScore += returnValue(arr[i + 2][0]);

                }
                else if(nextFrame[1] === '/' || returnValue(frame[0]) + returnValue(frame[1]) === 10){
                    frameScore += 10;
                }
                else {
                    frameScore += returnValue(nextFrame[0]) + returnValue(nextFrame[1]);
                }
            }

            // Case: Spare
            //       Score of frame is 10 + value of next throw
            else if(frame[1] === '/' || returnValue(frame[0]) + returnValue(frame[1]) === 10){
                frameScore += 10;
                frameScore += returnValue(arr[i + 1][0]);
            }

            // Case: Open Frame
            //       Score of frame is total pins for the frame
            else {
                frameScore += returnValue(frame[0]) + returnValue(frame[1]);
            }
            score += frameScore;
        }
    })
    return score;
}

describe('Bowling Tests', () => {
    let validateResults;
    beforeEach(() => {
        validateResults = [
            [
                [['1', '1'],['1', '1'],['1', '1'],['1', '1'],['1', '1'],['1', '1'],['1', '1'],['1', '1'],['1', '1'],['1', '1']], 20
            ],
            [
                [['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X']], 300
            ],
            [
                [['0', '/'], ['1', '/'], ['2', '/'], ['3', '/'], ['4', '/'], ['5', '/'], ['6', '/'], ['7', '/'], ['8', '/'], ['0', '0']], 126
            ],
            [
                [['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['1', '/'], ['5']], 15
            ],
            [
                [['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['X'], ['1', '5']], 16
            ],
            [
                [['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['X'], ['X'], ['X']], 30
            ],
            [
                [['F', 'F'], ['F', 'F'], ['F', 'F'], ['F', 'F'], ['F', 'F'], ['-', '-'], ['-', '-'], ['-', '-'], ['-', '-'], ['-', '-']], 0
            ],
            [
                [['10'], ['7', '3'], ['9', '-'], ['10'], ['-', '8'], ['8', '2'], ['F', '6'], ['10'], ['10'], ['10'], ['8', '1']], 167
            ]
        ];
    });
    it('Should calculate the correct final score', () => {
        let test = validateResults[0];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });
    it('Should have the correct accumulative scoring for consecutive strikes', () => {
        let test = validateResults[1];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });
    it('Should have the correct scoring for spares', () => {
        let test = validateResults[2];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });
    it('Should handle the 10th frame correctly if there is a spare', () => {
        let test = validateResults[3];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });
    it('Should handle the 10th frame correctly if there is a strike', () => {
        let test = validateResults[4];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });
    it('Should handle the 10th frame correctly for multiple strikes', () => {
        let test = validateResults[5];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });
    it('Should be able to handle F and - format for scoring', () => {
        let test = validateResults[6];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });
    it('Should be able to handle input without the use of / and X to denote spares and strikes', () => {
        let test = validateResults[7];
        let score = calculateScore(test[0]);
        expect(score).to.be.eql(test[1]);
        console.log('Expected Score: ' + test[1]);
        console.log('Calculated Score: ' + score);
    });

})