
interface HoursValues {
    value1: number,
    value2: Array<number>
}

const parseArgs = (args: Array<string>): HoursValues => {
    
          
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: args.map(Number).slice(3)
        };
        } else {
        throw new Error('Provided values were not numbers!');
    }
    };

const exerciseCalculator = (targetNumber: number, exercises: number[], ) => {
    console.log(targetNumber, exercises);
    const periodLength = exercises.length;
    const trainingDays = exercises.filter(function (e) {return e != 0;}).length;
    let success = false;
    let ratingDescription = '';
    const sum = exercises.reduce((a, b) => a + b, 0);
    
    const average = sum/exercises.length;
    const rating = Math.round(average);
        
   
    if (average > targetNumber) {
        success = true;
        }
    else {
        success = false;
        }
        
    
    if (rating > targetNumber){
        ratingDescription = 'awesome results!';
        }
    if (rating == targetNumber){
        ratingDescription = 'not too bad but could be better';
        }
        if (rating < targetNumber) {
        ratingDescription = 'you should exercise more to get your goal';
    }
    
        
    
return {
    periodLength,
    trainingDays,
    success, 
    rating,
    ratingDescription,
    targetNumber,
    average
    };
    
    
};
    

try {
    const { value1, value2 } = parseArgs(process.argv);
    exerciseCalculator(value1, value2);
    } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    }

export default exerciseCalculator;