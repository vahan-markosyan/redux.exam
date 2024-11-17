export interface ITest{
    id:string | number
    title:string
    questions:IQuestion[]
    results: { user: string; answers: string[]; score: number | null }[]
    shuffle:boolean
}

export interface IQuestion{
    id:string
    text:string
    options:string[]
    correct:string
}

export interface IState{
    currentTest:null | ITest  
}


