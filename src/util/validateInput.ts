export function validateInput(field: boolean[]){
    if(field.every((item) => !!item)){
        return
    }else{
        const error = new Error();
        error.message = "All inputs are required.";
        throw error;
    }
}