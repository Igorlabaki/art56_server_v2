export function validateInput(field: boolean[]){
    if(field.every((item) => !!item)){
        return
    }else{
        throw new Error(`All inputs are required`)
    }
}