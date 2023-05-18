enum statusCharacter {
    alive = "Alive", 
    dead = "Dead",
    unkown = "Unkown"
}

enum genderCharacter {
    female= 'Female',
    male =  'Male', 
    genderless= 'Genderless',
    unknown = 'unknown'
}

export type Character = { 
    id?: number, 
    name?: string, 
    status?: statusCharacter, 
    species?: string,
    location: string
    type?:string,
    gender?:genderCharacter
    origin?:object
    episode?:string,
    characters?:string[],
    url?: string,
    create?: string,
    image?:string
}

