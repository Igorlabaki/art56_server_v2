export function validateInput(field: boolean[]){
    if(field.every((item) => !!item)){
        return
    }else{
        return new Error(`All inputs are required`)
    }
}