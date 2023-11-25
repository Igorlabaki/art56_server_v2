export function validateInput(field: boolean[]){
    if(field.every((item) => !!item)){
        return
    }else{
        const error = new Error( "All inputs are required.");
        throw error;
    }
}