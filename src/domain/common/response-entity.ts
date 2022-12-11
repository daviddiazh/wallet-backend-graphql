
export class ResponseEntity {

    code: number;
    title: string;
    description: string;

    constructor(code: number, title: string, description: string){
        this.code = code;
        this.title = title;
        this.description = description;
    }

}